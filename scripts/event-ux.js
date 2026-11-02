(function(root){
"use strict";
const validDate=s=>/^\d{4}-\d{2}-\d{2}$/.test(s||"")&&!Number.isNaN(Date.parse(s+"T12:00:00Z"))&&new Date(s+"T12:00:00Z").toISOString().slice(0,10)===s;
const validTime=s=>/^([01]\d|2[0-3]):[0-5]\d$/.test(s||"");
const shiftDate=(date,days)=>{const d=new Date(date+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10)};
const todayFloripa=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Sao_Paulo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
function weekendDates(today){
 const n=new Date(today+"T12:00:00Z").getUTCDay();
 const first=n===0?today:shiftDate(today,n===6?0:6-n);
 return n===0?[today]:[first,shiftDate(first,1)];
}
function matchesDate(event,mode,today){
 if(!mode)return true;
 if(mode==="today")return event.date===today;
 if(mode==="tomorrow")return event.date===shiftDate(today,1);
 if(mode==="weekend")return weekendDates(today).includes(event.date);
 return true;
}
function months(events){return [...new Set(events.filter(e=>validDate(e.date)).map(e=>e.date.slice(0,7)))].sort()}
function initialMonth(events,today){
 const available=months(events),current=today.slice(0,7);
 return available.includes(current)?current:available.find(m=>m>current)||available.at(-1)||current;
}
const icsEscape=s=>String(s??"").replace(/\\/g,"\\\\").replace(/\r?\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;");
function calendarFile(event,now=new Date()){
 if(!validDate(event.date)||!validTime(event.time)||!/^evt-[a-f0-9]{12}$/.test(event.id||""))return null;
 const stamp=now.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");
 const start=event.date.replace(/-/g,"")+"T"+event.time.replace(":","")+"00";
 const description="Dados fornecidos pelo organizador; confirme antes de sair."+(event.source?" Fonte: "+event.source:"");
 const lines=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//PartiuFloripa//Agenda de eventos//PT-BR","CALSCALE:GREGORIAN","BEGIN:VEVENT",
  "UID:"+event.id+"@partiufloripa","DTSTAMP:"+stamp,"DTSTART;TZID=America/Sao_Paulo:"+start,
  "SUMMARY:"+icsEscape(event.title),"LOCATION:"+icsEscape([event.venue,event.region,"Florianópolis"].filter(Boolean).join(", ")),
  "DESCRIPTION:"+icsEscape(description),"END:VEVENT","END:VCALENDAR"];
 return lines.join("\r\n")+"\r\n";
}
const api={validDate,validTime,shiftDate,todayFloripa,weekendDates,matchesDate,months,initialMonth,calendarFile};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
if(root)root.PartiuEventUX=api;
})(typeof window!=="undefined"?window:null);
