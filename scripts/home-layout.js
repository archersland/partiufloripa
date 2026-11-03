(function(root){
"use strict";
// Pure event-home projection. Venue cards never enter this module.
function selectHome(events,{today,mode="",month=""}={}){
 const valid=Array.isArray(events)?events.filter(e=>e&&typeof e.date==="string"&&typeof e.id==="string"):[];
 const ordered=[...valid].sort((a,b)=>(a.date+(a.time||"")).localeCompare(b.date+(b.time||""))||a.id.localeCompare(b.id));
 const future=ordered.filter(e=>e.date>=today);
 const selected=mode?ordered:future;
 const featured=selected.find(e=>e.date===today)||selected[0]||null;
 const upcoming=(mode?selected:future.filter(e=>!month||e.date.startsWith(month))).filter(e=>!featured||e.id!==featured.id);
 const featuredIsToday=featured?.date===today;
 const title=mode==="weekend"?"Neste fim de semana":mode==="tomorrow"?"Destaque de amanhã":mode?"Destaque da data selecionada":featuredIsToday?"Destaque do dia":"Próximos eventos";
 const subtitle=mode?"Eventos que correspondem à data e aos filtros":featuredIsToday?"Hoje em Florianópolis":"Encontre seu próximo rolê na ilha";
 return {featured,upcoming,title,subtitle};
}
const api={selectHome};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
if(root)root.PartiuHomeLayout=api;
})(typeof window!=="undefined"?window:null);
