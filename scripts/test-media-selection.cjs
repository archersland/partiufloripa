const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const load=name=>JSON.parse(fs.readFileSync(path.join(root,'data',name+'.json'),'utf8'));
const events=JSON.parse(fs.readFileSync(path.join(root,'events.json'),'utf8')).events;
const ctx={categoryPhotos:load('licensed-category-photos'),venueMedia:load('venue-media'),eventPhotos:load('event-artist-photos'),imageRights:load('image-rights')};
const media=require('./media-selection.js');
const groups=new Map(),differentMedia=[];
for(const e of events){
 const selected=media.select(e,ctx);
 assert(selected.file&&fs.existsSync(path.join(root,selected.file)),'Media missing for '+e.title);
 assert(['artist','illustrative','cover','event'].includes(selected.kind));
 if(selected.kind==='artist'){
   assert(selected.label.includes('arquivo')&&selected.sourceUrl.startsWith('https://commons.wikimedia.org/'));
   differentMedia.push(e.id);
 } else if(e.venue!=='Local a confirmar'){
   const key=media.normalizeVenue(e.venue);
   if(groups.has(key))assert.equal(selected.file,groups.get(key),'Same venue must have one common generic fallback: '+e.venue);
   else groups.set(key,selected.file);
 }
}
assert.equal(differentMedia.length,4,'1 Vitor Kley + 3 Gregorio Duvivier archive records');
assert.equal(ctx.venueMedia.items.length,14);
assert(ctx.venueMedia.items.every(x=>ctx.categoryPhotos.items.some(i=>i.file===x.imageFile&&i.rightsStatus==='approved')));
for(const a of ctx.eventPhotos.assets){
 assert(a.eventIds.length>0&&['cc by 4.0','cc0'].includes(a.license.toLowerCase()));
 assert(a.isPhotoOfUpcomingEvent===false&&a.sourceFilePage===a.rightsEvidenceUrl);
 assert(a.licenseUrl&&a.photographer&&a.modifiedFromOriginal);
 assert(/^\.\/assets\/event-artists\/[a-z0-9-]+\.webp$/.test(a.file));
 const binary=fs.readFileSync(path.join(root,a.file));
 assert.equal(crypto.createHash('sha256').update(binary).digest('hex'),a.sha256);
}
const today=events.find(e=>e.title==='Daniel Duncan');
const other=events.find(e=>e.title.startsWith('Luã Lima'));
assert.equal(media.select(today,ctx).file,media.select(other,ctx).file);
assert.equal(media.select(today,ctx).kind,'illustrative');
const venueCatalog=load('venues').venues;
const venueVisuals=venueCatalog.map(venue=>({name:venue.name,visual:media.selectVenue(venue,ctx)}));
assert.equal(venueVisuals.length,39,'Venue catalog changed: review photo QA expectations');
assert.equal(venueVisuals.filter(x=>x.visual).length,14,'All 14 licensed venue illustrations must be discoverable');
assert.equal(venueVisuals.filter(x=>!x.visual).length,25,'Unlicensed / absent venue images must remain neutral');
for(const {name,visual} of venueVisuals){
 if(!visual)continue;
 assert.equal(visual.kind,'illustrative','Venue image cannot be treated as real: '+name);
 assert(visual.label.includes('não é a casa'),'Venue illustration needs truthful label');
 assert(fs.existsSync(path.join(root,visual.file)),'Venue image missing: '+name);
}
const sample=venueCatalog.find(v=>media.selectVenue(v,ctx));
assert.equal(media.selectVenue(sample,{...ctx,categoryPhotos:{items:[]}}),null,'No permission means no venue image');
assert.equal(media.selectVenue(sample,{...ctx,venueMedia:{items:[]}}),null,'No mapping means no venue image');
console.log('Media priority and invariants passed: '+groups.size+' venues, '+differentMedia.length+' artist-archive events');
