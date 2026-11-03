(function(root){
"use strict";
// Weekdays: 0=domingo ... 6=sábado. Indicative regular opening by calendar date, never live status.
const DAY_MS=86400000;
const validDate=s=>/^\d{4}-\d{2}-\d{2}$/.test(s||"")&&!Number.isNaN(Date.parse(s+"T12:00:00Z"))&&new Date(s+"T12:00:00Z").toISOString().slice(0,10)===s;
const weekday=s=>validDate(s)?new Date(s+"T12:00:00Z").getUTCDay():null;
const validDays=a=>Array.isArray(a)&&a.every(v=>Number.isInteger(v)&&v>=0&&v<=6)&&new Set(a).size===a.length;
function status(venueId,registry,date,today){
 const unknown={status:"unknown",hoursText:"",sourceUrl:"",reviewedAt:""};
 if(!validDate(date)||!validDate(today))return unknown;
 const data=(registry?.venues||[]).find(v=>v.id===venueId);
 if(!data||!validDate(data.reviewedAt)||!/^https:\/\//.test(data.sourceUrl||"")||!validDays(data.openDays)||!validDays(data.closedDays))return unknown;
 if(data.openDays.some(d=>data.closedDays.includes(d)))return unknown;
 const age=(Date.parse(today+"T12:00:00Z")-Date.parse(data.reviewedAt+"T12:00:00Z"))/DAY_MS;
 if(age>90||age<0)return unknown;
 const day=weekday(date),value=data.openDays.includes(day)?"open":data.closedDays.includes(day)?"closed":"unknown";
 return {status:value,hoursText:data.hoursText||"",sourceUrl:data.sourceUrl,reviewedAt:data.reviewedAt};
}
const api={validDate,weekday,validDays,status};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
if(root)root.PartiuVenueHours=api;
})(typeof window!=="undefined"?window:null);
