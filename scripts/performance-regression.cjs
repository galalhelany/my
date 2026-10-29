const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const zlib = require('node:zlib');
const origin = process.env.PERF_ORIGIN || 'http://127.0.0.1:8847';
const out = path.resolve('docs/performance/evidence');
const baseline = process.argv[2];
const files = ['index.html','index-ar.html','hamdan-awards-case-study.html','hamdan-awards-case-study-ar.html','mosaic-arc-erp-case-study.html','mosaic-arc-erp-case-study-ar.html'];
const results = { checks: [], traces: [], errors: [] };
fs.mkdirSync(out, {recursive:true});
const pause = ms => new Promise(r=>setTimeout(r,ms));

(async()=>{
 const browser = await chromium.launch({channel:'chrome',headless:true});
 results.browser = browser.version();
 async function context(before=false, options={}) {
   const c=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light',...options});
   await c.route('**/*',r=>{
     const u=new URL(r.request().url());
     if(u.origin!==origin)return r.abort();
     const f=before && baseline && path.join(baseline,decodeURIComponent(u.pathname));
     return f && fs.existsSync(f) && fs.statSync(f).isFile()?r.fulfill({path:f}):r.continue();
   });
   return c;
 }
 async function ready(p,file){
   await p.goto(origin+'/'+file);await p.evaluate(()=>document.fonts.ready);
   if(file.startsWith('index'))await p.waitForFunction(()=>!document.body.classList.contains('is--loading'));
   else await p.waitForTimeout(700);
 }
 // Interleaved, equal-input traces: no other profiling browser should run concurrently.
 if(baseline && !process.env.PERF_SKIP_TRACES)for(let repeat=0;repeat<3;repeat++)for(const before of [true,false]){
   const c=await context(before),p=await c.newPage();await ready(p,'index.html');
   const cd=await c.newCDPSession(p);await cd.send('Performance.enable');
   for(const [name,selector] of [['project','[data-project-cursor-zone="live"]'],['heading','.section.values h2:not(.homepage-section-label)']]){
     const el=p.locator(selector).first();await el.scrollIntoViewIfNeeded();await p.waitForTimeout(400);
     const box=await el.boundingBox();
     const metric=async()=>Object.fromEntries((await cd.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));
     const pre=await metric(), events=[];
     cd.on('Tracing.dataCollected',e=>events.push(...e.value));
     await cd.send('Tracing.start',{categories:'devtools.timeline,disabled-by-default-devtools.timeline',transferMode:'ReportEvents'});
     for(let i=0;i<180;i++)await p.mouse.move(box.x+25+(i*13)%Math.min(240,box.width-50),box.y+Math.min(30,box.height/2));
     const complete=new Promise(resolve=>cd.once('Tracing.tracingComplete',resolve));
     await cd.send('Tracing.end');await complete;
     cd.removeAllListeners('Tracing.dataCollected');
     const post=await metric(), sums={};
     for(const e of events)if(e.ph==='X' && ['Layout','UpdateLayoutTree','Paint','PrePaint','FunctionCall','EventDispatch'].includes(e.name)){
       const s=sums[e.name] ||= {count:0,totalMs:0};s.count++;s.totalMs+=(e.dur||0)/1000;
     }
     const id=`${before?'before':'after'}-${name}-${repeat}`;
     fs.writeFileSync(path.join(out,id+'.trace.json.gz'),zlib.gzipSync(JSON.stringify({traceEvents:events})));
     results.traces.push({id,summary:sums,delta:Object.fromEntries(['TaskDuration','ScriptDuration','LayoutDuration','RecalcStyleDuration','LayoutCount','RecalcStyleCount'].map(k=>[k,post[k]-pre[k]]))});
     console.log('TRACE',id,JSON.stringify(sums));
   }
   await c.close();
 }
 if(results.traces.length)fs.writeFileSync(path.join(out,'trace-summary.json'),JSON.stringify(results.traces,null,2));
 for(const width of [1440,375]){
   const c=await context(false,{viewport:{width,height:1000},hasTouch:width===375,isMobile:width===375});
   const p=await c.newPage();p.on('pageerror',e=>results.errors.push(e.message));
   for(const file of files){
     await ready(p,file);
     for(const theme of [0,16]){
       await p.locator('.app-aside .option.theme .slider').evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));},theme);
       await p.waitForTimeout(250);
       const state=await p.evaluate(()=>({lang:document.documentElement.lang,dir:getComputedStyle(document.body).direction,
         overflow:document.documentElement.scrollWidth>innerWidth+1,theme:document.body.className,
         canonical:document.querySelector('link[rel=canonical]')?.href,heading:document.querySelector('h1')?.textContent,
         cursors:document.querySelectorAll('.site-cursor').length}));
       assert(!state.overflow,file+' horizontal overflow');assert(state.theme.includes('theme--'+String(theme).padStart(2,'0')));
       assert.equal(state.dir,/-ar\.html$/.test(file)?'rtl':'ltr');assert(state.canonical);assert(state.heading);
       results.checks.push({file,width,theme,...state});
     }
     if(width===375){
       await p.locator('.app-header .navigation').click();await p.waitForTimeout(550);
       assert(await p.locator('body').evaluate(el=>el.classList.contains('mobile-nav--is--visible')));
       const link=p.locator('.app-nav .item:not([hidden])').last();await link.focus();
       await p.keyboard.press('Enter');await p.waitForTimeout(1000);
       assert(!(await p.locator('body').evaluate(el=>el.classList.contains('mobile-nav--is--visible'))));
       results.checks.push({file,width,mobileNavigation:'pass'});
     }
     if(file.startsWith('index')){
       await p.evaluate(()=>{for(let i=0;i<20;i++)(i%2?scrollToIntro:scrollToWork)();});
       const queue=await p.evaluate(()=>jQuery(document.documentElement).queue('fx').length);assert(queue<=1);
       await p.waitForTimeout(850);assert.equal(await p.evaluate(()=>jQuery(document.documentElement).queue('fx').length),0);
       const faq=p.locator('.faq__item summary').first();await faq.scrollIntoViewIfNeeded();await faq.click();await p.waitForTimeout(700);
       assert(await faq.evaluate(el=>el.parentElement.open));await faq.click();await p.waitForTimeout(700);
       assert(!(await faq.evaluate(el=>el.parentElement.open)));
       const option=p.locator('.section.intro .option[role="button"]').nth(1);await option.focus();await p.keyboard.press('Enter');
       assert.equal(await option.getAttribute('aria-pressed'),'true');
       if(width===1440){
         for(const [kind,selector,cls] of [['heading','.section.values h2:not(.homepage-section-label)','is-magnifier'],['logo','.section.background .logo','is-logo-magnifier']]){
           await p.locator(selector).first().hover(kind === 'heading' ? {position:{x:70,y:25}} : {});await p.waitForTimeout(350);
           assert(await p.locator('.site-cursor').evaluate((el,s)=>el.classList.contains(s),cls));
           await p.screenshot({path:path.join(out,`${file}-${kind}.png`)});
         }
         for(const zone of ['live','case']){
           const el=p.locator(`[data-project-cursor-zone="${zone}"]`).first();
           if(await el.count()){
             await el.hover();await p.waitForTimeout(350);
             assert(await el.evaluate(e=>e.closest('[data-project-dual-card]').classList.contains('is-project-cursor-visible')));
           }
         }
         const marquee=p.locator('.client-logo-marquee').first();await marquee.scrollIntoViewIfNeeded();await p.waitForTimeout(200);
         assert.equal(await marquee.locator('.client-logo-marquee__track').evaluate(el=>getComputedStyle(el).animationPlayState),'running');
         await p.evaluate(()=>scrollTo(0,document.body.scrollHeight));await p.waitForTimeout(350);
         assert.equal(await marquee.locator('.client-logo-marquee__track').evaluate(el=>getComputedStyle(el).animationPlayState),'paused');
         await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(100);
         assert(!(await p.locator('html').evaluate(el=>el.classList.contains('custom-cursor-enabled'))));
         await p.evaluate(()=>scrollToIntro());assert.equal(await p.evaluate(()=>jQuery(document.documentElement).queue('fx').length),0);
         await p.emulateMedia({reducedMotion:'no-preference'});await p.locator('.section.values h2:not(.homepage-section-label)').first().hover();await p.waitForTimeout(100);
         assert(await p.locator('.site-cursor').evaluate(el=>el.classList.contains('is-visible')));
       }
       results.checks.push({file,width,faq:'pass',audienceKeyboard:'pass',queue:'pass',cursorAndAmbient:width===1440?'pass':'native touch'});
     }else{
       for(let i=0;i<4;i++){
         await p.locator('button[data-reading-view="tldr"]').click();await p.waitForTimeout(250);
         assert.equal(await p.locator('body').getAttribute('data-reading-view'),'tldr');
         await p.locator('button[data-reading-view="details"]').click();await p.waitForTimeout(250);
         assert.equal(await p.locator('body').getAttribute('data-reading-view'),'details');
       }
       const zoom=p.locator('[data-case-carousel-zoom], [data-mosaic-audit-zoom]').first();
       await zoom.scrollIntoViewIfNeeded();await zoom.click();await p.waitForTimeout(300);
       assert.equal(await p.locator('[data-case-lightbox]').count(),1);
       await p.keyboard.press('ArrowRight');await p.keyboard.press('Escape');await p.waitForTimeout(300);
       assert.equal(await p.locator('[data-case-lightbox]').count(),0);
       assert(await zoom.evaluate(el=>el===document.activeElement));
       results.checks.push({file,width,readingViews:'pass',lightbox:'pass',focusRestore:'pass'});
     }
     console.log('PASS',file,width);
   }
   await c.close();
 }
 assert.deepEqual(results.errors,[]);
 await browser.close();
 fs.writeFileSync(path.join(out,'regression.json'),JSON.stringify(results,null,2));
})().catch(e=>{fs.writeFileSync(path.join(out,'regression-incomplete.json'),JSON.stringify({...results,failure:e.stack},null,2));console.error(e);process.exit(1)});
