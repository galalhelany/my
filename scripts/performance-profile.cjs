// Local laboratory harness. Install/use Playwright outside the website runtime.
// PLAYWRIGHT_PATH=/path/to/playwright node scripts/performance-profile.cjs before /tmp/baseline
// PERF_SECONDS=180 node scripts/performance-profile.cjs after
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const label = process.argv[2] || 'after';
const baseline = process.argv[3];
const origin = process.env.PERF_ORIGIN || 'http://127.0.0.1:8847';
const output = path.resolve('docs/performance/evidence');
fs.mkdirSync(output, { recursive: true });

function instrument() {
  const stats = window.perfProbe = { bounds: 0, styles: 0, labelWrites: 0, frames: [], longTasks: [] };
  const bounds = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function () { stats.bounds++; return bounds.call(this); };
  const styles = window.getComputedStyle;
  window.getComputedStyle = function (...args) { stats.styles++; return styles.apply(this, args); };
  const descriptor = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
  Object.defineProperty(Node.prototype, 'textContent', { ...descriptor, set(value) {
    if (this.nodeType === 1 && this.hasAttribute('data-project-cursor-label')) stats.labelWrites++;
    descriptor.set.call(this, value);
  }});
  new PerformanceObserver(list => stats.longTasks.push(...list.getEntries().map(e => ({ start: e.startTime, duration: e.duration }))))
    .observe({ type: 'longtask', buffered: true });
  let last;
  function frame(now) {
    if (last) stats.frames.push(now - last);
    last = now;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light' });
  const result = { label, browser: browser.version(), viewport: '1440x1000', headless: true,
    thirdParty: 'blocked for reproducibility and per user instruction; external impact unverified', stages: [], errors: [] };
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) return route.abort();
    const source = baseline && path.join(baseline, decodeURIComponent(url.pathname));
    if (source && fs.existsSync(source) && fs.statSync(source).isFile()) return route.fulfill({ path: source });
    return route.continue();
  });
  await context.addInitScript(instrument);
  const page = await context.newPage();
  page.on('pageerror', error => result.errors.push(error.message));
  const cdp = await context.newCDPSession(page);
  await cdp.send('Performance.enable');
  async function snapshot(name) {
    await cdp.send('HeapProfiler.collectGarbage');
    const metrics = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));
    const dom = await cdp.send('Memory.getDOMCounters');
    const probe = await page.evaluate(() => {
      const s = window.perfProbe, frames = s.frames.splice(0).sort((a,b) => a-b);
      return { bounds: s.bounds, styles: s.styles, labelWrites: s.labelWrites,
        frameCount: frames.length, meanFrameMs: frames.reduce((a,b)=>a+b,0)/frames.length,
        p95FrameMs: frames[Math.floor(frames.length*.95)], worstFrameMs: frames.at(-1),
        longTasks: s.longTasks.splice(0),
        animations: document.getAnimations().filter(a => a.playState === 'running').length,
        queue: window.jQuery ? jQuery(document.documentElement).queue('fx').length : null };
    });
    result.stages.push({ name, metrics, dom, ...probe });
    console.log(name, JSON.stringify({ heap: metrics.JSHeapUsedSize, ...dom, ...probe }));
  }
  await page.goto(origin + '/index.html');
  await page.waitForFunction(() => !document.body.classList.contains('is--loading'));
  await snapshot('initial');
  // Deterministic event burst exposes work performed per event versus per paint.
  for (const [name, selector] of [['project', '[data-project-cursor-zone="live"]'], ['heading', '.section.values h2']]) {
    const target = page.locator(selector).first();
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const before = await page.evaluate(() => ({ ...perfProbe, frames: [], longTasks: [] }));
    await target.evaluate(el => {
      const r = el.getBoundingClientRect();
      for(let i=0;i<600;i++) el.dispatchEvent(new PointerEvent('pointermove', {
        bubbles: true, pointerType: 'mouse', clientX: r.left+20+i%100, clientY:r.top+40
      }));
    });
    await page.waitForTimeout(100);
    const after = await page.evaluate(() => ({ bounds: perfProbe.bounds, styles: perfProbe.styles, labelWrites: perfProbe.labelWrites }));
    result[name+'Burst'] = Object.fromEntries(Object.keys(after).map(key=>[key,after[key]-before[key]]));
  }
  await page.evaluate(() => { for (let i=0; i<20; i++) (i%2 ? scrollToIntro : scrollToWork)(); });
  await snapshot('navigation-burst');
  await page.waitForTimeout(2000);
  await snapshot('navigation-after-2s');
  await page.evaluate(() => jQuery('html, body').stop(true));
  const seconds = Number(process.env.PERF_SECONDS || 180);
  const start = Date.now();
  let cycle = 0;
  while (Date.now() - start < seconds*1000) {
    const selector = ['.section.intro', '.section.values h2', '[data-project-dual-card] figure', '.section.background .logo', '.section.contact'][cycle%5];
    await page.locator(selector).first().scrollIntoViewIfNeeded();
    const box = await page.locator(selector).first().boundingBox();
    for (let i=0;i<90;i++) {
      await page.mouse.move(Math.max(5,Math.min(1430,box.x+30+(i*17)%Math.max(40,Math.min(box.width-40,500)))), Math.max(5,Math.min(990,box.y+30+(i*7)%120)));
    }
    await page.mouse.wheel(0, cycle%2 ? -360 : 360);
    if (cycle%3===0) await page.evaluate(() => appTheme());
    cycle++;
    if (cycle%10===0) await snapshot('soak-cycle-'+cycle);
  }
  result.soakSeconds = (Date.now()-start)/1000;
  result.soakCycles = cycle;
  await snapshot('soak-end');
  result.loadedResources = await page.evaluate(() => performance.getEntriesByType('resource').map(r=>({url:r.name,duration:r.duration,transferSize:r.transferSize})));
  // Repeat full-document navigation: these are not SPA mounts.
  for (let round=0;round<2;round++) {
    for (const file of ['index-ar.html','hamdan-awards-case-study.html','hamdan-awards-case-study-ar.html','mosaic-arc-erp-case-study.html','mosaic-arc-erp-case-study-ar.html','index.html']) {
      await page.goto(origin+'/'+file);
      await page.waitForTimeout(3500);
      await snapshot('route-'+round+'-'+file);
    }
  }
  fs.writeFileSync(path.join(output,label+'.json'),JSON.stringify(result,null,2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
