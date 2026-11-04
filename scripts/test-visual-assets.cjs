// Unit validation for the hero WebP, source-backed venue image mappings and negative regressions.
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"..");
const css=fs.readFileSync(path.join(root,"styles/horizonte-noturno.css"),"utf8");
const marker=".mast{position:relative;background-color:#08252d;background-image:";
assert(css.includes(marker),"Invalid hero CSS: color must be in background-color, not multi-layer shorthand");
const match=css.match(/\.mast\{[^}]*background-image:linear-gradient\([^)]*\),url\(data:image\/webp;base64,([A-Za-z0-9+/=]+)\)/);
assert(match,"Hero WebP not found in rendered background-image declaration");
const bytes=Buffer.from(match[1],"base64");
assert.equal(bytes.toString("ascii",0,4),"RIFF","Hero media header invalid");
assert.equal(bytes.toString("ascii",8,12),"WEBP","Hero media MIME mismatch");
assert(bytes.length>10000,"Hero media unexpectedly empty");
const photos=JSON.parse(fs.readFileSync(path.join(root,"data/licensed-category-photos.json"),"utf8")).items;
const venues=JSON.parse(fs.readFileSync(path.join(root,"data/venues.json"),"utf8")).venues;
const assignments=JSON.parse(fs.readFileSync(path.join(root,"data/venue-media.json"),"utf8")).items;
const select=require("./media-selection.js").selectVenue;
const ctx={categoryPhotos:{items:photos},venueMedia:{items:assignments}};
const selected=venues.map(v=>select(v,ctx));
assert.equal(selected.filter(Boolean).length,14,"Expected known licensed, illustrated venue assets");
assert.equal(selected.filter(x=>!x).length,25,"No unlicensed venue photos should be inferred");
for(const picture of selected.filter(Boolean)){
 const asset=path.resolve(root,picture.file);
 assert(asset.startsWith(root+path.sep)&&fs.existsSync(asset),"Approved venue art must exist locally");
 const data=fs.readFileSync(asset);
 assert.equal(data.toString("ascii",0,4),"RIFF","Venue illustration is not WebP");
 assert.equal(data.toString("ascii",8,12),"WEBP","Venue illustration MIME mismatch");
 assert.equal(picture.kind,"illustrative","Stock photo cannot imply the real venue");
}
const first=venues.find(v=>select(v,ctx));
const withoutRights={...ctx,categoryPhotos:{items:photos.map(p=>({...p,rightsStatus:"pending"}))}};
assert.equal(select(first,withoutRights),null,"Missing rights must block image display");
assert.equal(select(first,{...ctx,venueMedia:{items:[]}}),null,"Unmapped image must not appear");
console.log("Hero WebP and 14 source-backed venue illustrations verified; 25 neutral fallbacks enforced");
