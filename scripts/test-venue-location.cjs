const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),geo=require('./venue-location.js');
const venues=JSON.parse(fs.readFileSync(path.join(root,'data/venues.json'),'utf8'));
const events=JSON.parse(fs.readFileSync(path.join(root,'events.json'),'utf8')).events;
const e=events.find(x=>x.title==='Daniel Duncan');
assert(e&&e.region==='Saco Grande');
const p=geo.resolve(e,venues);
assert(p&&p.venue==='Floripa Comedy Club'&&p.region==='Saco Grande');
assert(Math.abs(p.lat+27.5346491)<.000001);
assert.notEqual(p.precision,'exact_entrance');
assert.equal(geo.resolve({...e,region:'Lagoa da Conceição'},venues).region,'Saco Grande');
assert.equal(geo.resolve({venue:'Unknown',region:'Florianópolis'},venues),null);
assert.equal(geo.resolve({venue:'Unknown',region:'Lagoa da Conceição'},venues).precision,'region_centroid');
assert.equal(geo.resolve(e,{venues:[{...venues.venues[0],coordinates:[0,0]}]}),null);
console.log('Venue location tests passed');

const regionOnly={venues:[{name:'Teatro Ademir Rosa',region:'Agronômica',locationEvidence:['https://example.org/cic']}]};
assert.equal(geo.resolve({venue:'Teatro Ademir Rosa',region:'Florianópolis'},regionOnly)?.region,'Agronômica');
assert.equal(geo.resolve({venue:'Teatro Ademir Rosa',region:'Florianópolis'},regionOnly)?.precision,'region_centroid');
assert.equal(geo.resolve({venue:'Teatro Ademir Rosa',region:'Florianópolis'},{venues:[{name:'Teatro Ademir Rosa',region:'Agronômica'}]}),null);


const normalized = s => String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const namedVenues = [...new Set(events.filter(e=>e.venue!=='Local a confirmar').map(e=>e.venue))];
for(const name of namedVenues){
 assert(venues.venues.some(v=>normalized(v.name)===normalized(name)||(v.aliases||[]).some(a=>normalized(a)===normalized(name))), 'Missing venue registry record: '+name);
}
const ids=new Set();
for(const v of venues.venues){
 assert(!ids.has(v.id),'Duplicate venue id: '+v.id);ids.add(v.id);
 assert(v.name&&v.region,'Missing name/region '+v.id);
 assert(Array.isArray(v.locationEvidence)&&v.locationEvidence.every(url=>url.startsWith('https://'))&&v.locationEvidence.length,'Evidence URL required: '+v.id);
 assert(/^2026-\d\d-\d\d$/.test(v.reviewedAt),'Review date required: '+v.id);
 if(!v.coordinates)assert.equal(v.precision,'region_centroid','No invented entrance coords: '+v.id);
}
for(const id of ['celula-showcase','etc-casa-de-vinhos','chopp-do-gus-corrego-grande','john-bull-floripa','bugio-centro','bugio-trindade','berlin-floripa','galeria-lama','franz-cabaret']){
 const v=venues.venues.find(v=>v.id===id);
 assert(v&&v.address&&v.locationEvidence.length,'New venue requires textual address and evidence: '+id);
 assert.equal(v.coordinates,undefined,'New venue coordinates must remain unknown: '+id);
}
assert.equal(geo.resolve({venue:'Bar do Espartano',region:'Florianópolis'},venues).region,'Lagoa da Conceição');
assert.equal(geo.resolve({venue:'Teatro Álvaro de Carvalho',region:'Florianópolis'},venues).precision,'region_centroid');
assert.equal(geo.resolve({venue:'Célula Showcase',region:'Florianópolis'},venues),null,'No source-approved João Paulo coordinates/centroid');
console.log('Venue directory coverage and provenance passed: '+namedVenues.length+' catalog venues, '+venues.venues.length+' registered');
