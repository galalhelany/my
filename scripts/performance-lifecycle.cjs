const {chromium}=require(process.env.PLAYWRIGHT_PATH || 'playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const origin=process.env.PERF_ORIGIN || 'http://127.0.0.1:8847';
const out=path.resolve('docs/performance/evidence');
const baseline=process.argv[2];
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const result={visual:[],lifecycle:[],lightbox:[]};
 for(const before of baseline?[true,false]:[false]){
   const c=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light'});
   await c.route('**/*',r=>{
     const u=new URL(r.request().url());if(u.origin!==origin)return r.abort();
     const f=before && path.join(baseline,decodeURIComponent(u.pathname));
     return f && fs.existsSync(f) && fs.statSync(f).isFile()?r.fulfill({path:f}):r.continue();
   });
   const p=await c.newPage(),cd=await c.newCDPSession(p);
   for(const file of ['index.html','index-ar.html']){
     await p.goto(origin+'/'+file);await p.waitForFunction(()=>!document.body.classList.contains('is--loading'));
     for(const theme of [0,16]){
       await p.locator('.option.theme .slider').evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));},theme);
       const h=p.locator('.section.values h2:not(.homepage-section-label)').first();
       await h.evaluate(el=>el.scrollIntoView({block:'center'}));await p.waitForTimeout(250);
       const b=await h.boundingBox();
       const x=file==='index-ar.html'?b.x+b.width-70:b.x+70,y=b.y+25;
       await p.mouse.move(x,y);await p.waitForTimeout(500);
       const s=await p.locator('.site-cursor__magnifier-text').evaluate(el=>{
         const cs=getComputedStyle(el);return {text:el.textContent,font:cs.fontFamily,fontSize:cs.fontSize,lineHeight:cs.lineHeight,
           direction:cs.direction,color:cs.color,width:cs.width,transform:cs.transform};
       });
       const id=`${before?'before':'after'}-${file}-${theme}-lens`;
       await p.screenshot({path:path.join(out,id+'.png'),clip:{x:Math.max(0,x-120),y:Math.max(0,y-120),width:240,height:240}});
       result.visual.push({id,file,theme,...s});
     }
     if(!before){
       const sample=async()=>{await cd.send('HeapProfiler.collectGarbage');return cd.send('Memory.getDOMCounters');};
       const initial=await sample();
       await p.evaluate(()=>{for(let i=0;i<30;i++){dispatchEvent(new PageTransitionEvent('pagehide'));dispatchEvent(new PageTransitionEvent('pageshow'));}});
       await p.locator('.section.values h2:not(.homepage-section-label)').first().hover();await p.waitForTimeout(200);
       const final=await sample();assert.equal(final.jsEventListeners,initial.jsEventListeners);
       assert.equal(await p.locator('.site-cursor').count(),1);
       result.lifecycle.push({file,initial,final,syntheticPageLifecycleCycles:30});
       await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(100);
       assert.equal(await p.locator('.look .radius').evaluate(el=>getComputedStyle(el).animationName),'none');
       await p.emulateMedia({reducedMotion:'no-preference'});
     }
   }
   if(!before){
     // Follow the actual language links, then return to English.
     // Existing markup uses the named target "__self", opening a new window.
     const popupPromise=c.waitForEvent('page');
     await p.locator('#btn-en a').click();const languagePage=await popupPromise;
     await languagePage.waitForURL('**/index.html');
     await languagePage.waitForFunction(()=>!document.body.classList.contains('is--loading'));
     await languagePage.locator('#btn-ar a').click();await languagePage.waitForURL('**/index-ar.html');
     await languagePage.close();
     result.languageLinks='pass; existing named-window target preserved';
     await p.goto(origin+'/hamdan-awards-case-study.html');
     const zoom=p.locator('[data-case-carousel-zoom]').first();await zoom.scrollIntoViewIfNeeded();
     const lightboxCycles=Number(process.env.PERF_LIGHTBOX_CYCLES || 100);
     for(let i=0;i<lightboxCycles;i++){
       await zoom.click();
       await p.waitForFunction(()=>document.activeElement?.matches('[data-case-lightbox]'));
       await p.keyboard.press('Escape');
       await p.locator('[data-case-lightbox]').waitFor({state:'detached'});
       assert.equal(await p.locator('[data-case-lightbox]').count(),0);
       if([4,14,29,59,99].includes(i) || i===lightboxCycles-1){
         await cd.send('HeapProfiler.collectGarbage');
         result.lightbox.push({cycles:i+1,...await cd.send('Memory.getDOMCounters'),...await cd.send('Runtime.getHeapUsage')});
       }
     }
     assert.equal(result.lightbox[0].jsEventListeners,result.lightbox.at(-1).jsEventListeners);
   }
   await c.close();
 }
 if(baseline)for(const sample of result.visual.filter(v=>v.id.startsWith('after'))){
   const old=result.visual.find(v=>v.id===sample.id.replace('after','before'));
   const {id:oldId,...oldValues}=old,{id:newId,...newValues}=sample;
   assert.deepEqual(newValues,oldValues,'Magnifier typography/geometry changed');
 }
 fs.writeFileSync(path.join(out,'lifecycle.json'),JSON.stringify(result,null,2));
 await browser.close();console.log('PASS visual styles, lifecycle, reduced motion, language links and',result.lightbox.at(-1).cycles,'lightbox cycles');
})().catch(e=>{console.error(e);process.exit(1)});
