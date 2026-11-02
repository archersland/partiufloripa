'use strict';
const fs=require('node:fs');
const path=require('node:path');
const ux=require('./event-ux.js');
const root=path.resolve(__dirname,'..');
const raw=JSON.parse(fs.readFileSync(path.join(root,'events.json'),'utf8'));
if(!Array.isArray(raw.events))throw Error('events.json must have an events array');
const beta=process.argv.includes('--beta');
const errors=[],warnings=[],seen=new Set();
let quarantined=0,unverified=0,missingTimes=0;
for(const [i,e] of raw.events.entries()){
 const ref='events['+i+']';
 for(const k of ['date','title','venue','category','source','region'])
  if(typeof e[k]!=='string'||!e[k].trim())errors.push(ref+': missing '+k);
 if(!ux.validDate(e.date))errors.push(ref+': invalid date');
 if(e.time&&!ux.validTime(e.time))errors.push(ref+': invalid time');
 try{const u=new URL(e.source);if(u.protocol!=='https:')throw Error();}catch{errors.push(ref+': invalid HTTPS source URL')}
 if(e.image){
  if(!/^\.\/images\/[a-zA-Z0-9_.-]+\.webp$/.test(e.image)||!fs.existsSync(path.resolve(root,e.image)))
   errors.push(ref+': missing or unsafe local image path');
 }
 const key=[e.date,e.time,e.title,e.venue].map(x=>String(x||'').toLowerCase().trim()).join('|');
 if(seen.has(key))warnings.push(ref+': possible duplicate '+key);
 seen.add(key);
 if(e.region==='Florianópolis')warnings.push(ref+': generic region, cannot map precisely');
 const isQuarantined=e.sourceReview==='quarantined';
 if(isQuarantined){quarantined++;continue}
 if(e.status!=='verified')unverified++;
 if(!e.time){
  missingTimes++;
  warnings.push(ref+': missing time; show as unconfirmed in experimental catalog');
 }
 if(e.status==='verified'&&!e.lastVerifiedAt)errors.push(ref+': verified status needs lastVerifiedAt');
 // Strict beta gate is intentionally separate from the currently public experimental demo.
 if(beta){
  if(e.status!=='verified'||!e.lastVerifiedAt)errors.push(ref+': beta requires individually verified record');
  if(!e.time){
   const review=e.editorialException;
   if(!(review?.approved===true&&review.reviewedAt&&review.reason&&review.sourceEvidenceUrl))
    errors.push(ref+': beta exception for missing time requires individual review/evidence');
  }
 }
}
console.log('Mode: '+(beta?'BETA (strict)':'EXPERIMENTAL (structural)')+
 '; events '+raw.events.length+'; quarantined '+quarantined+'; unverified visible '+unverified+
 '; missing time visible '+missingTimes+'; errors '+errors.length+'; warnings '+warnings.length);
for(const x of errors)console.error('ERROR',x);
for(const x of warnings)console.warn('WARN',x);
if(errors.length)process.exitCode=1;
