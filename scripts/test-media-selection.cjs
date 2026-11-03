const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const root=path.resolve(__dirname,".."),load=p=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const media=require("./media-selection.js"),events=load("events.json").events,rights=load("data/image-rights.json");
const ctx={imageRights:rights};
for(const e of events){
 const selected=media.select(e,ctx);
 assert.equal(selected.kind,"none","No unlicensed posters or generic images may become public by default: "+e.id);
 assert.equal(selected.file,null);
}
assert(rights.assets.length===12&&rights.assets.every(x=>x.rightsStatus==="pending"),"The twelve catalogued posters remain rights-pending");
const historic=load("data/event-artist-photos.json");
for(const a of historic.assets){
 assert(a.isPhotoOfUpcomingEvent===false,"archive photos must not be passed as event-specific");
 assert.equal(crypto.createHash("sha256").update(fs.readFileSync(path.join(root,a.file))).digest("hex"),a.sha256);
}
const selected=events.find(e=>e.id==="evt-76f759a2b51c");
const preview={scope:"private-preview",events:[{eventId:selected.id,sourceEventUrl:selected.source,file:"./images/c44cc3c865ffdb06.webp",rightsStatus:"pending"}],venues:[{venue:"Bar do Espartano",file:"./assets/venue-review/bar-do-espartano.webp",rightsStatus:"pending",type:"logo"}]};
assert.equal(media.select(selected,{...ctx,reviewMedia:preview}).kind,"none","review without explicit permission stays closed");
assert.equal(media.select(selected,{...ctx,reviewOnly:true,reviewMedia:preview}).kind,"event-review");
assert.equal(media.select({...selected,id:"evt-111111111111"},{...ctx,reviewOnly:true,reviewMedia:preview}).kind,"none","event images cannot attach to unrelated events");
assert.equal(media.select({...selected,source:"https://wrong.example.com"},{...ctx,reviewOnly:true,reviewMedia:preview}).kind,"none","review source must match");
assert.equal(media.select({venue:"Bar do Espartano"},{...ctx,reviewOnly:true,reviewMedia:preview}).kind,"venue-review");
assert.equal(media.select({...selected,venue:"Bar do Espartano"},{...ctx,reviewOnly:true,reviewMedia:preview}).kind,"event-review","venue logotype cannot replace event poster");
assert.equal(media.select({venue:"LUGAR FICTÍCIO"},{...ctx,reviewOnly:true,reviewMedia:preview}).kind,"none");
console.log("Authentic-only media policy: 56 events default to empty; 12 source-linked pending posters; private preview gated and correctly keyed");
