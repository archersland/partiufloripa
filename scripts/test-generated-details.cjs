const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"..");
const events=JSON.parse(fs.readFileSync(path.join(root,"events.json"),"utf8")).events;
const sample=[events[0],events.at(-1),...events.filter(e=>e.sourceReview==="quarantined").slice(0,1)].filter(Boolean);
assert(events.length>=56,"event catalog unexpectedly shrank");
for(const e of sample){
 const html=fs.readFileSync(path.join(root,"evento",e.slug,"index.html"),"utf8");
 assert(html.includes('<base href="../../">'),"nested detail must resolve root assets correctly: "+e.slug);
 assert(html.includes('data-ui-baseline="horizonte-noturno-v0.2"'),"detail visual baseline missing: "+e.slug);
 assert(html.includes('href="./styles/horizonte-detalhe.css"'),"night detail CSS not linked: "+e.slug);
 assert(html.includes('src="./scripts/event-ux.js"'),"event calendar/share module missing: "+e.slug);
 assert(html.includes('data-event-id="'+e.id+'"'),"event detail mismatch: "+e.slug);
 const url='https://archersland.github.io/partiufloripa/evento/'+e.slug+'/';
 assert(html.includes('<link rel="canonical" href="'+url+'">'),"canonical mismatch: "+e.slug);
 if(e.status!=="verified")assert(html.includes('content="noindex,follow"'),"unverified details must not be indexed: "+e.slug);
}
console.log("Generated event-page regression tests passed: "+sample.length+" pages, nested paths, style, links, canonical, status");
