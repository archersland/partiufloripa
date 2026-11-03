// Post-deploy HTTP contract, not a claim of human UI approval.
const assert=require("node:assert/strict");
const root=process.env.PARTIU_SITE_URL||"https://archersland.github.io/partiufloripa/";
const target=new URL(root.endsWith("/")?root:root+"/");
const version=process.env.GITHUB_SHA||"local";
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function get(path){
 const url=new URL(path,target);
 url.searchParams.set("_deploy",version.slice(0,12));
 const res=await fetch(url,{headers:{"Cache-Control":"no-cache"},signal:AbortSignal.timeout(18000)});
 if(!res.ok)throw Error(res.status+" "+url);
 return res;
}
async function verify(){
 const html=await (await get("./")).text();
 assert(html.includes('data-ui-baseline="horizonte-noturno-v0.2"'),"published HTML is legacy UI");
 assert(html.includes('href="./styles/horizonte-noturno.css"'),"published stylesheet link missing");
 assert(html.includes('src="./scripts/home-layout.js"'),"published editorial module missing");
 const css=await (await get("./styles/horizonte-noturno.css")).text();
 for(const t of ["--pf-bg:#041b21","--pf-mint:#8fe5cc","--pf-peach:#ffaf78","data:image/webp;base64,"])assert(css.includes(t),"published design token missing "+t);
 const [events,venues,hours]=await Promise.all([
 get("./events.json").then(x=>x.json()),
 get("./data/venues.json").then(x=>x.json()),
 get("./data/venue-hours.json").then(x=>x.json())
 ]);
 assert(events.events.length>=56,"published events lost");
 assert(venues.venues.length>=39,"published venues lost");
 assert(hours.venues.length>=5,"published reviewed schedules lost");
 const details=await (await get("./evento/"+events.events[0].slug+"/")).text();
 assert(details.includes('data-ui-baseline="horizonte-noturno-v0.2"'),"published detail is using legacy design");
 assert(details.includes('<base href="../../">'),"published detail has broken relative asset base");
 assert(details.includes('href="./styles/horizonte-detalhe.css"'),"published detail stylesheet missing");
 const detailCss=await (await get("./styles/horizonte-detalhe.css")).text();
 assert(detailCss.includes("--pf-peach:#ffaf78"),"published detail style inconsistent");
 const scripts=await Promise.all(["./scripts/home-layout.js","./scripts/venue-hours.js"].map(p=>get(p).then(x=>x.text())));
 assert(scripts[0].includes("selectHome("),"published home logic missing");
 assert(scripts[1].includes("function status("),"published venue-hours logic missing");
 console.log("Live deployed site verified: approved theme + editorial logic + venue hours + catalog floors",target.toString());
}
(async()=>{
 let last;
 for(let attempt=1;attempt<=7;attempt++){
  try{return await verify()}catch(e){last=e;console.error("Post-deploy attempt "+attempt+" failed:",e.message);if(attempt<7)await sleep(10000)}
 }
 throw last;
})().catch(e=>{console.error(e);process.exitCode=1});
