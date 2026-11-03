/* PartiuFloripa — progressive-enhancement native dialog for events and venues.
   Card hrefs remain crawlable/copyable; modified clicks retain browser navigation. */
(function(){
"use strict";
const dialog=document.getElementById("detail-dialog"),content=document.getElementById("detail-content");
if(!dialog||!content)return;
let activeEvent=null;
const media=event=>PartiuMedia.select(event,mediaContext());
const validExternal=url=>typeof url==="string"&&/^https:\/\//.test(url);
const originLink=(url,label)=>validExternal(url)?'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>':"";
function picture(visual){
 if(!visual.file)return "";
 const caption=visual.kind==="event-review"?(visual.isShowArchive?"Foto do espetáculo · arquivo, não desta sessão":"Imagem do evento · reprodução em revisão privada"):
 visual.kind==="venue-review"?(visual.isLogo?"Logotipo da casa · revisão privada":"Imagem da casa · revisão privada"):
 visual.kind==="event"?"Imagem do evento com licença verificada":"Imagem real";
 return '<figure class="detail-media"><img data-kind="'+esc(visual.kind)+'" src="'+esc(visual.file)+'" alt="'+esc(caption)+'" loading="eager" onerror="this.hidden=true"><span>'+esc(caption)+'</span></figure>';
}
function open(contentHtml){
 content.innerHTML=contentHtml;
 if(typeof dialog.showModal==="function"){
  if(!dialog.open)dialog.showModal();
  document.getElementById("detail-close").focus();
 }else{
  // Browsers without native dialogs retain access to the direct event link.
  dialog.setAttribute("open","");
  dialog.setAttribute("role","dialog");
  document.getElementById("detail-close").focus();
 }
}
function close(){
 if(typeof dialog.close==="function"&&dialog.open)dialog.close();
 else dialog.removeAttribute("open");
}
function findPlace(name){
 const normalized=PartiuMedia.normalizeVenue(name);
 return (venueDirectory.venues||[]).find(v=>[v.name,...(v.aliases||[])].some(n=>PartiuMedia.normalizeVenue(n)===normalized));
}
function eventDetails(e){
 if(!e||e.sourceReview==="quarantined")return;
 activeEvent=e;
 const visual=media(e);
 const day=dateFmt.format(new Date(e.date+"T12:00:00Z"));
 const when='<p><strong>'+esc(day)+'</strong> · '+esc(e.time||"Consultar horário na fonte")+'</p>'+
  (e.showTime?'<p>Início da atração: <strong>'+esc(e.showTime)+'</strong></p>':"");
 const status=e.status==="verified"?"Informação marcada como verificada"+(e.lastVerifiedAt?" em "+esc(e.lastVerifiedAt):""):"Registro experimental, ainda não homologado editorialmente";
 const warnings=!e.time?'<p class="detail-warning">Consulte o horário atualizado diretamente no organizador.</p>':"";
 const venue=findPlace(e.venue);
 const venueLink=venue?'<button type="button" data-dialog-place="'+esc(venue.id)+'">Conhecer a casa ↗</button>':"";
 const calendar=PartiuEventUX.validTime(e.time)&&e.date>=today?'<button type="button" data-detail-action="calendar">Adicionar ao calendário</button>':"";
 const source=e.sourceReview==="quarantined"?"":validExternal(e.source)?'<a class="detail-primary" href="'+esc(e.source)+'" target="_blank" rel="noopener noreferrer">Conferir na fonte oficial ↗</a>':"";
 const canonical=eventUrl(e);
 open('<article class="detail-sheet">'+picture(visual)+
  '<div class="detail-kicker">'+esc(e.category||"Evento")+' · PartiuFloripa</div><h2 id="detail-title">'+esc(e.title)+'</h2>'+
  '<section class="detail-panel"><h3>Quando e onde</h3>'+when+
  '<p><strong>'+esc(e.venue||"Local a confirmar")+'</strong> · '+esc(displayRegion(e)||"Florianópolis")+'</p>'+
  (e.note?'<p>'+esc(e.note)+'</p>':"")+'<p class="detail-muted">'+esc(status)+'</p>'+warnings+'</section>'+
  '<section class="detail-panel"><h3>Informações e ingressos</h3><p>Confira programação, alterações, preços e disponibilidade na fonte antes de ir.</p>'+
  '<div class="detail-actions">'+source+venueLink+calendar+
  '<button type="button" data-detail-action="share">Compartilhar</button></div>'+
  '<p class="detail-muted">O PartiuFloripa não processa pagamentos nem confirma ingressos. <a href="'+esc(canonical)+'">Link individual deste evento</a>.</p>'+
  '<p class="detail-feedback" role="status"></p></section></article>');
}
function placeDetails(venue){
 if(!venue)return;
 const opening=PartiuVenueHours.status(venue.id,hoursDirectory,selectedDate(),today);
 activeEvent=null;
 const visual=media({venue:venue.name,category:"Cultura"});
 const status=opening.status==="open"?"Costuma abrir neste dia":opening.status==="closed"?"Costuma fechar neste dia":"Fechada (classificação provisória)";
 const source=(venue.locationEvidence||[]).find(validExternal)||"";
 const links=originLink(source,"Fonte do local ↗")+originLink(opening.sourceUrl,"Fonte dos horários ↗");
 const map=venue.address?'<a href="https://www.google.com/maps/search/?api=1&amp;query='+encodeURIComponent(venue.address)+'" target="_blank" rel="noopener noreferrer">Buscar endereço no mapa ↗</a>':"";
 const names=[venue.name,...(venue.aliases||[])].map(PartiuMedia.normalizeVenue);
 const upcoming=events.filter(e=>e.date>=today&&names.includes(PartiuMedia.normalizeVenue(e.venue))).sort((a,b)=>(a.date+(a.time||"")).localeCompare(b.date+(b.time||""))).slice(0,6);
 const eventsHtml=upcoming.length?'<ul class="detail-list">'+upcoming.map(e=>
  '<li><button type="button" data-dialog-event="'+esc(e.id)+'">'+esc(e.date.split("-").reverse().join("/"))+' · '+esc(e.title)+'</button></li>').join("")+'</ul>':
  '<p class="detail-muted">Nenhuma atração futura cadastrada neste catálogo parcial. Confira a programação da casa.</p>';
 open('<article class="detail-sheet">'+picture(visual)+
  '<div class="detail-kicker">Lugar · '+esc(venue.region||"Florianópolis")+'</div><h2 id="detail-title">'+esc(venue.name)+'</h2>'+
  '<section class="detail-panel"><h3>Sobre o local</h3><p>'+esc(venue.address||"Endereço de entrada não registrado")+'</p>'+
  '<p class="detail-muted">Dados do local consultados em '+esc(venue.reviewedAt||"data não informada")+'. A localização pode ser aproximada; o ponto exato de entrada não é presumido.</p></section>'+
  '<section class="detail-panel"><h3>Funcionamento habitual</h3><p><strong>'+esc(status)+'</strong></p>'+
  (opening.hoursText?'<p>'+esc(opening.hoursText)+'</p>':"")+
  '<p class="detail-muted">Não é disponibilidade ao vivo. Casas sem grade validada aparecem provisoriamente como fechadas até investigação editorial.</p></section>'+
  '<section class="detail-panel"><h3>Eventos no portal</h3>'+eventsHtml+'</section>'+
  '<section class="detail-panel"><h3>Verificar informações</h3><div class="detail-actions">'+links+map+'</div>'+
  '<p class="detail-muted">Imagem da casa ou identidade visual, quando cadastrada. A reprodução em prévia privada não significa autorização de publicação.</p></section></article>');
}
document.getElementById("detail-close").addEventListener("click",close);
dialog.addEventListener("click",async ev=>{
 if(ev.target===dialog){close();return}
 const place=ev.target.closest("[data-dialog-place]"),item=ev.target.closest("[data-dialog-event]");
 if(place){
  const found=(venueDirectory.venues||[]).find(v=>v.id===place.dataset.dialogPlace);
  if(found)placeDetails(found);
  return;
 }
 if(item){const found=events.find(e=>e.id===item.dataset.dialogEvent);if(found)eventDetails(found);return}
 const action=ev.target.closest("[data-detail-action]");
 if(!action||!activeEvent)return;
 const e=activeEvent,feedback=dialog.querySelector(".detail-feedback");
 if(action.dataset.detailAction==="calendar"){
  const calendar=PartiuEventUX.calendarFile(e);
  if(!calendar)return;
  const url=URL.createObjectURL(new Blob([calendar],{type:"text/calendar;charset=utf-8"}));
  const a=document.createElement("a");
  a.href=url;a.download=e.slug+".ics";document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  if(feedback)feedback.textContent="Arquivo de calendário preparado; confirme os dados na fonte.";
  return;
 }
 if(action.dataset.detailAction==="share"){
  const url=new URL(eventUrl(e),document.baseURI).href;
  try{
   if(navigator.share){await navigator.share({title:e.title,url});return}
   await navigator.clipboard.writeText(url);
   if(feedback)feedback.textContent="Link do evento copiado.";
  }catch(error){if(feedback)feedback.textContent="Link do evento: "+url}
 }
});
document.addEventListener("click",ev=>{
 if(ev.defaultPrevented)return;
 const place=ev.target.closest(".place-open");
 if(place){
  const found=(venueDirectory.venues||[]).find(v=>v.id===place.dataset.placeId);
  if(found)placeDetails(found);
  return;
 }
 const anchor=ev.target.closest("a.event-card, .pf-map-popup .pf-map-event-link");
 if(!anchor||ev.button!==0||ev.ctrlKey||ev.metaKey||ev.shiftKey||ev.altKey||anchor.target==="_blank")return;
 const pathname=new URL(anchor.getAttribute("href"),document.baseURI).pathname;
 const found=events.find(e=>new URL(eventUrl(e),document.baseURI).pathname===pathname);
 if(!found)return;
 ev.preventDefault();
 eventDetails(found);
});
})();
