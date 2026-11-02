const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),data=JSON.parse(fs.readFileSync(path.join(root,'events.json'),'utf8'));
const template=fs.readFileSync(path.join(root,'evento.html'),'utf8');
const dest=path.join(root,'evento');
fs.rmSync(dest,{recursive:true,force:true});fs.mkdirSync(dest,{recursive:true});
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const origin='https://archersland.github.io/partiufloripa/evento/';
let count=0;const seen=new Set();
for(const e of data.events){
 if(!/^evt-[a-f0-9]{12}$/.test(e.id)||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug)||seen.has(e.slug))throw Error('invalid id/slug: '+e.title);
 seen.add(e.slug);
 const title=escape(e.title)+' | PartiuFloripa';
 const desc=escape([e.title,e.venue,e.region,e.date].filter(Boolean).join(' - ')).slice(0,170);
 let html=template.replace('<html lang="pt-BR">','<html lang="pt-BR" data-event-id="'+escape(e.id)+'">');
 html=html.replace('<head>','<head><base href="../../">');
 html=html.replace('<title>Evento — PartiuFloripa</title>','<title>'+title+'</title>');
 html=html.replace('content="Detalhes de eventos em Florianópolis no PartiuFloripa"','content="'+desc+'"');
 const canonical=origin+e.slug+'/';
 const robots=e.status==='verified'?'index,follow':'noindex,follow';
 html=html.replace('content="noindex,follow"','content="'+robots+'"');
 html=html.replace('<meta name="robots" content="'+robots+'">','<meta name="robots" content="'+robots+'"><link rel="canonical" href="'+canonical+'"><meta property="og:type" content="website"><meta property="og:title" content="'+title+'"><meta property="og:description" content="'+desc+'"><meta property="og:url" content="'+canonical+'">');
 const dir=path.join(dest,e.slug);fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,'index.html'),html);
 count++;
}
console.log('Generated '+count+' SEO event pages');
