'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=JSON.parse(read('docs/REGRESSION-COVERAGE.json'));
const decisions=read('docs/DECISIONS.md'),requirements=read('docs/REQUIREMENTS.md');
const workflows=['.github/workflows/pages.yml','.github/workflows/candidates.yml','.github/workflows/audit-catalogue.yml','.github/workflows/collect-approved-feed.yml'].map(read).join('\n');
assert.equal(manifest.schemaVersion,1);
const ids=(source,re)=>[...new Set([...source.matchAll(re)].map(m=>m[1]))].sort();
const fromADRs=ids(decisions,/\*\*ADR-(\d{3})\b/g),fromRF=ids(requirements,/\bRF-(\d{2})\b/g);
for(const [type,actual,entries] of [['ADR',fromADRs,manifest.adrs],['RF',fromRF,manifest.requirements]]){
 assert.deepEqual(Object.keys(entries).sort(),actual,'Coverage inventory must enumerate every approved '+type+' identifier');
 for(const [id,row] of Object.entries(entries)){
  assert(['automated','partial','manual','deferred','superseded'].includes(row.status),'Invalid coverage type: '+type+'-'+id);
  assert(typeof row.note==='string'&&row.note.length>=14,'Missing scope/limit or rationale: '+type+'-'+id);
  assert(Array.isArray(row.tests),'Missing evidence links: '+type+'-'+id);
  if(row.status==='automated')assert(row.tests.length>0,'Automated status needs a real test: '+type+'-'+id);
  for(const file of row.tests){
   assert(/^scripts\/(?:test-[a-z0-9-]+|check-site|validate-events|verify-deployed-site)\.cjs$/.test(file),'Not a test script: '+file);
   assert(fs.existsSync(path.join(root,file)),'Referenced test does not exist: '+file);
   if(row.status==='automated'){
    assert(workflows.includes('node '+file),'Claimed automated test is NOT run by CI: '+type+'-'+id+' '+file);
    const body=read(file);
    assert(body.includes('assert')||body.includes('throw Error'),'Test script has no executable guard: '+file);
   }
  }
 }
}
assert(fromADRs.includes('040'),'Provisional Vitrine approval must be recorded in decisions');
assert(manifest.destination==='preview-branch-no-public-deploy','Coverage scope must not imply public beta approval');
const counts=entry=>Object.values(entry).reduce((acc,x)=>(acc[x.status]=(acc[x.status]||0)+1,acc),{});
console.log('Decision regression inventory verified',JSON.stringify({adrs:counts(manifest.adrs),requirements:counts(manifest.requirements)}));
