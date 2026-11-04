(function(root){
"use strict";
const norm=s=>String(s||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase().replace(/\s+/g," ");
const fileOkay=(f,prefix)=>typeof f==="string"&&new RegExp("^\\./assets/"+prefix+"/[a-z0-9-]+\\.webp$").test(f);
const stockOkay=a=>!!a&&a.rightsStatus==="approved"&&a.license==="Pexels License"&&a.rightsEvidenceUrl==="https://www.pexels.com/license/"&&/^https:\/\/www\.pexels\.com\/photo\//.test(a.sourcePageUrl||"")&&!!a.photographer&&fileOkay(a.file,"photos");
function select(event,registries={}){
 const generic=registries.categoryPhotos?.items||[];
 const eventPhotos=registries.eventPhotos?.assets||[];
 const specificRights=registries.imageRights?.assets||[];
 const verifiedPoster=specificRights.find(a=>a.eventId===event.id&&a.rightsStatus==="approved"&&a.rightsEvidenceUrl&&a.license&&/^\.\/images\/[\w.-]+\.webp$/.test(a.file));
 if(verifiedPoster)return {file:verifiedPoster.file,kind:"event",label:"Imagem do evento",credit:verifiedPoster.attribution||"",sourceUrl:verifiedPoster.rightsEvidenceUrl,license:verifiedPoster.license};
 const photo=eventPhotos.find(a=>a.status==="approved"&&a.eventIds?.includes(event.id)&&a.role==="artist_archive"&&a.isPhotoOfUpcomingEvent===false&&
  ["cc by 4.0","cc0"].includes((a.license||"").toLowerCase())&&a.licenseUrl&&a.rightsEvidenceUrl?.startsWith("https://commons.wikimedia.org/wiki/File:")&&
  !!a.photographer&&fileOkay(a.file,"event-artists"));
 if(photo)return {file:photo.file,kind:"artist",label:"Foto do artista · arquivo",credit:photo.photographer,sourceUrl:photo.sourceFilePage,license:photo.license,caption:photo.caption};
 const byFile=new Map(generic.filter(stockOkay).map(x=>[x.file,x]));
 const venueKey=norm(event.venue);
 const known=venueKey&&venueKey!=="local a confirmar"&&venueKey!=="a definir";
 const assigned=(registries.venueMedia?.items||[]).find(x=>norm(x.venue)===venueKey&&x.scope==="venue"&&x.photoType==="licensed_generic_illustration"&&x.sourceImageIsNotActualVenue===true);
 let licensed=assigned?byFile.get(assigned.imageFile):undefined;
 if(!licensed&&known){
  const sorted=[...byFile.values()].sort((a,b)=>a.file.localeCompare(b.file));
  let hash=2166136261;
  for(const ch of venueKey){hash^=ch.codePointAt(0);hash=Math.imul(hash,16777619)}
  if(sorted.length)licensed=sorted[(hash>>>0)%sorted.length];
 }
 if(!licensed&&!known)licensed=[...byFile.values()].find(x=>x.category===event.category);
 if(licensed)return {file:licensed.file,kind:"illustrative",label:"Foto ilustrativa",credit:licensed.photographer,sourceUrl:licensed.sourcePageUrl,license:licensed.license};
 const covers={"Baladas":"baladas","Shows":"shows","Humor":"humor","Teatro":"teatro","Cinema":"cinema","Dança":"danca","Festivais":"festivais","Feiras":"feiras","Cultura":"cultura"};
 return {file:"./assets/covers/"+(covers[event.category]||"cultura")+".svg",kind:"cover",label:"Arte ilustrativa",credit:"PartiuFloripa"};
}
// Venue profiles require their own approved rights record. Until then, display only
// explicit, licensed CATEGORY illustrations with a visible disclosure.
function selectVenue(venue,registries={}){
 const assigned=(registries.venueMedia?.items||[]).find(item=>
  norm(item.venue)===norm(venue?.name)&&item.scope==="venue"&&
  item.photoType==="licensed_generic_illustration"&&item.sourceImageIsNotActualVenue===true);
 if(!assigned)return null;
 const photo=(registries.categoryPhotos?.items||[]).find(item=>
  item.file===assigned.imageFile&&stockOkay(item));
 if(!photo)return null;
 return {file:photo.file,kind:"illustrative",label:"Foto ilustrativa, não é a casa",
         credit:photo.photographer,sourceUrl:photo.sourcePageUrl};
}
const api={select,selectVenue,normalizeVenue:norm};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
if(root)root.PartiuMedia=api;
})(typeof window!=="undefined"?window:null);
