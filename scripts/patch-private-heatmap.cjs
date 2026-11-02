// Apply only to the existing Editorial Noturno v01 bundle, preserving its layout.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const file=process.argv[2];if(!file)throw Error('Usage: node patch-private-heatmap.cjs <preview.html> [--check]');
const root=path.resolve(__dirname,'..'),old=fs.readFileSync(file,'utf8');
if(old.includes('id="partiu-audience-v1"'))throw Error('Already patched; restore the recorded backup before reapplying a new revision');
let html=old;
function replace(before,after){if(html.split(before).length!==2)throw Error('Preview changed; unique anchor missing: '+before.slice(0,100));html=html.replace(before,after)}
replace('_t.push([...rt.coords,Math.min(1,.3+rt.events.length*.15)]);','const audience=window.PartiuAudience.aggregate(rt.events,window.PartiuCapacityRegistry);const audienceSize=window.PartiuAudience.haloDiameter(audience.people);const audienceTone=audience.people>3000?"pf-event-halo--hot":audience.people>1000?"pf-event-halo--warm":audience.people>0?"pf-event-halo--weighted":"";if(audience.people>0)_t.push([...rt.coords,window.PartiuAudience.visualWeight(audience.people)]);Ka.marker(rt.coords,{icon:Ka.divIcon({className:"pf-event-halo "+audienceTone,iconSize:[audienceSize,audienceSize],iconAnchor:[audienceSize/2,audienceSize/2]}),interactive:false,keyboard:false,zIndexOffset:-1000}).addTo(dt);');
replace('radius:34,blur:24,maxZoom:13,max:1,minOpacity:.35','radius:10,blur:7,maxZoom:0,max:10000,minOpacity:.12');
replace('for(const Xt of rt.events){const ne=document.createElement("button");','for(const Xt of rt.events){const info=document.createElement("p");info.textContent=window.PartiuAudience.describe(Xt,window.PartiuCapacityRegistry);Ut.append(info);const ref=window.PartiuAudience.resolve(Xt,window.PartiuCapacityRegistry);if(ref.sourceUrl){const source=document.createElement("a");source.href=ref.sourceUrl;source.target="_blank";source.rel="noopener noreferrer";source.textContent="Fonte da referência · "+ref.reviewedAt;Ut.append(source)}const ne=document.createElement("button");');
replace('const N=I0[b.region];return N?', 'const place=window.PartiuVenueDirectory.venues.find(v=>v.name===b.venue);const region=place?.locationEvidence?.length?place.region:b.region;const N=I0[region];return N?');
replace('id:"region:"+b.region,coords:N,label:b.region','id:"region:"+region,coords:N,label:region');
replace('children:"Menos eventos"','children:"Menor potencial de público"');
replace('children:"Mais eventos"','children:"Maior · 10 mil+"');
const caveat=html.match(/children:"O calor representa eventos cadastrados,[^"]*"/);
if(!caveat)throw Error('Missing caveat');
replace(caveat[0],'children:"Calor por potencial de público: manchas menores para públicos menores, maiores para públicos maiores, sempre concentradas no entorno do ponto. Não representa alcance real, presença medida nem garantia de lotação. Halo âmbar indica apenas evento com público desconhecido ou zero. Pontos aproximados; eventos a partir das 18h."');
replace('gt.unmapped>0&&','`${gt.night.filter(event=>window.PartiuAudience.resolve(event,window.PartiuCapacityRegistry).people===null).length} evento(s) sem referência de público. `,gt.unmapped>0&&');
replace('_t.length>1?it.fitBounds','gt.groups.length>1?it.fitBounds');
replace('it.setView(_t.length?gt.groups[0].coords:[-27.59,-48.52],_t.length?12:11)','it.setView(gt.groups.length?gt.groups[0].coords:[-27.59,-48.52],gt.groups.length?12:11)');
const moduleText=fs.readFileSync(path.join(root,'scripts/audience-heat.js'),'utf8');
const registry=JSON.parse(fs.readFileSync(path.join(root,'data/venue-capacities.json'),'utf8'));
const venueDirectory=JSON.parse(fs.readFileSync(path.join(root,'data/venues.json'),'utf8'));
const inline=moduleText+'\nwindow.PartiuCapacityRegistry='+JSON.stringify(registry).replace(/</g,'\\u003c')+';window.PartiuVenueDirectory='+JSON.stringify(venueDirectory).replace(/</g,'\\u003c')+';';
replace('</style></head>','.pf-event-halo{border:0!important;border-radius:50%;pointer-events:none!important;background:radial-gradient(circle,rgba(255,191,91,.65) 0%,rgba(250,163,58,.38) 25%,rgba(247,157,64,.14) 50%,rgba(249,174,79,0) 79%);filter:blur(.35px)}.pf-event-halo--weighted{background:radial-gradient(circle,rgba(29,211,174,.78) 0%,rgba(29,211,174,.37) 25%,rgba(29,211,174,.12) 53%,rgba(29,211,174,0) 79%)}.pf-event-halo--warm{background:radial-gradient(circle,rgba(239,204,92,.85) 0%,rgba(239,204,92,.4) 25%,rgba(239,204,92,.12) 53%,rgba(239,204,92,0) 79%)}.pf-event-halo--hot{background:radial-gradient(circle,rgba(238,115,74,.86) 0%,rgba(238,115,74,.42) 25%,rgba(238,115,74,.14) 53%,rgba(238,115,74,0) 79%)}\n</style></head>');
replace('<script type="module">','<script id="partiu-audience-v1">'+inline+'</script><script type="module">');
for(const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
if(!process.argv.includes('--check')){const backup=file+'.before-audience-v1';if(fs.existsSync(backup))throw Error('Backup already exists');fs.copyFileSync(file,backup);fs.writeFileSync(file,html,'utf8');if(fs.readFileSync(file,'utf8')!==html)throw Error('Readback mismatch');}
console.log(JSON.stringify({valid:true,checkOnly:process.argv.includes('--check'),bytes:Buffer.byteLength(html),file}));
