(function(root){
 'use strict';
 const normalize=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
 const sourced=r=>r&&/^https:\/\/[^\s]+$/.test(r.sourceUrl||'')&&/^\d{4}-\d{2}-\d{2}$/.test(r.reviewedAt||'')&&Number.isFinite(Date.parse(r.reviewedAt))&&r.status!=='disputed';
 const positive=n=>typeof n==='number'&&Number.isFinite(n)&&n>0;
 function resolve(event,registry){
  const key=normalize(event?.venue),venue=(registry?.venues||[]).find(v=>normalize(v.name)===key||(v.aliases||[]).some(a=>normalize(a)===key));
  const base=venue?.capacity,a=event?.audience;
  const capacity=sourced(a)&&positive(a.capacity)?a.capacity:sourced(base)&&positive(base.people)?base.people:null;
  if(sourced(a)&&typeof a.expected==='number'&&Number.isFinite(a.expected)&&a.expected>=0)
   return {people:capacity===null?a.expected:Math.min(a.expected,capacity),capacity,kind:'expected',sourceUrl:a.sourceUrl,reviewedAt:a.reviewedAt,capped:capacity!==null&&a.expected>capacity};
  if(capacity!==null){const source=sourced(a)&&positive(a.capacity)?a:base;return {people:capacity,capacity,kind:'capacity',sourceUrl:source.sourceUrl,reviewedAt:source.reviewedAt};}
  return {people:null,capacity:null,kind:'unknown',sourceUrl:null,reviewedAt:null};
 }
 const minute=t=>/^([01]\d|2[0-3]):[0-5]\d$/.test(t||'')?Number(t.slice(0,2))*60+Number(t.slice(3)):null;
 function aggregate(items,registry){
  const seen=new Set(),venues=new Map();let unknown=0,known=0;
  for(const e of items){if(e.id&&seen.has(e.id))continue;if(e.id)seen.add(e.id);
   const r=resolve(e,registry);if(r.people===null){unknown++;continue}known++;
   const key=normalize(e.venue)+'|'+e.date;
   if(!venues.has(key))venues.set(key,[]);venues.get(key).push({e,r});
  }
  let people=0;
  for(const entries of venues.values()){
   let fallback=0,peak=0,current=0;const edges=[],capacities=[];
   for(const {e,r} of entries){if(r.capacity!==null)capacities.push(r.capacity);
    const start=minute(e.time);let end=minute(e.endTime);
    if(start===null||end===null||end===start){fallback=Math.max(fallback,r.people);continue}
    if(end<start)end+=1440;
    edges.push([start,r.people],[end,-r.people]);
   }
   edges.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
   for(const [,delta] of edges){current+=delta;peak=Math.max(peak,current)}
   const maximum=Math.max(fallback,peak);people+=capacities.length?Math.min(maximum,Math.max(...capacities)):maximum;
  }
  return {people:known?people:null,known,unknown};
 }
 function describe(event,registry){const r=resolve(event,registry);if(r.people===null)return 'Público desconhecido · sem referência de capacidade';
  return (r.kind==='expected'?'Público previsto: ':'Capacidade de referência: ')+new Intl.NumberFormat('pt-BR').format(r.people)+' pessoas'+(r.kind==='capacity'?' · não é previsão de lotação':'')+(r.capped?' · limitado à capacidade informada':'');
 }
 const visualWeight=people=>typeof people==='number'&&Number.isFinite(people)&&people>0?10000*(0.18+0.82*Math.sqrt(Math.min(people/10000,1))):0;
 const haloDiameter=people=>typeof people==='number'&&Number.isFinite(people)&&people>0?Math.round(28+40*Math.sqrt(Math.min(people,10000)/10000)):42;
 const api={resolve,aggregate,describe,visualWeight,haloDiameter,max:10000};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 if(root)root.PartiuAudience=api;
})(typeof window!=='undefined'?window:null);
