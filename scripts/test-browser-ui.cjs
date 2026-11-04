/* Browser smoke test of Horizonte Noturno using Chrome CDP, Node 22 built-ins only.
   No external test framework; runs against the temporary local HTTP server in CI. */
"use strict";
const fs=require("node:fs"),os=require("node:os"),path=require("node:path"),http=require("node:http");
const {spawn}=require("node:child_process");
const assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn,timeout=15000){
 const end=Date.now()+timeout;
 while(Date.now()<end){try{const v=await fn();if(v)return v}catch(e){/* page may be navigating */}await sleep(130)}
 throw Error("Timed out waiting for browser state");
}
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".webp":"image/webp"};
const server=http.createServer((req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  const file=path.resolve(root,"."+pathname+(pathname.endsWith("/")?"index.html":""));
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
  const data=fs.readFileSync(file);
  res.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream","Cache-Control":"no-store"});
  res.end(data);
 }catch(e){res.writeHead(404);res.end("Not found")}
});
async function main(){
 await new Promise(r=>server.listen(0,"127.0.0.1",r));
 const site="http://127.0.0.1:"+server.address().port+"/index.html";
 const bin=[process.env.CHROME_BIN,"/usr/bin/google-chrome","/usr/bin/chromium","/usr/bin/chromium-browser"].filter(Boolean).find(f=>fs.existsSync(f));
 assert(bin,"Headless Chrome/Chromium must be installed for UI E2E");
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),"partiu-qa-"));
 const chrome=spawn(bin,["--headless=new","--no-sandbox","--disable-gpu","--disable-dev-shm-usage","--no-first-run","--no-default-browser-check","--remote-debugging-port=0","--user-data-dir="+tmp,"about:blank"],{stdio:["ignore","ignore","pipe"]});
 let chromeError="";
 chrome.stderr.on("data",chunk=>{if(chromeError.length<6000)chromeError+=String(chunk)});

 let socket;
 try{
  const active=await until(()=>fs.existsSync(path.join(tmp,"DevToolsActivePort"))?fs.readFileSync(path.join(tmp,"DevToolsActivePort"),"utf8"):null,40000).catch(error=>{throw Error("Chrome startup timed out. Exit="+chrome.exitCode+"; stderr="+chromeError.slice(-2000),{cause:error})});
  const port=Number(active.split("\n")[0]);
  const pages=await (await fetch("http://127.0.0.1:"+port+"/json/list")).json();
  const target=pages.find(p=>p.type==="page");
  assert(target?.webSocketDebuggerUrl,"Chromium remote debugger not available");
  socket=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{socket.addEventListener("open",resolve,{once:true});socket.addEventListener("error",reject,{once:true})});
  let id=0;const pending=new Map();
  socket.addEventListener("message",e=>{
   const m=JSON.parse(e.data);
   if(!m.id)return;
   const p=pending.get(m.id);if(!p)return;pending.delete(m.id);
   if(m.error)p.reject(Error(m.error.message));else p.resolve(m.result||{});
  });
  const send=(method,params={})=>new Promise((resolve,reject)=>{
   const seq=++id;pending.set(seq,{resolve,reject});
   socket.send(JSON.stringify({id:seq,method,params}));
  });
  const evaluate=async expression=>{
   const r=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});
   if(r.exceptionDetails)throw Error("Browser JS exception: "+r.exceptionDetails.text);
   return r.result?.value;
  };
  for(const width of [390,1280]){
   await send("Emulation.setDeviceMetricsOverride",{width,height:844,deviceScaleFactor:1,mobile:width<500});
   await send("Page.navigate",{url:site+"?qa="+width});
   await until(()=>evaluate("Boolean(document.querySelector('#featured a.event-card')&&document.querySelector('#agenda .event-search'))"));
   if(width===1280){const layout=await evaluate("(()=>({wrap:document.querySelector('.main.wrap').getBoundingClientRect().width,cols:getComputedStyle(document.querySelector('#agenda .cards')).gridTemplateColumns.split(' ').length}))()");assert(layout.wrap>1000&&layout.cols===1,"Desktop agenda must be one continuous list: "+JSON.stringify(layout));}
   // ADR-040 correction: entire upcoming section (title, months, filters AND cards)
   // shares one centered 70% column on desktop, without shrinking the highlight.
   const listColumn=await evaluate("(()=>{const b=e=>{const r=e.getBoundingClientRect();return {x:r.x,w:r.width,right:r.right}};const main=b(document.querySelector('main.wrap')),section=b(document.getElementById('agenda-section')),head=b(document.querySelector('#agenda-section .section-head')),filters=b(document.querySelector('#agenda-section .filters')),months=b(document.getElementById('month-switcher')),list=b(document.getElementById('agenda')),card=b(document.querySelector('#agenda .event-vitrine')),featured=b(document.querySelector('#featured .event-featured'));return {main,section,head,filters,months,list,card,featured,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth}})()");
   const expectedColumn=width>=900?.7:1;
   assert(Math.abs(listColumn.section.w/listColumn.main.w-expectedColumn)<.012,"Upcoming section must be 70% of body on desktop / 100% mobile: "+JSON.stringify(listColumn));
   assert(Math.abs((listColumn.section.x-listColumn.main.x)-(listColumn.main.w-listColumn.section.w)/2)<2,"Upcoming section must be centered: "+JSON.stringify(listColumn));
   for(const key of ["head","filters","list","card"]){
    assert(Math.abs(listColumn[key].x-listColumn.section.x)<2&&Math.abs(listColumn[key].w-listColumn.section.w)<2,"Misaligned upcoming "+key+": "+JSON.stringify(listColumn));
   }
   assert(listColumn.months.x>=listColumn.section.x-2&&listColumn.months.right<=listColumn.section.right+2,"Month controls must stay inside centered section: "+JSON.stringify(listColumn));
   assert(listColumn.featured.w>listColumn.section.w*(width>=900?1.25:.99),"Day highlight must remain full width: "+JSON.stringify(listColumn));
   assert(listColumn.scrollWidth<=listColumn.viewport+2,"Upcoming section introduces horizontal overflow: "+JSON.stringify(listColumn));
   const hero=await evaluate("(()=>{const el=getComputedStyle(document.body,'::before');const s=el.backgroundImage;return {hasBridge:s.includes('data:image/webp;base64'),hasGradient:s.includes('linear-gradient'),fixed:el.position==='fixed',height:el.height,width:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}})()");
   assert(hero.hasBridge&&hero.hasGradient&&hero.fixed,"Ponte must be fixed across the entire viewport");
   assert(hero.width<=hero.viewport+2,"Mobile/desktop page must not overflow horizontally: "+JSON.stringify(hero));
   // Real computed layout, not source-token checks. CI has no private photo overlay,
   // so add a layout-only thumbnail to the first text-only card in this isolated tab.
   const list=await evaluate("(()=>{const c=document.querySelector('#agenda .event-search.event-vitrine');if(!c)return null;let img=c.querySelector('.event-media');if(!img){img=document.createElement('div');img.className='event-media';img.dataset.synthetic='layout-only';c.prepend(img)}const info=c.querySelector('.event-info'),title=info.querySelector('h3'),footer=info.querySelector('.event-bottom'),action=info.querySelector('.event-action'),category=info.querySelector('.event-meta');const cr=c.getBoundingClientRect(),ir=info.getBoundingClientRect(),tr=title.getBoundingClientRect(),fr=footer.getBoundingClientRect(),mr=img.getBoundingClientRect(),ar=action.getBoundingClientRect();return {horizontal:getComputedStyle(c).flexDirection==='row',ratio:mr.width/cr.width,titleRatio:tr.width/ir.width,footerRatio:fr.width/ir.width,actionAtRight:Math.abs(fr.right-ar.right)<6,pseudo:getComputedStyle(action,'::after').content,background:getComputedStyle(c).backgroundColor,border:getComputedStyle(c).borderTopStyle,radius:getComputedStyle(c).borderTopLeftRadius,font:getComputedStyle(title).fontFamily,infoDisplay:getComputedStyle(info).display,infoDirection:getComputedStyle(info).flexDirection,categoryY:category.getBoundingClientRect().y,titleY:tr.y,footerY:fr.y,date:!!footer.querySelector('.event-when'),href:c.getAttribute('href'),minWidth:getComputedStyle(img).minWidth}})()");
   assert(list?.horizontal&&list.infoDisplay==='flex'&&list.infoDirection==='column'&&list.date,"Chosen Vitrine layout and footer missing: "+JSON.stringify(list));
   const expectedRatio=width<700?.37:.28;
   assert(Math.abs(list.ratio-expectedRatio)<.025,"Vitrine photo width regressed: "+JSON.stringify(list));
   assert(list.titleRatio>.85&&list.footerRatio>.85&&list.actionAtRight,"Legacy grid shrunk Vitrine title/footer: "+JSON.stringify(list));
   assert(list.pseudo==="none"&&list.minWidth==="0px","Legacy Details pseudo or fixed thumbnail width returned: "+JSON.stringify(list));
   assert(list.background==="rgb(16, 46, 54)"&&list.border==="solid"&&list.radius==="12px"&&list.font.includes("DM Serif Display"),"Vitrine visual contract regressed");
   assert(list.categoryY<=list.titleY&&list.titleY<=list.footerY&&list.href.includes("./evento/"),"Vitrine content order or internal navigation regressed");
   // Mutation-test the test: an injected old style MUST visibly break the contract.
   const regression=await evaluate("(()=>{const style=document.createElement('style');style.textContent='#agenda .event-search.event-vitrine .event-bottom{align-self:start}#agenda .event-search.event-vitrine .event-action::after{content:\\\" Detalhes\\\"}';document.head.append(style);const f=document.querySelector('#agenda .event-vitrine .event-bottom'),a=f.querySelector('.event-action');const broken=f.getBoundingClientRect().width/f.parentElement.getBoundingClientRect().width<.85||getComputedStyle(a,'::after').content!=='none';style.remove();return broken})()");
   assert(regression,"Regression sentinel must detect old CSS in an isolated browser tab");
   
   // The background should remain a fixed full-screen layer when the document scrolls.
   const background=await evaluate("(()=>{window.scrollTo(0,240);const s=getComputedStyle(document.body,'::before');return {fixed:s.position==='fixed',height:parseFloat(s.height),viewport:innerHeight,scrollY:scrollY}})()");
   assert(background.fixed&&background.height>=background.viewport-2,"Fixed bridge must cover the viewport while scrolling");
   await evaluate("window.scrollTo(0,0)");
   // Expand search in the same row, filter by a known event title, then collapse.
   const toolbar=await evaluate("(()=>{const dates=document.querySelector('.quick-dates');const search=document.getElementById('date-search');return {searchHidden:search.hidden,datesVisible:!dates.hidden,calendarHidden:document.getElementById('date-picker-panel').hidden}})()");
   assert(toolbar.searchHidden&&toolbar.datesVisible&&toolbar.calendarHidden,"Compact toolbar should default to date shortcuts");
   await evaluate("document.getElementById('toggle-search').click()");
   const openSearch=await evaluate("(()=>{const s=document.getElementById('date-search'),q=document.getElementById('search');return {visible:!s.hidden,datesHidden:document.querySelector('.quick-dates').hidden,focused:document.activeElement===q,expanded:document.getElementById('toggle-search').getAttribute('aria-expanded')}})()");
   assert(openSearch.visible&&openSearch.datesHidden&&openSearch.focused&&openSearch.expanded==='true',"Search opens in the toolbar and replaces date chips");
   await evaluate("document.getElementById('search').value='sem-evento-inexistente';document.getElementById('search').dispatchEvent(new Event('input',{bubbles:true}))");
   assert.equal(await evaluate("document.querySelectorAll('#agenda a.event-card').length"),0,"Expanded search should keep existing filtering behavior");
   // RF-02: real AND filter and reset must match displayed cards (not merely change a select).
   const multiFilter=await evaluate("(()=>{const old={category:document.getElementById('category').value,region:document.getElementById('region').value,period:document.getElementById('period').value,month,dateFilter,search:document.getElementById('search').value};const e=events.find(v=>v.date>=today&&v.time&&v.time>='18:00'&&displayRegion(v));if(!e)return {missing:true};month=e.date.slice(0,7);dateFilter='';document.getElementById('category').value=e.category;document.getElementById('region').value=displayRegion(e);document.getElementById('period').value='night';document.getElementById('search').value='';render();const chosen=filtered(),home=PartiuHomeLayout.selectHome(chosen,{today,mode:dateFilter,month});const expected=[...(home.featured?[home.featured.title]:[]),...home.upcoming.map(x=>x.title)].sort();const actual=[...document.querySelectorAll('#featured a.event-card h3,#agenda a.event-card h3')].map(x=>x.textContent).sort();const matches=JSON.stringify(expected)===JSON.stringify(actual);const conjunctive=chosen.length>0&&chosen.every(v=>v.category===e.category&&displayRegion(v)===displayRegion(e)&&v.time>='18:00');document.getElementById('search').value=e.title.slice(0,8);render();const searched=filtered();const narrowed=searched.length>0&&searched.length<=chosen.length&&searched.every(v=>v.title.toLocaleLowerCase('pt-BR').includes(e.title.slice(0,8).toLocaleLowerCase('pt-BR')));document.getElementById('category').value=old.category;document.getElementById('region').value=old.region;document.getElementById('period').value=old.period;document.getElementById('search').value=old.search;month=old.month;dateFilter=old.dateFilter;render();return {matches,conjunctive,narrowed,restored:document.getElementById('category').value===old.category&&document.getElementById('region').value===old.region&&document.getElementById('period').value===old.period}})()");
   assert(!multiFilter.missing&&multiFilter.matches&&multiFilter.conjunctive&&multiFilter.narrowed&&multiFilter.restored,"Search/category/region/period combination or reset regressed: "+JSON.stringify(multiFilter));
   await evaluate("document.getElementById('search').value='';document.getElementById('search').dispatchEvent(new Event('input',{bubbles:true}));document.getElementById('toggle-date').click()");
   const picker=await evaluate("(()=>{const d=document.getElementById('date-picker-panel');return {visible:!d.hidden,searchHidden:document.getElementById('date-search').hidden,datesHidden:document.querySelector('.quick-dates').hidden,expanded:document.getElementById('toggle-date').getAttribute('aria-expanded')}})()");
   assert(picker.visible&&picker.searchHidden&&picker.datesHidden&&picker.expanded==='true',"Calendar replaces search and date chips");
   await evaluate("document.getElementById('global-date').value='2026-11-06';document.getElementById('global-date').dispatchEvent(new Event('change',{bubbles:true}))");
   assert.equal(await evaluate("document.querySelector('.quick-dates').hidden"),false,"Calendar selection should restore date shortcuts");
   await evaluate("document.querySelector('.quick-dates button').click()");
   
   const before=await evaluate("location.pathname");
   await evaluate("document.querySelector('#featured a.event-card').click()");
   const opened=await evaluate("(()=>{const d=document.querySelector('#detail-dialog');return {open:d.open,title:!!d.querySelector('#detail-title'),source:!!d.querySelector('a.detail-primary'),pathname:location.pathname}})()");
   assert(opened.open&&opened.title&&opened.source&&opened.pathname===before,"Event click must open a sourced dialog without navigation");
   // RF-20: share using a stubbed native API, without external effects or browser permissions.
   await evaluate("(()=>{window.__partiuShareProbe=null;Object.defineProperty(navigator,'share',{configurable:true,value:async payload=>{window.__partiuShareProbe=payload}});document.querySelector('[data-detail-action=\"share\"]').click()})()");
   const shared=await until(()=>evaluate("window.__partiuShareProbe"));
   assert(shared.url.includes("/evento/")&&shared.title&&/^https?:\/\//.test(shared.url),"Event share must use deep link, never homepage or ticket checkout");
   await evaluate("delete navigator.share;delete window.__partiuShareProbe");
   await evaluate("document.getElementById('detail-close').click()");
   assert.equal(await evaluate("document.getElementById('detail-dialog').open"),false,"Event dialog must close");
   await evaluate("document.getElementById('tab-places').click()");
   await until(()=>evaluate("Boolean(document.querySelector('.place-open'))"));
   const places=await evaluate("(()=>{const groups=[...document.querySelectorAll('#places-results .places-group')];const placeButtons=[...document.querySelectorAll('.place-open')];const letters=[...document.querySelectorAll('.places-letter-group')];const grid=document.querySelector('#places-results .places-grid');return {count:placeButtons.length,images:document.querySelectorAll('.place-open img').length,illustrative:document.querySelectorAll('.place-open img[src*=\\\"/photos/\\\"]').length,columns:grid?getComputedStyle(grid).gridTemplateColumns.split(' ').length:0,groupTitles:groups.map(g=>g.querySelector('h3')?.textContent),letterCount:letters.length,lettersValid:letters.every(g=>{const names=[...g.querySelectorAll('.place-title')].map(n=>n.textContent);return !!g.querySelector('h4')&&names.every((n,i)=>i===0||names[i-1].localeCompare(n,'pt-BR')<=0)}),privateReview:reviewMedia.scope==='private-preview',directoryCount:venueDirectory.venues.length,unknownText:document.querySelector('#places-results').textContent.toLowerCase().includes('horário não confirmado')}})()");
   assert(places.count===places.directoryCount&&places.images<=places.count&&places.illustrative===0,"All directory venues must remain visible without stock imagery");
   assert(!places.unknownText&&places.groupTitles.length<=2&&places.lettersValid,"No unknown status section; all other venues grouped alphabetically as closed");
   assert(places.columns===(width>=1024?2:1),"Venue grid columns must be exactly two desktop / one mobile: "+JSON.stringify(places));
   if(places.privateReview){assert(places.images>=1,"Private review should show verified venue media where available");}
   else assert(places.images===0,"Public/CI must not show unlicensed venue media");
   await evaluate("document.querySelector('.place-open').click()");
   const place=await evaluate("(()=>{const d=document.getElementById('detail-dialog');return {open:d.open,title:!!d.querySelector('#detail-title'),hours:d.textContent.includes('Funcionamento habitual'),events:d.textContent.includes('Eventos no portal'),pathname:location.pathname}})()");
   assert(place.open&&place.title&&place.hours&&place.events&&place.pathname===before,"Venue click must open its own dialog without navigation");
   await evaluate("document.getElementById('detail-close').click()");
   console.log("Browser UI E2E passed at "+width+"px: bridge, compact cards, event & place dialogs, no navigation");
  }
 }finally{
  if(socket&&socket.readyState===WebSocket.OPEN)socket.close();
  chrome.kill("SIGTERM");
  server.close();
  try{fs.rmSync(tmp,{recursive:true,force:true,maxRetries:20,retryDelay:250})}catch(e){console.warn("Headless Chrome temp cleanup deferred: "+e.message)}
 }
}
main().catch(e=>{console.error(e.stack||e);server.close();process.exitCode=1});
