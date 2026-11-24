// Önálló füstteszt: node tests/smoke.mjs
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch (_) { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHOT_DIR = process.env.SHOT_DIR || '/tmp/claude-0/-home-user/dfd1bb18-2e33-5187-b3ec-249d234f784d/scratchpad';
fs.mkdirSync(SHOT_DIR, { recursive: true });
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.normalize(path.join(ROOT, p));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(f).pipe(res);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const URL_ = `http://127.0.0.1:${server.address().port}/index.html?debug`; // ?debug -> window.__c1k.state

const sleep = ms => new Promise(r => setTimeout(r, ms));
const profiles = [
  { name: 'telefon-fekvo', opts: { viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 } },
  { name: 'asztali', opts: { viewport: { width: 1366, height: 768 } } },
];
const results = []; // {profile, name, ok, info}
const benign = /service.?worker|sw\.js|ServiceWorker/i;

async function run(browser, prof) {
  const rec = (name, ok, info = '') => results.push({ profile: prof.name, name, ok: !!ok, info: String(info) });
  const step = async (name, fn) => { try { const r = await fn(); if (r !== undefined) rec(name, r.ok, r.info); } catch (e) { rec(name, false, 'kivétel: ' + e.message.split('\n')[0]); } };
  const ctx = await browser.newContext({ ...prof.opts, serviceWorkers: 'block' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error' && !benign.test(m.text())) errors.push('console: ' + m.text()); });
  page.on('pageerror', e => { if (!benign.test(e.message)) errors.push('pageerror: ' + e.message); });
  const shot = n => page.screenshot({ path: path.join(SHOT_DIR, `test_${prof.name}_${n}.png`) }).catch(() => {});
  const S = f => page.evaluate(f);
  const touch = prof.opts.hasTouch;

  await step('oldal betöltés + főmenü látható', async () => {
    await page.goto(URL_, { waitUntil: 'load' });
    await page.waitForSelector('#btn-start', { state: 'visible', timeout: 10000 });
    await shot('1_menu');
    return { ok: true };
  });
  await step('játék indítása (#btn-start)', async () => {
    await page.click('#btn-start');
    await page.waitForFunction(() => window.__c1k && window.__c1k.state.running, null, { timeout: 8000 });
    return { ok: true };
  });
  await step('hullám + szörnyek megjelennek', async () => {
    await page.waitForFunction(() => window.__c1k.state.enemies.length > 0, null, { timeout: 20000 });
    const n = await S(() => `${window.__c1k.state.enemies.length} szörny, hullám ${window.__c1k.state.wave}`);
    await shot('2_wave');
    return { ok: true, info: n };
  });

  await step('felső HUD gombok: >=40x40, nem fednek át, képernyőn belül', async () => {
    const r = await page.evaluate(() => {
      const vw = innerWidth, vh = innerHeight;
      const bs = [...document.querySelectorAll('#hud-top button')].filter(b => { const c = getComputedStyle(b); const r = b.getBoundingClientRect(); return c.display !== 'none' && c.visibility !== 'hidden' && r.width > 0 && r.height > 0; })
        .map(b => { const r = b.getBoundingClientRect(); return { id: b.id, x: r.left, y: r.top, w: r.width, h: r.height }; });
      const probs = [];
      for (const b of bs) {
        if (b.w < 39.5 || b.h < 39.5) probs.push(`${b.id} ${b.w.toFixed(0)}x${b.h.toFixed(0)}`);
        if (b.x < -0.5 || b.y < -0.5 || b.x + b.w > vw + 0.5 || b.y + b.h > vh + 0.5) probs.push(`${b.id} képernyőn kívül`);
      }
      for (let i = 0; i < bs.length; i++) for (let j = i + 1; j < bs.length; j++) {
        const a = bs[i], c = bs[j];
        if (a.x < c.x + c.w - 0.5 && c.x < a.x + a.w - 0.5 && a.y < c.y + c.h - 0.5 && c.y < a.y + a.h - 0.5) probs.push(`${a.id} átfed ${c.id}`);
      }
      return { n: bs.length, probs };
    });
    return { ok: r.n > 0 && r.probs.length === 0, info: `${r.n} gomb` + (r.probs.length ? '; ' + r.probs.join(', ') : '') };
  });

  await step('tüzelés: ölés/kredit/pontszám nő vagy szörny HP csökken', async () => {
    const before = await S(() => { const s = window.__c1k.state; return { k: s.kills, c: s.totalEarned, sc: s.score, hp: s.enemies.reduce((a, e) => a + e.hp, 0), proj: 0 }; });
    let maxProj = 0;
    if (touch) { // jobb oldali érintés = tűz; a gombot is nyomva tartjuk
      const vp = prof.opts.viewport;
      await page.evaluate(() => document.getElementById('btn-fire').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 7, pointerType: 'touch' })));
    }
    await page.keyboard.down('Space');
    let ok = false, after;
    for (let i = 0; i < 40 && !ok; i++) {
      await sleep(500);
      after = await S(() => { const s = window.__c1k.state; return { k: s.kills, c: s.totalEarned, sc: s.score, hp: s.enemies.reduce((a, e) => a + e.hp, 0), n: s.enemies.length, proj: s.projectiles.length }; });
      maxProj = Math.max(maxProj, after.proj);
      ok = after.k > before.k || after.c > before.c || after.sc > before.sc || after.hp < before.hp - 0.01 && after.n >= 0 && (after.k > before.k || after.hp < before.hp);
    }
    await shot('3_fire');
    await page.keyboard.up('Space');
    if (touch) await page.evaluate(() => document.getElementById('btn-fire').dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 7, pointerType: 'touch' })));
    return { ok, info: `ölés ${before.k}->${after.k}, pont ${before.sc}->${after.sc}, kredit(összes) ${before.c}->${after.c}, lövedék max ${maxProj}` };
  });

  await step('bolt megnyitás/zárás (#btn-open-shop / #btn-back-game)', async () => {
    await page.click('#btn-open-shop');
    await page.waitForSelector('#menu-modal.active', { timeout: 3000 });
    const paused = await S(() => window.__c1k.state.paused);
    await shot('4_shop');
    await page.click('#btn-back-game');
    await page.waitForFunction(() => !document.getElementById('menu-modal').classList.contains('active') && !window.__c1k.state.paused, null, { timeout: 3000 });
    // ESC is
    await page.keyboard.press('Escape'); await page.waitForSelector('#menu-modal.active', { timeout: 3000 });
    await page.keyboard.press('Escape'); await page.waitForFunction(() => !document.getElementById('menu-modal').classList.contains('active'), null, { timeout: 3000 });
    return { ok: paused, info: paused ? 'játék szünetel a boltban' : 'a bolt nem állította meg a játékot' };
  });

  await step('szünet / folytatás (#btn-pause / #btn-resume)', async () => {
    await page.click('#btn-pause');
    await page.waitForSelector('#btn-resume', { state: 'visible', timeout: 3000 });
    const p1 = await S(() => window.__c1k.state.paused);
    const pos = () => S(() => window.__c1k.state.enemies.map(e => e.x.toFixed(2)).join(','));
    const t0 = await pos(); await sleep(800);
    const t1 = await pos();
    await shot('5_pause');
    await page.click('#btn-resume');
    await page.waitForFunction(() => !window.__c1k.state.paused, null, { timeout: 3000 });
    await page.keyboard.press('KeyP'); await page.waitForFunction(() => window.__c1k.state.paused, null, { timeout: 3000 });
    await page.keyboard.press('KeyP'); await page.waitForFunction(() => !window.__c1k.state.paused, null, { timeout: 3000 });
    return { ok: p1 && t1 === t0, info: t1 === t0 ? 'szörnyek állnak szünetben' : 'szörnyek mozognak szünet alatt' };
  });

  await step('hibakereső (F3) + stresszteszt + FPS', async () => {
    await page.keyboard.press('F3');
    await page.waitForSelector('#diag-box.show', { timeout: 3000 });
    const n0 = await S(() => window.__c1k.state.enemies.length);
    await page.click('#dg-stress');
    await sleep(500);
    const n1 = await S(() => window.__c1k.state.enemies.length);
    const fps = [];
    for (let i = 0; i < 6; i++) { await sleep(700); const t = await page.textContent('#fps-meter'); const m = /(\d+)\s*FPS/.exec(t); if (m) fps.push(+m[1]); }
    await shot('6_stress');
    const avg = fps.length ? Math.round(fps.reduce((a, b) => a + b, 0) / fps.length) : 0;
    const min = fps.length ? Math.min(...fps) : 0;
    rec('stresszteszt: szörnyek száma nő', n1 > n0, `${n0}->${n1}`);
    rec('FPS stressz alatt >= 10 (headless, szoftveres)', avg >= 10, `átlag ${avg}, min ${min} (minták: ${fps.join(',')})`);
    const log = await page.evaluate(() => [...document.querySelectorAll('#dg-log .dg-row b')].map(b => b.textContent.trim()));
    const bad = log.filter(c => /^E[1-6]\d\d$/.test(c));
    rec('nincs E100-E600 hibakód a naplóban', bad.length === 0, bad.length ? bad.join(',') : 'napló tiszta' + (log.length ? ` (${log.join(',')})` : ''));
  });

  rec('nincs konzol/oldal hiba', errors.length === 0, errors.slice(0, 3).join(' | ').slice(0, 300));
  await ctx.close();
}

const browser = await chromium.launch();
for (const p of profiles) await run(browser, p);
await browser.close();
server.close();

const w = Math.max(...results.map(r => r.name.length));
let fail = 0;
console.log('\nPROFIL           | EREDMÉNY | TESZT'.padEnd(20));
for (const r of results) {
  if (!r.ok) fail++;
  console.log(`${r.profile.padEnd(15)} | ${r.ok ? 'PASS    ' : 'FAIL    '} | ${r.name.padEnd(w)} | ${r.info}`);
}
console.log(`\nKépek: ${SHOT_DIR}/test_*.png`);
console.log(fail ? `ÖSSZESÍTÉS: FAIL (${fail} hiba)` : 'ÖSSZESÍTÉS: PASS');
process.exit(fail ? 1 : 0);
