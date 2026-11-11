/* ATLAS A3 — progressive event dialog. Canonical deep links continue to work without JS. */
(function(){
"use strict";
const dialog=document.createElement("dialog");
dialog.id="atlas-event-dialog";
dialog.className="atlas-event-dialog";
dialog.setAttribute("aria-labelledby","atlas-event-title");
document.body.append(dialog);
let current=null,previousFocus=null;
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fullDate=s=>new Intl.DateTimeFormat("pt-BR",{weekday:"long",day:"2-digit",month:"long",timeZone:"UTC"}).format(new Date(s+"T12:00:00Z"));
const urlFor=e=>new URL("./evento/"+encodeURIComponent(e.slug)+"/",document.baseURI).href;
function open(e,trigger){
 if(!dialog.showModal)return false;
 const visual=PartiuMedia.select(e,{categoryPhotos,venueMedia,eventPhotos,imageRights});
 const caption=visual.kind==="artist"?"Foto de arquivo do artista; não é fotografia desta sessão":
  visual.kind==="illustrative"?"Imagem ilustrativa; não representa este evento":
  visual.kind==="cover"?"Arte ilustrativa da categoria":
  visual.kind==="event"?"Fotografia do evento com licença registrada":"Imagem de referência";
 const venue=(venueDirectory.venues||[]).find(v=>v.name.trim().toLocaleLowerCase("pt-BR")===String(e.venue||"").trim().toLocaleLowerCase("pt-BR"));
 const ics=PartiuEventUX.calendarFile(e);
 const dateTime=fullDate(e.date)+(PartiuEventUX.validTime(e.time)?" · "+e.time:" · horário a confirmar");
 const region=displayRegion(e)||"Bairro a confirmar";
 const note=String(e.note||"").trim();
 const status=e.status==="verified"?"Confira eventuais alterações na fonte.":"Registro experimental, ainda não homologado editorialmente.";
 const image=visual.file?'<div class="atlas-dialog-media"><img src="'+safe(visual.file)+'" alt="'+safe(caption)+'" loading="eager"><span>'+safe(caption)+'</span></div>':
   '<div class="atlas-dialog-media atlas-dialog-fallback" role="img" aria-label="Imagem não disponível">Imagem não disponível</div>';
 const source=/^https:\/\//.test(e.source||"")?'<a class="atlas-dialog-primary" href="'+safe(e.source)+'" target="_blank" rel="noopener noreferrer">Conferir na fonte registrada ↗</a>':"";
 dialog.innerHTML='<button class="atlas-dialog-close" type="button" aria-label="Fechar detalhes">×</button>'+image+
  '<div class="atlas-dialog-content"><p class="atlas-dialog-kicker">'+safe(e.category||"Evento")+' · PARTIUFLORIPA</p>'+
  '<h2 id="atlas-event-title">'+safe(e.title)+'</h2>'+
  '<section class="atlas-dialog-section"><h3>Quando e onde</h3><p><strong>'+safe(dateTime)+'</strong></p>'+
  '<p><strong>'+safe(e.venue||"Local a confirmar")+'</strong> · '+safe(region)+'</p>'+
  (note?'<p class="atlas-dialog-note">'+safe(note)+'</p>':"")+
  '<p class="atlas-dialog-warning">'+safe(status)+' Confira programação, horários e ingressos antes de sair.</p></section>'+
  '<section class="atlas-dialog-section"><h3>Informações e ingressos</h3><p>Valores e disponibilidade devem ser confirmados na fonte.</p>'+
  '<div class="atlas-dialog-actions">'+source+
  (venue?'<button type="button" data-atlas-action="venue">Conhecer a casa ↗</button>':"")+
  (ics?'<button type="button" data-atlas-action="calendar">Adicionar ao calendário</button>':"")+
  '<button type="button" data-atlas-action="share">Compartilhar</button></div>'+
  '<p class="atlas-dialog-feedback" role="status" aria-live="polite"></p>'+
  '<a class="atlas-dialog-permalink" href="'+safe(urlFor(e))+'">Abrir página completa do evento</a></section></div>';
 current=e;previousFocus=trigger;
 dialog.showModal();
 dialog.querySelector(".atlas-dialog-close").focus();
 return true;
}
document.addEventListener("click",event=>{
 const link=event.target.closest("a.event-card");
 if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==="_blank")return;
 const url=new URL(link.href,document.baseURI),match=url.pathname.match(/\/evento\/([^/]+)\/?$/);
 if(!match)return;
 const slug=decodeURIComponent(match[1]);
 const record=events.find(e=>e.slug===slug);
 if(record&&open(record,link))event.preventDefault();
});
dialog.addEventListener("click",async event=>{
 if(event.target===dialog){dialog.close();return}
 if(event.target.closest(".atlas-dialog-close")){dialog.close();return}
 const action=event.target.closest("[data-atlas-action]")?.dataset.atlasAction;
 if(!action||!current)return;
 const feedback=dialog.querySelector(".atlas-dialog-feedback");
 if(action==="venue"){
  const name=current.venue;
  dialog.close();
  setView("places");
  document.getElementById("search").value=name;
  renderPlaces();
  document.getElementById("places-panel").scrollIntoView({block:"start",behavior:"instant"});
 }else if(action==="calendar"){
  const ics=PartiuEventUX.calendarFile(current);
  if(!ics)return;
  const blob=new Blob([ics],{type:"text/calendar;charset=utf-8"});
  const objectUrl=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=objectUrl;a.download="partiufloripa-"+current.id+".ics";document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(objectUrl),1000);
  feedback.textContent="Arquivo de calendário gerado; confirme os dados com a fonte.";
 }else if(action==="share"){
  const link=urlFor(current);
  try{
   if(navigator.share){await navigator.share({title:current.title,url:link});feedback.textContent="Compartilhamento iniciado."}
   else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(link);feedback.textContent="Link copiado."}
   else{feedback.textContent="Use o link da página completa do evento para compartilhar."}
  }catch(err){if(err.name!=="AbortError")feedback.textContent="Não foi possível compartilhar. Use o link da página completa."}
 }
});
dialog.addEventListener("close",()=>{current=null;if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});previousFocus=null});
})();
