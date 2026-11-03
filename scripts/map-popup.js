(function(root){
 "use strict";
 const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const validPhoto=file=>typeof file==="string"&&/^\.\/(?:assets\/(?:photos|covers|event-artists)\/[a-z0-9-]+\.(?:webp|svg)|images\/[\w.-]+\.webp)$/.test(file);
 function render(pos,items,selectMedia,capacityRegistry){
  if(!items?.length)return "";
  const venue=pos.venue||pos.region||"Localização aproximada";
  const precision=pos.precision==="region_centroid"?"Ponto aproximado do bairro":"Local aproximado da casa";
  const multiple=items.length>1;
  const cards=items.map(e=>{
   const visual=selectMedia(e)||{};
   const src=validPhoto(visual.file)?visual.file:null;
   const alt=visual.kind==="event-review"?"Imagem do evento em revisão privada":visual.kind==="event"?"Imagem do evento autorizada":"Imagem indisponível";
   const hint=visual.kind==="event-review"?"Revisão privada":"";
   const date=/^\d{4}-\d{2}-\d{2}$/.test(e.date||"")?e.date.slice(8,10)+"/"+e.date.slice(5,7):"Data a confirmar";
   const time=/^([01]\d|2[0-3]):[0-5]\d$/.test(e.time||"")?e.time:"A confirmar";
   const show=/^([01]\d|2[0-3]):[0-5]\d$/.test(e.showTime||"")?'<span class="pf-map-show">Show '+escape(e.showTime)+'</span>':"";
   const href=typeof e.slug==="string"&&/^[a-z0-9-]+$/.test(e.slug)?"./evento/"+encodeURIComponent(e.slug)+"/":"./index.html";
   const place=escape(e.venue||venue);
   const audience=typeof PartiuAudience!=='undefined'&&capacityRegistry?PartiuAudience.resolve(e,capacityRegistry):null;
   const audienceHtml=audience?'<p>'+escape(PartiuAudience.describe(e,capacityRegistry))+'</p>'+(audience.sourceUrl?'<a target="_blank" rel="noopener noreferrer" href="'+escape(audience.sourceUrl)+'">Fonte da referência · '+escape(audience.reviewedAt)+'</a>':''):'';
   const metadata='<div class="pf-map-meta">'+escape(date)+' · '+escape(time)+(show?' · '+show:"")+'</div>';
   const picture=src?'<img class="pf-map-photo" src="'+escape(src)+'" alt="'+escape(alt)+'" loading="eager">':'<div class="pf-map-photo pf-map-photo-empty" role="img" aria-label="Imagem real do evento pendente">Sem foto oficial</div>';
   return '<article class="pf-map-event"><div class="pf-map-photo-wrap">'+picture+
    (hint?'<span class="pf-map-image-hint">'+escape(hint)+'</span>':"")+'</div>'+
    '<div class="pf-map-event-body"><div class="pf-map-venue" title="'+escape(precision)+'" aria-label="'+place+'. '+escape(precision)+'">'+place+'</div><span class="pf-map-category">'+escape(e.category||"Evento")+'</span>'+
    '<div class="pf-map-event-title">'+escape(e.title||"Evento")+'</div>'+metadata+audienceHtml+
    '<a class="pf-map-event-link" href="'+escape(href)+'" aria-label="Ver detalhes de '+escape(e.title||"evento")+'">Ver evento <span aria-hidden="true">↗</span></a></div></article>';
  }).join("");
  return '<section class="pf-map-card '+(multiple?'pf-map-card--multi':'pf-map-card--single')+'" data-popup-id="'+escape(pos.id||'')+'" aria-label="'+items.length+' evento(s) em '+escape(venue)+'; '+escape(precision)+'">'+
   '<div class="pf-map-events'+(items.length>2?' pf-map-events-scroll':'')+'">'+cards+'</div></section>';
 }
 const api={render};
 if(typeof module!=="undefined"&&module.exports)module.exports=api;
 if(root)root.PartiuMapPopup=api;
})(typeof window!=="undefined"?window:null);

