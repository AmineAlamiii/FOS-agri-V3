#!/usr/bin/env node
/**
 * Compare l'ancien site statique et la version React, page par page.
 *
 * Pour chaque page × langue × écran, ouvre les deux versions dans Chrome
 * (headless, via le protocole DevTools — aucune dépendance), puis compare :
 *   1. le DOM normalisé (balises, attributs, textes) ;
 *   2. une capture d'écran de la zone visible.
 *
 * Usage :
 *   node scripts/migration/compare-legacy.mjs --legacy http://localhost:8091 \
 *     --react http://localhost:5173 --out /tmp/compare contact.html [autres pages…]
 * Options : --langs fr,ar,zgh  --viewports desktop,mobile  --wait 2500
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return fallback;
  const [value] = args.splice(index, 2).slice(1);
  return value;
};
const legacyOrigin = opt('legacy', 'http://localhost:8091');
const reactOrigin = opt('react', 'http://localhost:5173');
const outDir = opt('out', join(tmpdir(), 'fos-compare'));
const langs = opt('langs', 'fr,ar,zgh').split(',');
const viewports = opt('viewports', 'desktop,mobile').split(',');
const wait = Number(opt('wait', '2500'));
const scroll = opt('scroll', 'top');
// --switch : charger en FR puis cliquer sur le bouton de langue (changement en direct).
const liveSwitch = args.includes('--switch') ? (args.splice(args.indexOf('--switch'), 1), true) : false;
const probe = opt('probe', '');
const pages = args.length ? args : ['contact.html'];
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SIZES = { desktop: [1440, 900, false], mobile: [390, 844, true] };

mkdirSync(outDir, { recursive: true });

/* ---------- DOM normalisé (exécuté dans la page) ---------- */
const NORMALIZE = `(() => {
  const SKIP = new Set(['SCRIPT', 'NOSCRIPT', 'STYLE', 'LINK', 'META', 'TEMPLATE']);
  const IGNORED_ATTRS = new Set(['data-vite-dev-id']);
  // Marqueurs de traduction de l'ancien site (sans effet visuel).
  // Les attributs data-* servaient de « crochets » au JavaScript de l'ancien site.
  // On ne garde que ceux utilisés par le CSS (donc visibles).
  const CSS_DATA_ATTRS = new Set(['data-header-search', 'data-service', 'data-scroll-reveal', 'data-region', 'data-state', 'data-reveal-style', 'data-page', 'data-lang']);
  const isIgnoredAttr = (el, name, value) => IGNORED_ATTRS.has(name)
    || (name.startsWith('data-') && !CSS_DATA_ATTRS.has(name))
    || (name === 'value' && el.tagName === 'INPUT');
  const BLOCKISH = (el) => {
    if (!el || el.nodeType !== 1) return true;
    const d = getComputedStyle(el).display;
    return !(d === 'inline' || d === 'inline-block' || d === 'inline-flex' || d === 'contents');
  };
  const prevEl = (n) => { let p = n.previousSibling; while (p && p.nodeType === 3) p = p.previousSibling; return p; };
  const nextEl = (n) => { let p = n.nextSibling; while (p && p.nodeType === 3) p = p.nextSibling; return p; };
  const normUrl = (value) => {
    try {
      const u = new URL(value, location.href);
      if (u.origin !== location.origin) return u.href;
      const path = u.pathname.replace(/^\\/FOS-agri-V3\\//, '/').replace(/\\/index\\.html$/, '/');
      const search = u.search.replace(/([?&])v=[^&]*&?/, '$1').replace(/[?&]$/, '');
      return path + search + u.hash;
    } catch { return value; }
  };
  const normAttr = (name, value) => {
    if (name === 'href' || name === 'src' || name === 'action' || name === 'poster') return normUrl(value);
    if (name === 'class') return value.split(/\\s+/).filter(Boolean).sort().join(' ');
    if (name === 'style') return value.replace(/url\\((['"]?)([^'")]+)\\1\\)/g, (m, q, u) => 'url(' + normUrl(u) + ')').replace(/\\s+/g, ' ').replace(/;\\s*$/, '').trim();
    return value;
  };
  const out = [];
  const walk = (node, depth) => {
    let text = null;
    const flush = (n) => {
      if (text === null) return;
      let t = text.replace(/\\s+/g, ' ');
      if (BLOCKISH(prevEl(n.first))) t = t.replace(/^ /, '');
      if (BLOCKISH(nextEl(n.last))) t = t.replace(/ $/, '');
      if (t) out.push('  '.repeat(depth) + JSON.stringify(t));
      text = null;
    };
    const range = {};
    for (const ch of node.childNodes) {
      if (ch.nodeType === 3) {
        if (text === null) { text = ''; range.first = ch; }
        text += ch.nodeValue; range.last = ch;
        continue;
      }
      flush(range);
      if (ch.nodeType !== 1 || SKIP.has(ch.tagName)) continue;
      if (ch.id === 'root' && ch.parentElement === document.body) { walk(ch, depth); continue; }
      const attrs = [...ch.attributes]
        .filter((a) => !isIgnoredAttr(ch, a.name, a.value))
        .map((a) => a.name + '=' + JSON.stringify(a.name === 'style' ? normAttr('style', ch.style.cssText) : normAttr(a.name, a.value)))
        .sort();
      // Valeur réellement affichée dans les champs de saisie.
      if (ch.tagName === 'INPUT' && ch.value) attrs.push('(value)=' + JSON.stringify(ch.value));
      out.push('  '.repeat(depth) + '<' + ch.tagName.toLowerCase() + (attrs.length ? ' ' + attrs.join(' ') : '') + '>');
      walk(ch, depth + 1);
    }
    flush(range);
  };
  const head = ['title=' + document.title];
  for (const el of [document.documentElement, document.body]) {
    head.push('<' + el.tagName.toLowerCase() + ' ' + [...el.attributes].filter((a) => !isIgnoredAttr(el, a.name, a.value)).map((a) => a.name + '=' + JSON.stringify(normAttr(a.name, a.value))).sort().join(' ') + '>');
  }
  walk(document.body, 0);
  return head.concat(out).join('\\n');
})()`;

/* ---------- Chrome DevTools Protocol ---------- */
async function launchChrome() {
  const port = 9300 + Math.floor(Math.random() * 500);
  const profile = mkdtempSync(join(tmpdir(), 'fos-chrome-'));
  const proc = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--disable-gpu', 'about:blank'
  ], { stdio: 'ignore' });
  for (let i = 0; i < 150; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return { proc, port, ws: (await res.json()).webSocketDebuggerUrl };
    } catch { /* pas encore prêt */ }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error('Chrome ne répond pas');
}

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    } else listeners.forEach((fn) => fn(msg));
  };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    id += 1;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const once = (method, sessionId) => new Promise((resolve) => {
    const fn = (msg) => {
      if (msg.method === method && msg.sessionId === sessionId) {
        listeners.splice(listeners.indexOf(fn), 1);
        resolve(msg.params);
      }
    };
    listeners.push(fn);
  });
  return new Promise((resolve) => { ws.onopen = () => resolve({ send, once, close: () => ws.close() }); });
}

async function capture(cdp, url, lang, viewport) {
  const [width, height, mobile] = SIZES[viewport];
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const s = (method, params) => cdp.send(method, params, sessionId);
  await s('Page.enable');
  await s('Runtime.enable');
  await s('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
  await s('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  // Langue enregistrée avant le chargement de la page.
  await s('Page.addScriptToEvaluateOnNewDocument', { source: `try { if (!sessionStorage.getItem('fos-init')) { sessionStorage.setItem('fos-init', '1'); localStorage.setItem('fosagri-lang', ${JSON.stringify(liveSwitch ? 'fr' : lang)}); } } catch (e) {}` });
  const loaded = cdp.once('Page.loadEventFired', sessionId);
  await s('Page.navigate', { url });
  await loaded;
  await new Promise((r) => setTimeout(r, wait));
  if (liveSwitch) {
    const click = `(() => { const b = [...document.querySelectorAll('.lang-btn[data-lang="${lang}"], [data-lang="${lang}"]')].find((el) => el.offsetParent !== null) || document.querySelector('[data-lang="${lang}"]'); b && b.click(); return !!b; })()`;
    await s('Runtime.evaluate', { expression: click });
    await new Promise((r) => setTimeout(r, 1200));
  }
  if (scroll === 'bottom') {
    await s('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight)' });
    await new Promise((r) => setTimeout(r, 800));
  }
  const dom = (await s('Runtime.evaluate', { expression: NORMALIZE, returnByValue: true })).result.value;
  const shot = (await s('Page.captureScreenshot', { format: 'png' })).data;
  const probed = probe ? (await s('Runtime.evaluate', { expression: probe, returnByValue: true })).result.value : undefined;
  await cdp.send('Target.closeTarget', { targetId });
  return { dom, shot, probed };
}

/* ---------- Différence de pixels (calculée dans Chrome) ---------- */
async function pixelDiff(cdp, a, b) {
  if (a === b) return 0;
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const expression = `(async () => {
    const load = (src) => new Promise((ok) => { const img = new Image(); img.onload = () => ok(img); img.src = src; });
    const [ia, ib] = await Promise.all([load('data:image/png;base64,${a}'), load('data:image/png;base64,${b}')]);
    if (ia.width !== ib.width || ia.height !== ib.height) return 1;
    const read = (img) => { const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0); return x.getImageData(0, 0, c.width, c.height).data; };
    const da = read(ia); const db = read(ib);
    let diff = 0;
    for (let i = 0; i < da.length; i += 4) {
      if (Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]) > 48) diff += 1;
    }
    return diff / (da.length / 4);
  })()`;
  const result = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, sessionId);
  await cdp.send('Target.closeTarget', { targetId });
  return result.result.value;
}

/* ---------- Diff de lignes (LCS) ---------- */
function diffLines(a, b) {
  const n = a.length; const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i -= 1) for (let j = m - 1; j >= 0; j -= 1)
    dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const ops = []; let i = 0; let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { ops.push(`  ${a[i]}`); i += 1; j += 1; } else if (dp[i + 1][j] >= dp[i][j + 1]) ops.push(`- ${a[i++]}`); else ops.push(`+ ${b[j++]}`);
  }
  while (i < n) ops.push(`- ${a[i++]}`);
  while (j < m) ops.push(`+ ${b[j++]}`);
  // Garder 2 lignes de contexte autour de chaque différence.
  const keep = new Set();
  ops.forEach((line, index) => {
    if (line[0] !== ' ') for (let k = index - 2; k <= index + 2; k += 1) keep.add(k);
  });
  const out = [];
  let last = -2;
  ops.forEach((line, index) => {
    if (!keep.has(index)) return;
    if (index !== last + 1) out.push('@@');
    out.push(line);
    last = index;
  });
  out.changed = ops.filter((line) => line[0] !== ' ').length;
  return out;
}

const chrome = await launchChrome();
const cdp = await connect(chrome.ws);
let failures = 0;
try {
  for (const page of pages) {
    for (const viewport of viewports) {
      for (const lang of langs) {
        const name = `${page.replace(/[/?=&#]/g, '_')}.${lang}.${viewport}`;
        const legacy = await capture(cdp, `${legacyOrigin}/${page}`, lang, viewport);
        const react = await capture(cdp, `${reactOrigin}/${page}`, lang, viewport);
        if (probe) console.log('PROBE', name, '\n legacy:', JSON.stringify(legacy.probed), '\n react: ', JSON.stringify(react.probed));
        const diff = diffLines(legacy.dom.split('\n'), react.dom.split('\n'));
        diff.length = diff.changed ? diff.length : 0;
        const ratio = await pixelDiff(cdp, legacy.shot, react.shot);
        const sameShot = ratio <= 0.001; // tolérance : 0,1 % des pixels (anticrénelage)
        if (diff.length || !sameShot) {
          failures += 1;
          writeFileSync(join(outDir, `${name}.diff`), diff.join('\n'));
          writeFileSync(join(outDir, `${name}.legacy.png`), Buffer.from(legacy.shot, 'base64'));
          writeFileSync(join(outDir, `${name}.react.png`), Buffer.from(react.shot, 'base64'));
        }
        console.log(`${diff.length || !sameShot ? '✗' : '✓'} ${name}  dom:${diff.changed ? `${diff.changed} lignes` : 'identique'}  capture:${sameShot ? 'identique' : 'différente'} (${(ratio * 100).toFixed(2)} %)`);
      }
    }
  }
} finally {
  cdp.close();
  chrome.proc.kill();
}
process.exitCode = failures ? 1 : 0;
