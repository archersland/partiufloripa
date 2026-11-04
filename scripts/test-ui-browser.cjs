// Browser-level smoke test: catches valid-looking CSS that does not actually render.
// Runs only in CI against a real headless Chrome, with all assets served locally.
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),http=require("node:http");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",
 ".json":"application/json; charset=utf-8",".css":"text/css; charset=utf-8",
 ".svg":"image/svg+xml",".webp":"image/webp",".png":"image/png",".ico":"image/x-icon"};
const server=http.createServer((req,res)=>{
 let url;
 try{url=new URL(req.url,"http://localhost");}catch{res.writeHead(400).end();return}
 let file;
 try{file=path.resolve(root,"."+decodeURIComponent(url.pathname));}
 catch{res.writeHead(400).end();return}
 if(file===root)file=path.join(root,"index.html");
 if(!(file===root||file.startsWith(root+path.sep))){res.writeHead(403).end();return}
 fs.readFile(file,(error,data)=>{
  if(error){res.writeHead(404).end();return}
  res.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream","Cache-Control":"no-store"});
  res.end(data);
 });
});
async function run(){
 await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
 const port=server.address().port;
 let browser;
 try{
  browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
  for(const width of [390,1280]){
   const page=await browser.newPage({viewport:{width,height:850},reducedMotion:"reduce"});
   await page.goto("http://127.0.0.1:"+port+"/",{waitUntil:"domcontentloaded"});
   const mast=await page.locator(".mast").evaluate(el=>({
    image:getComputedStyle(el).backgroundImage,height:el.getBoundingClientRect().height
   }));
   assert(mast.image.includes("data:image/webp;base64,"),"Hero background not rendered at "+width);
   assert(mast.height>100,"Hero missing at "+width);
   await page.locator("#tab-places").click();
   await page.locator(".place-card").first().waitFor({timeout:12000});
   assert.equal(await page.locator(".place-card").count(),39,"Venue cards missing at "+width);
   assert.equal(await page.locator(".place-art-image img").count(),14,"Licensed venue illustrations not rendered at "+width);
   assert.equal(await page.locator(".place-art-initials").count(),25,"Unlicensed venues need neutral profile art at "+width);
   await page.waitForFunction(()=>Array.from(document.querySelectorAll(".place-art-image img")).some(img=>img.complete&&img.naturalWidth>0),{timeout:12000});
   const imgs=await page.locator(".place-art-image img").evaluateAll(items=>items.map(img=>({src:img.getAttribute("src"),loaded:img.complete&&img.naturalWidth>0})));
   assert(imgs.every(img=>img.loaded),"Broken venue thumbnail at "+width+": "+JSON.stringify(imgs.filter(img=>!img.loaded)));
   assert.equal(await page.locator(".place-art-caption").count(),14,"Illustration disclosures missing at "+width);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
   assert(!overflow,"Horizontal overflow at "+width);
   await page.close();
  }
  console.log("Browser visual asset smoke passed at 390px and 1280px: hero, 14 venue photos, 25 neutral fallbacks, rights disclosure");
 }finally{
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
 }
}
run().catch(err=>{console.error(err);process.exitCode=1});
