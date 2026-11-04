'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..'),url=process.env.PARTIU_PREVIEW_URL||'http://127.0.0.1:8767/';
const chrome=process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile=fs.mkdtempSync(path.join(os.tmpdir(),'pf-vitrine-cdp-'));
const proc=spawn(chrome,['--headless=new','--no-first-run','--no-default-browser-check','--disable-extensions','--disable-background-networking','--no-sandbox','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let socket,n=1;const pending=new Map();
function send(method,params={}){return new Promise((resolve,reject)=>{const id=n++;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})}
async function evaluate(expression){const p=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(p.exceptionDetails)throw Error(JSON.stringify(p.exceptionDetails));return p.result.value}
async function waitFor(expression){for(let i=0;i<80;i++){if(await evaluate(expression))return;await sleep(120)}throw Error('Browser not ready: '+expression)}
const METRICS=`(()=>{
const c=document.querySelector('#agenda .event-search.event-vitrine'),m=c?.querySelector('.event-media'),i=c?.querySelector('.event-info'),h=c?.querySelector('h3'),p=c?.querySelector('.event-place'),f=c?.querySelector('.event-bottom'),a=c?.querySelector('.event-action'),category=c?.querySelector('.event-meta');
const b=e=>{if(!e)return null;const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};
const s=e=>e?getComputedStyle(e):null;
const cards=[...document.querySelectorAll('#agenda .event-search.event-vitrine')];
return {body:b(document.querySelector('main.wrap')),bodyPadding:{left:parseFloat(getComputedStyle(document.querySelector('main.wrap')).paddingLeft),right:parseFloat(getComputedStyle(document.querySelector('main.wrap')).paddingRight)},header:b(document.querySelector('#agenda-section .section-head')),filters:b(document.querySelector('#agenda-section .filters')),months:b(document.getElementById('month-switcher')),column:b(document.getElementById('agenda')),section:b(document.getElementById('agenda-section')),featuredCard:b(document.querySelector('#featured .event-featured')),width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+2,cards:cards.length,card:b(c),media:b(m),info:b(i),title:b(h),place:b(p),footer:b(f),action:b(a),category:b(category),minWidth:s(m)?.minWidth,infoDisplay:s(i)?.display,infoDirection:s(i)?.flexDirection,titleAlign:s(h)?.alignSelf,footerAlign:s(f)?.alignSelf,pseudo:a?getComputedStyle(a,'::after').content:null,bg:s(c)?.backgroundColor,border:s(c)?.borderTopStyle,radius:s(c)?.borderTopLeftRadius,titleFont:s(h)?.fontFamily,imageKinds:[...new Set(cards.map(x=>x.querySelector('.event-media')?.dataset.mediaKind).filter(Boolean))],photoCount:cards.filter(x=>x.querySelector('img[data-kind="event-review"]')).length,featured:document.querySelectorAll('#featured .event-featured:not(.event-vitrine)').length,dates:document.querySelectorAll('#agenda .event-vitrine .event-when').length,fullBg:getComputedStyle(document.body,'::before').backgroundImage.includes('data:image/webp;base64,'),href:c?.getAttribute('href'),footerText:f?.innerText}
})()`;
function verify(x,width){
assert(x.cards>0,'Vitrine cards missing at '+width);
const contentWidth=x.body.w-x.bodyPadding.left-x.bodyPadding.right;
const contentX=x.body.x+x.bodyPadding.left;
const colRatio=x.section.w/contentWidth,expectedCol=width>=900?.7:1;
assert(Math.abs(colRatio-expectedCol)<.012,'Upcoming section (title, filters and cards) must be '+Math.round(expectedCol*100)+'% of content width at '+width+': '+colRatio);
assert(Math.abs((x.section.x-contentX)-(contentWidth-x.section.w)/2)<2,'Upcoming section lost center alignment within content at '+width);
for(const [name,rect] of [['header',x.header],['filters',x.filters],['cards list',x.column],['first card',x.card]]){
 assert(Math.abs(rect.x-x.section.x)<2&&Math.abs(rect.w-x.section.w)<2,'Upcoming '+name+' must align with centered section at '+width);
}
assert(x.months.x>=x.section.x-2&&x.months.right<=x.section.right+2,'Month controls escaped centered section at '+width);
assert(x.featuredCard.w>x.section.w*(width>=900?1.25:.99),'Day highlight must not shrink with the upcoming section');
assert.equal(x.featured,1,'Day highlight must remain distinct');
assert.equal(x.dates,x.cards,'Every card needs date/time footer');
assert(!x.overflow,'Page overflows horizontally at '+width);
assert(x.fullBg,'Approved fixed hero background missing');
assert.equal(x.infoDisplay,'flex','Legacy desktop grid returned');
assert.equal(x.infoDirection,'column','Card content must stack vertically');
assert.equal(x.titleAlign,'stretch','Legacy title align-self:start returned');
assert.equal(x.footerAlign,'stretch','Legacy footer align-self:start returned');
assert(['none','normal'].includes(x.pseudo),'Duplicate pseudo-Detalhes returned');
assert.equal(x.bg,'rgb(16, 46, 54)','Vitrine surface changed');
assert.equal(x.border,'solid','Card border missing');
assert.equal(x.radius,'12px','Card rounding changed');
assert(x.titleFont.includes('DM Serif Display'),'Approved serif title lost');
assert(x.href?.includes('./evento/'),'Card must link to internal details');
assert(x.media?.w>0,'Event thumbnail missing');
const ratio=x.media.w/x.card.w,expected=width<700?(width<=365?.36:.37):.28;
assert(Math.abs(ratio-expected)<.025,'Wrong photo ratio at '+width+' = '+ratio+', expected '+expected);
assert.equal(x.minWidth,'0px','Legacy thumbnail min-width returned');
assert(x.title.w/x.info.w>.85,'Title shrunk into old grid on '+width);
assert(x.footer.w/x.info.w>.85,'Footer shrunk into old grid on '+width);
assert(Math.abs(x.footer.right-x.action.right)<6,'Detail action no longer right-aligned');
assert(x.category.y<=x.title.y && x.title.y<=x.place.y && x.place.y<=x.footer.y+2,'Card content visual order changed');
assert(!x.imageKinds.includes('illustrative'),'Generic event images must not replace review photos');
assert(x.photoCount>0,'Event photos not present');
assert(x.footerText.includes('Detalhes'),'Detail action missing');
return {width,cards:x.cards,photoRatio:Math.round(ratio*100)+'%',titleFill:Math.round(x.title.w/x.info.w*100)+'%',footerFill:Math.round(x.footer.w/x.info.w*100)+'%',photoCards:x.photoCount};
}
async function ready(){const p=path.join(profile,'DevToolsActivePort');for(let i=0;i<100;i++){if(fs.existsSync(p))return fs.readFileSync(p,'utf8').trim().split(/\r?\n/)[0];await sleep(100)}throw Error('Chrome cannot start')}
async function run(){
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),css=fs.readFileSync(path.join(root,'styles','horizonte-noturno.css'),'utf8'),review=JSON.parse(fs.readFileSync(path.join(root,'data','media-review.local.json'),'utf8'));
assert(html.includes('event-search event-vitrine')&&html.includes('privateMediaPreview'),'Private Vitrine source missing');
assert(css.includes('ADR-038 / regression 2026-11-03:'),'Legacy CSS isolation not installed');
assert.equal(review.scope,'private-preview','Never publish this preview media registry');
assert(review.events.length>0&&review.venues.length>0,'Photo overlay missing');
const port=await ready(),pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json(),page=pages.find(x=>x.type==='page');
assert(page,'No Chrome page');socket=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true})});
socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}});
await send('Page.enable');await send('Runtime.enable');
const results=[],shotDir=path.join(os.tmpdir(),'partiu-vitrine-qa-screenshots');fs.mkdirSync(shotDir,{recursive:true});
for(const width of [360,390,768,1280]){
await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<700});
await send('Page.navigate',{url});
await waitFor('document.querySelectorAll("#agenda .event-search.event-vitrine").length>0');
const decoded=await evaluate("(async()=>{const im=document.querySelector('#agenda .event-vitrine img[data-kind=\"event-review\"]');if(!im)return false;im.scrollIntoView({block:'center'});try{await im.decode()}catch{}return im.naturalWidth>0})()");
assert(decoded,'Actual event photo did not load on '+width);
const metrics=await evaluate(METRICS);results.push(verify(metrics,width));
if(width===390||width===1280){const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(shotDir,'vitrine-'+width+'.png'),Buffer.from(shot.data,'base64'))}
}
// Negative regression: deliberately reintroduce the old CSS in the isolated browser, not in source.
await evaluate("(()=>{const el=document.createElement('style');el.id='simulated-regression';el.textContent='#agenda .event-search.event-vitrine .event-info h3{align-self:start}#agenda .event-search.event-vitrine .event-bottom{align-self:start}#agenda .event-search.event-vitrine .event-action::after{content:\" Detalhes\"}';document.head.append(el);return true})()");
const broken=await evaluate(METRICS);assert.throws(()=>verify(broken,1280),/Legacy title|Duplicate|Footer shrunk/,'Test should catch the original regression');
await evaluate("document.getElementById('simulated-regression').remove()");
verify(await evaluate(METRICS),1280);
// Negative regression: full-width desktop list must be rejected by the same verifier.
await evaluate("(()=>{const el=document.createElement('style');el.id='simulated-width-regression';el.textContent='#agenda-section{width:100%!important;margin-inline:0!important}';document.head.append(el)})()");
const wrongWidth=await evaluate(METRICS);
assert.throws(()=>verify(wrongWidth,1280),/Upcoming section .* must be|Upcoming section lost center/,'Regression sentinel must reject full-width/left-aligned desktop section');
await evaluate("document.getElementById('simulated-width-regression').remove()");
verify(await evaluate(METRICS),1280);
// Also catch the precise former failure: 70% cards, but full-width heading and filters.
await evaluate("(()=>{const el=document.createElement('style');el.id='simulated-split-regression';el.textContent='#agenda-section{width:100%!important}#agenda{width:70%!important;margin-inline:auto!important}';document.head.append(el)})()");
const splitWidth=await evaluate(METRICS);
assert.throws(()=>verify(splitWidth,1280),/Upcoming section .* must be|Upcoming .*must align/,'Regression sentinel must reject full-width heading above narrowed cards');
await evaluate("document.getElementById('simulated-split-regression').remove()");
verify(await evaluate(METRICS),1280);
await evaluate("document.getElementById('tab-places').click()");
await waitFor('document.querySelectorAll(".place-card").length>0');
const places=await evaluate("(()=>{const all=[...document.querySelectorAll('.place-card')];return {total:all.length,real:all.filter(c=>c.querySelector('img[data-kind=\"venue-review\"]')).length,generic:all.filter(c=>c.querySelector('img[data-kind=\"illustrative\"]')).length}})()");
assert.equal(places.total,39,'Venue directory regressed');
assert(places.real>=8,'Private venue profile photos lost');
assert.equal(places.generic,0,'Venue photos reverted to generic');
console.log(JSON.stringify({passed:true,preview:url,results,places,negativeRegressionDetected:true,screenshotDir:shotDir},null,2));
}
run().catch(e=>{console.error('VITRINE_REGRESSION_FAILED',e.stack||e);process.exitCode=1}).finally(async()=>{socket?.close();proc.kill();await sleep(150);try{fs.rmSync(profile,{force:true,recursive:true})}catch{}});
