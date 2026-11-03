(function(root){
"use strict";
/* Selection policy: show only images of the actual event/venue. Unlicensed review
   assets may load ONLY with an explicit private-preview registry. */
const norm=s=>String(s||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase().replace(/\s+/g," ");
const fileOkay=(f,prefix)=>typeof f==="string"&&new RegExp("^\\./assets/"+prefix+"/[a-z0-9-]+\\.webp$").test(f);
const empty={file:null,kind:"none",label:"Imagem real ainda não cadastrada"};
const previewPath=f=>typeof f==="string"&&( /^\.\/assets\/venue-review\/[a-z0-9-]+\.webp$/.test(f) || /^\.\/images\/[a-z0-9]+\.webp$/.test(f) || /^data:image\/webp;base64,[A-Za-z0-9+/=]{100,16000}$/.test(f));
function select(event,registries={}){
 const specificRights=registries.imageRights?.assets||[];
 const verifiedPoster=specificRights.find(a=>a.eventId===event.id&&a.rightsStatus==="approved"&&a.rightsEvidenceUrl&&a.license&&/^\.\/images\/[\w.-]+\.webp$/.test(a.file));
 if(verifiedPoster)return {file:verifiedPoster.file,kind:"event",label:"Imagem do evento",credit:verifiedPoster.attribution||"",sourceUrl:verifiedPoster.rightsEvidenceUrl,license:verifiedPoster.license};
 const venueKey=norm(event.venue),id=event.id;
 if(registries.reviewOnly===true&&registries.reviewMedia?.scope==="private-preview"){
  const items=registries.reviewMedia;
  const candidate=id?(items.events||[]).find(a=>a.eventId===id&&a.sourceEventUrl===event.source):
    (items.venues||[]).find(a=>norm(a.venue)===venueKey);
  if(candidate&&previewPath(candidate.file)&&candidate.rightsStatus==="pending"){
   const isEvent=!!candidate.eventId;
   return {file:candidate.file,kind:isEvent?"event-review":"venue-review",label:isEvent?"Imagem associada ao evento · revisão privada":"Identidade visual da casa · revisão privada",credit:candidate.credit||"",sourceUrl:candidate.sourceUrl||"",rightsStatus:"pending",isLogo:candidate.type==="logo"};
  }
 }
 return empty;
}
const api={select,normalizeVenue:norm};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
if(root)root.PartiuMedia=api;
})(typeof window!=="undefined"?window:null);
