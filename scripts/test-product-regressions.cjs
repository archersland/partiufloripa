const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const events=JSON.parse(read("events.json")).events;
const venues=JSON.parse(read("data/venues.json")).venues;
const schedules=JSON.parse(read("data/venue-hours.json")).venues;
const ux=require("./event-ux.js");
const home=require("./home-layout.js");
const hours=require("./venue-hours.js");
const geo=require("./venue-location.js");
const audience=require("./audience-heat.js");
const ids=new Set();
for(const v of venues){
 assert(v.id&&v.name&&v.region,"venue core fields are required");
 assert(!ids.has(v.id),"duplicate venue id "+v.id);ids.add(v.id);
 assert(Array.isArray(v.locationEvidence)&&v.locationEvidence.length>0&&v.locationEvidence.every(u=>/^https:\/\//.test(u)),"venue provenance missing "+v.id);
 if(!v.coordinates)assert.equal(v.precision,"region_centroid","do not invent entrance coordinates");
}
assert(venues.length>=39,"venue directory unexpectedly shrank: adjust contract only with an editorial decision");
assert(events.length>=56,"event directory unexpectedly shrank: adjust contract only with an editorial decision");
const eventIds=new Set();
for(const e of events){
 assert(!eventIds.has(e.id),"duplicate event "+e.id);eventIds.add(e.id);
 assert(ux.validDate(e.date),"invalid event date "+e.id);
 assert(/^https:\/\//.test(e.source),"event source missing "+e.id);
 if(e.sourceReview==="quarantined")assert.notEqual(e.status,"verified","quarantined event cannot be verified");
}
assert(events.some(e=>e.sourceReview==="quarantined"),"quarantine data unexpectedly lost");
const eligible=events.filter(e=>e.sourceReview!=="quarantined");
assert(eligible.length<events.length,"quarantine filter is not active");
const withoutEvents=home.selectHome([],{today:"2026-11-03",mode:"today"});
assert.equal(withoutEvents.featured,null,"no event should remain no event");
assert.equal(withoutEvents.upcoming.length,0,"venue must never be fabricated as event");
const sample=eligible.filter(e=>e.date>="2026-11-03").slice(0,10);
const projected=home.selectHome(sample,{today:"2026-11-03",month:"2026-11"});
const selectedIds=[...(projected.featured?[projected.featured.id]:[]),...projected.upcoming.map(e=>e.id)];
assert.equal(new Set(selectedIds).size,selectedIds.length,"do not duplicate featured event among upcoming");
assert(selectedIds.every(id=>eventIds.has(id)),"the renderer must never invent event IDs");
const hoursIds=new Set();
for(const s of schedules){
 assert(ids.has(s.id),"schedule belongs to registered venue "+s.id);
 assert(!hoursIds.has(s.id),"duplicate schedule "+s.id);hoursIds.add(s.id);
 assert(/^https:\/\//.test(s.sourceUrl)&&hours.validDate(s.reviewedAt),"schedule must have dated source");
}
assert.equal(hours.status("bugio-centro",{venues:schedules},"2026-11-03","2026-11-03").status,"unknown","missing hours must never be treated as closed");
assert.equal(hours.status("ori-boteco-centro",{venues:schedules},"2026-11-03","2027-03-03").status,"unknown","stale hours must not determine status");
const unknownEvent={venue:"Lugar não catalogado",region:"Florianópolis"};
assert.equal(geo.resolve(unknownEvent,{venues}),null,"no citywide invented map point");
const noEvidence=audience.resolve({venue:"Bar do Espartano",date:"2026-11-03"},{venues:[]});
assert.equal(noEvidence.people,null,"zero evidence must not turn into venue-based audience count");
const html=read("index.html");
assert(html.includes('Promise.allSettled(["./events.json","./data/venues.json"'),"agenda and venues must fail independently");
assert(html.includes('venuesUnavailable=results[1].status==="rejected"'),"directory failure state required");
assert(html.includes('if(venuesUnavailable){results.innerHTML='),"missing venues must not look like empty city");
assert(html.includes('hoursDirectory=hours'),"schedule has to be source-controlled and optional");
assert(html.includes('PartiuAudience.aggregate(items,capacityDirectory)'),"no heatmap from venue existence");
console.log("Product regression guard passed: event/venue split, catalog floors, provenance, quarantine, geocoding, audience, schedules, and failure modes");
