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
 const chrome=spawn(bin,["--headless=new","--no-sandbox","--disable-gpu","--disable-dev-shm-usage","--no-first-run","--remote-debugging-port=0","--user-data-dir="+tmp,"about:blank"],{stdio:"ignore"});
 let socket;
 try{
  const active=await until(()=>fs.existsSync(path.join(tmp,"DevToolsActivePort"))?fs.readFileSync(path.join(tmp,"DevToolsActivePort"),"utf8"):null);
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
   const hero=await evaluate("(()=>{const el=document.querySelector('.mast');const s=getComputedStyle(el).backgroundImage;return {hasBridge:s.includes('data:image/webp;base64'),hasGradient:s.includes('linear-gradient'),width:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}})()");
   assert(hero.hasBridge&&hero.hasGradient,"Ponte must be visible as second CSS background layer");
   assert(hero.width<=hero.viewport+2,"Mobile/desktop page must not overflow horizontally: "+JSON.stringify(hero));
   const list=await evaluate("(()=>{const c=document.querySelector('#agenda .event-search');const img=c.querySelector('.event-media');return {horizontal:getComputedStyle(c).flexDirection==='row',width:img.getBoundingClientRect().width,overlays:getComputedStyle(c.querySelector('.event-art')).display}})()");
   assert(list.horizontal&&list.width<=115&&list.overlays==="none","Next-event cards must have unobstructed thumbnails: "+JSON.stringify(list));
   const before=await evaluate("location.pathname");
   await evaluate("document.querySelector('#featured a.event-card').click()");
   const opened=await evaluate("(()=>{const d=document.querySelector('#detail-dialog');return {open:d.open,title:!!d.querySelector('#detail-title'),source:!!d.querySelector('a.detail-primary'),pathname:location.pathname}})()");
   assert(opened.open&&opened.title&&opened.source&&opened.pathname===before,"Event click must open a sourced dialog without navigation");
   await evaluate("document.getElementById('detail-close').click()");
   assert.equal(await evaluate("document.getElementById('detail-dialog').open"),false,"Event dialog must close");
   await evaluate("document.getElementById('tab-places').click()");
   await until(()=>evaluate("Boolean(document.querySelector('.place-open img'))"));
   const places=await evaluate("(()=>{const a=document.querySelector('.place-open');const img=a.querySelector('img');return {count:document.querySelectorAll('.place-open').length,img:img.getAttribute('src'),caption:a.querySelector('.place-art-caption')?.textContent}})()");
   assert(places.count>=30&&places.img.startsWith("./assets/")&&/ilustrativa/i.test(places.caption),"Places must show transparently labelled media");
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
  fs.rmSync(tmp,{recursive:true,force:true});
 }
}
main().catch(e=>{console.error(e.stack||e);server.close();process.exitCode=1});
