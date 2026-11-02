(function(root){
"use strict";
const centers={"Lagoa da Conceição":[-27.6028,-48.4685],"Centro":[-27.5969,-48.5495],"Jurerê":[-27.4366,-48.4873],"Agronômica":[-27.5787,-48.5420]};
const normalize=s=>String(s||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim();
const valid=c=>Array.isArray(c)&&c.length===2&&c.every(Number.isFinite)&&c[0]>=-28&&c[0]<=-27&&c[1]>=-49&&c[1]<=-48.2;
function resolve(event,registry){
 const key=normalize(event?.venue);
 const v=(registry?.venues||[]).find(x=>normalize(x.name)===key||(x.aliases||[]).some(a=>normalize(a)===key));
 if(v&&valid(v.coordinates)&&Array.isArray(v.locationEvidence)&&v.locationEvidence.length)
  return {lat:v.coordinates[0],lng:v.coordinates[1],region:v.region,venue:v.name,precision:v.precision||"venue_approximate",id:v.id,address:v.address||""};
 const region=v?.locationEvidence?.length?v.region:event?.region,center=centers[region];
 if(valid(center))return {lat:center[0],lng:center[1],region,venue:null,precision:"region_centroid",id:"region:"+normalize(region),address:""};
 return null;
}
const api={resolve,centers};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
if(root)root.PartiuGeo=api;
})(typeof window!=="undefined"?window:null);

