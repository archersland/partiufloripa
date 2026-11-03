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
const detail=fs.readFileSync(path.join(root,"evento.html"),"utf8");
const credits=fs.readFileSync(path.join(root,"creditos.html"),"utf8");
const detailCss=fs.readFileSync(path.join(root,"styles/horizonte-detalhe.css"),"utf8");
assert(detail.includes('data-ui-baseline="horizonte-noturno-v0.2"'),"detail baseline missing");
assert(detail.includes('href="./styles/horizonte-detalhe.css"'),"detail night stylesheet not linked");
assert(credits.includes('data-ui-baseline="horizonte-noturno-v0.2"'),"credits must retain night identity");
assert(detailCss.includes("--pf-peach:#ffaf78")&&detailCss.includes("--pf-mint:#8fe5cc"),"detail editorial palette is inconsistent");
assert(detail.includes('src="./scripts/event-ux.js"')&&detail.includes("calendarFile("),"detail .ics flow lost");
const dialogScript=fs.readFileSync(path.join(root,"scripts/detail-dialog.js"),"utf8");
assert(css.includes("background:linear-gradient(")&&css.includes("no-repeat #08252d"),"bridge background shorthand must render both photo and night overlay");
assert(!css.includes("background:#08252d linear-gradient("),"invalid first-layer background color would hide bridge photo");
assert(html.includes('id="detail-dialog"')&&html.includes('src="./scripts/detail-dialog.js"'),"native modal host / script missing");
assert(html.includes('class="place-open"')&&html.includes("data-place-id"),"place cards must open accessible local detail");
assert(html.includes("PartiuMedia.select({venue:venue.name"),"venue cards need licensed editorial thumbnail selection");
for(const hook of ["eventDetails(e)","placeDetails(venue)","a.event-card, .pf-map-popup .pf-map-event-link","ev.ctrlKey||ev.metaKey","sourceReview===\"quarantined\"","PartiuEventUX.calendarFile(e)"]){
 assert(dialogScript.includes(hook),"detail modal behavior missing: "+hook);
}
assert(css.includes(".detail-dialog::backdrop")&&css.includes(".place-art img"),"modal and place photography styles missing");
assert(css.includes("body::before")&&css.includes("position:fixed")&&css.includes("background-position:75% center"),"full-screen static bridge background missing");
assert(html.indexOf('id="search"')>html.indexOf('class="date-bar"'),"search must live inside the date toolbar");
assert(!html.includes('<div class="intro"><h1 class="hero-title">Seu próximo rolê<br>começa aqui.</h1><label class="search"'),"large hero search unexpectedly restored");
for(const id of ["date-row","date-search","date-picker-panel","toggle-search","toggle-date"]){
 assert(html.includes('id="'+id+'"'),"missing compact-toolbar control "+id);
}
for(const key of ["function setDateBarMode(mode)","aria-expanded","showPicker?.()"]){
 assert(html.includes(key),"date toolbar interaction missing: "+key);
}
console.log("Approved Horizonte Noturno UI baseline passed: source markers, colors, editorial hierarchy, three tabs, data hooks, dates and heat separation");
