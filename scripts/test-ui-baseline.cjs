const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"..");
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const css=fs.readFileSync(path.join(root,"styles/horizonte-noturno.css"),"utf8");
const required=["--pf-bg:#041b21","--pf-mint:#8fe5cc","--pf-peach:#ffaf78","DM Serif Display",".hero-title","#featured .event-featured","#agenda .event-search",".place-card.is-closed"];
for(const key of required)assert(css.includes(key),"approved night theme token or layout missing: "+key);
assert(css.includes("data:image/webp;base64,"),"approved decorative header image missing");
assert(/data-ui-baseline="horizonte-noturno-v0\.2"/.test(html),"explicit approved UI baseline marker absent");
assert(html.includes('href="./styles/horizonte-noturno.css"'),"approved stylesheet absent");
assert(html.indexOf('href="./styles/horizonte-noturno.css"')>html.indexOf("</style>"),"approved styles must override legacy styles");
assert(html.includes('class="hero-title">Seu próximo rolê<br>começa aqui.'),"approved hero typography/copy missing");
assert(html.includes('<h2 id="featured-title">Destaque do dia'),"featured editorial hierarchy missing");
assert(html.includes('<h2>Nos próximos dias</h2>'),"upcoming editorial hierarchy missing");
for(const id of ["tab-list","tab-places","tab-map","featured","agenda","map-panel","places-panel","global-date","place-status","place-region","night-date","search"]){
 assert(html.includes('id="'+id+'"'),"missing UI control "+id);
 const matches=html.match(new RegExp('id="'+id+'"',"g"))||[];
 assert.equal(matches.length,1,"duplicate UI id "+id);
}
assert(html.indexOf('class="date-bar"')<html.indexOf('class="view-tabs"'),"shared date must remain above tabs");
assert(html.includes('src="./scripts/home-layout.js"'),"editorial projection must be loaded");
assert(html.includes('PartiuHomeLayout.selectHome(entries'),"homepage must use tested projection");
assert(html.includes('PartiuVenueHours.status('),"places must use source-backed weekly hours");
assert(html.includes('sourceReview!=="quarantined"'),"quarantined entries must stay off agenda");
assert(html.includes('PartiuAudience.aggregate(items,capacityDirectory)'),"map heat must use audience evidence, not venue counts");
assert(!html.includes('document.querySelector(".quick-dates").addEventListener("click",e=>{const b=e.target.closest("[data-quick-date]");if(!b)return;dateFilter=b.dataset.quickDate;render()}'),"legacy date handler restored");
console.log("Approved Horizonte Noturno UI baseline passed: source markers, colors, editorial hierarchy, three tabs, data hooks, dates and heat separation");
