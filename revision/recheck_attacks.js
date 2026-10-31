#!/usr/bin/env node
'use strict';
/**
 * Re-derive recheck results (status, complexity and attack string) for every
 * statically vulnerable pattern, and for regexes that are constructed at run time.
 *
 * Usage: RECHECK_BACKEND=pure node revision/recheck_attacks.js
 * Output: revision/out/attacks.json, revision/out/dynamic_capture.json
 *
 * The attack strings are saved so that every timing configuration replays
 * exactly the same inputs.
 */
const fs = require('fs');
const path = require('path');
const { check } = require('recheck');
const { loadValidator, callValidator } = require('../harness/sandbox');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'revision', 'out');
fs.mkdirSync(OUT, { recursive: true });
const readJsonl = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8').split('\n').filter(Boolean).map(JSON.parse);
const red = readJsonl('data/redos.jsonl');
const ext = Object.fromEntries(readJsonl('data/extracted.jsonl').map((r) => [r.key, r]));
const corpus = JSON.parse(fs.readFileSync(path.join(ROOT, 'corpus/corpus.json'), 'utf8')).items;

const cache = new Map();
async function rc(pattern, flags) {
  const k = `/${pattern}/${flags}`;
  if (!cache.has(k)) {
    try {
      const r = await check(pattern, flags, { timeout: 10000 });
      cache.set(k, { status: r.status, complexity: r.complexity ? r.complexity.type : null,
        attack: r.attack ? { pumps: r.attack.pumps, suffix: r.attack.suffix, length: r.attack.string.length } : null });
    } catch (e) { cache.set(k, { status: 'error', complexity: null, attack: null, error: String(e.message || e).slice(0, 200) }); }
  }
  return cache.get(k);
}

// Capture regexes built at run time: wrap RegExp inside the sandbox before calling validate().
function captureDynamic(rec) {
  const code = fs.readFileSync(path.join(ROOT, ext[rec.key].file), 'utf8');
  let loaded;
  try { loaded = loadValidator(code, 2000); } catch (_) { return null; }
  const vm = require('vm');
  vm.runInContext(`
    globalThis.__seen = [];
    const __R = RegExp;
    globalThis.RegExp = new Proxy(__R, {
      construct(t, args) { const r = Reflect.construct(t, args); __seen.push([r.source, r.flags]); return r; },
      apply(t, self, args) { const r = Reflect.apply(t, self, args); __seen.push([r.source, r.flags]); return r; },
    });`, loaded.ctx);
  for (const it of corpus.filter((c) => c.field === rec.field)) callValidator(loaded.ctx, it.value, 1000);
  const seen = vm.runInContext('JSON.stringify(__seen)', loaded.ctx);
  const uniq = new Map();
  for (const [s, f] of JSON.parse(seen)) uniq.set(`/${s}/${f}`, { pattern: s, flags: f });
  return [...uniq.values()];
}

(async () => {
  const attacks = [];
  let mismatch = 0, compared = 0;
  for (const r of red) {
    if (!r.static_vulnerable) continue;
    const seen = new Set();
    for (const e of r.regexes) {
      if (e.recheck_status !== 'vulnerable') continue;
      const k = `/${e.pattern}/${e.flags}`;
      if (seen.has(k)) continue; seen.add(k);
      const c = await rc(e.pattern, e.flags);
      compared++;
      const same = c.status === 'vulnerable' && c.attack && c.attack.length === e.attack_length;
      if (!same) mismatch++;
      attacks.push({ key: r.key, field: r.field, source: 'static', pattern: e.pattern, flags: e.flags,
        complexity: c.complexity, attack: c.attack, stored_attack_length: e.attack_length,
        stored_confirmed: e.confirmed ?? null, stored_confirm: e.confirm ?? null, loadable: !!r.loadable });
    }
  }
  console.log(`static vulnerable pattern occurrences: ${compared}; attack-length mismatches vs stored run: ${mismatch}`);

  // Dynamic constructions
  const dyn = [];
  for (const r of red) {
    if (!r.loadable || r.n_dynamic === 0) continue;
    const pats = captureDynamic(r) || [];
    const staticSet = new Set(r.regexes.filter((x) => x.kind !== 'dynamic').map((x) => `/${x.pattern}/${x.flags}`));
    const entry = { key: r.key, field: r.field, n_dynamic_sites: r.n_dynamic, captured: [] };
    for (const p of pats) {
      const k = `/${p.pattern}/${p.flags}`;
      const c = await rc(p.pattern, p.flags);
      entry.captured.push({ ...p, already_static: staticSet.has(k), status: c.status, complexity: c.complexity });
      if (c.status === 'vulnerable' && !staticSet.has(k)) {
        attacks.push({ key: r.key, field: r.field, source: 'dynamic', pattern: p.pattern, flags: p.flags,
          complexity: c.complexity, attack: c.attack, stored_attack_length: null, stored_confirmed: null,
          stored_confirm: null, loadable: true });
      }
    }
    dyn.push(entry);
  }
  fs.writeFileSync(path.join(OUT, 'attacks.json'), JSON.stringify(attacks));
  fs.writeFileSync(path.join(OUT, 'dynamic_capture.json'), JSON.stringify(dyn, null, 1));
  const nd = dyn.reduce((a, d) => a + d.captured.filter((c) => !c.already_static).length, 0);
  const nv = attacks.filter((a) => a.source === 'dynamic').length;
  console.log(`functions with dynamic sites (loadable): ${dyn.length}; new run-time patterns: ${nd}; vulnerable: ${nv}`);
  process.exit(0);
})();
