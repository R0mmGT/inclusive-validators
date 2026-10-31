#!/usr/bin/env node
'use strict';
/**
 * Record full timing-growth curves for every statically vulnerable pattern
 * (plus run-time patterns and the synthetic suite), so that the confirmation
 * rule can be re-applied offline under any thresholds.
 *
 * Usage: node [v8 flags] revision/curves.js <config-name>
 * Output: revision/out/curves_<config-name>.jsonl
 *
 * Measurement: t(k) = minimum of up to three timed calls of the whole validate()
 * (one call if it takes >= 500 ms), k = 1, 2, 4, ...; stops when a call exceeds
 * MAX_TIMEOUT (censored) or the attack string exceeds MAX_LEN characters.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { loadValidator, callValidator } = require('../harness/sandbox');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'revision', 'out');
const cfg = process.argv[2] || 'default';
const WARMUP = process.env.WARMUP ? Number(process.env.WARMUP) : 0;
const MAX_TIMEOUT = 5000, MAX_LEN = 1000000;
const ext = Object.fromEntries(fs.readFileSync(path.join(ROOT, 'data/extracted.jsonl'), 'utf8')
  .split('\n').filter(Boolean).map(JSON.parse).map((r) => [r.key, r]));
const attacks = JSON.parse(fs.readFileSync(path.join(OUT, 'attacks.json'), 'utf8'))
  .filter((a) => a.loadable && a.attack);
const synth = require('./synthetic_suite').flatMap((s) => {
  const base = { key: `SYN_${s.id}`, field: 'synthetic', source: 'synthetic', cls: s.cls, expected: s.expected,
    procedure_expected: s.procedure_expected ?? s.expected, code: s.code, attack: s.attack };
  return s.adaptive_attack ? [base, { ...base, key: `SYN_${s.id}_adaptive`, attack: s.adaptive_attack, procedure_expected: s.expected }] : [base];
});
const build = (a, k) => a.pumps.map((p) => p.prefix + p.pump.repeat(Math.max(0, k + (p.bias || 0)))).join('') + a.suffix;

function curve(code, attack) {
  let st;
  try { st = loadValidator(code, 2000); } catch (e) { return { error: 'load_failed' }; }
  if (WARMUP) { const w = build(attack, 1); for (let i = 0; i < WARMUP; i++) callValidator(st.ctx, w, MAX_TIMEOUT); }
  const pts = [];
  for (let k = 1; ; k *= 2) {
    const input = build(attack, k);
    if (input.length > MAX_LEN) break;
    let best = null, timeout = false, runs = 0;
    for (let i = 0; i < 3; i++) {
      const r = callValidator(st.ctx, input, MAX_TIMEOUT);
      runs++;
      if (r.outcome === 'timeout') { timeout = true; break; }
      best = best === null ? r.ms : Math.min(best, r.ms);
      if (r.ms >= 500) break;
    }
    pts.push({ k, len: input.length, ms: timeout ? null : Math.round(best * 1000) / 1000, timeout, runs });
    if (timeout) break;
  }
  return { pts };
}

const outPath = path.join(OUT, `curves_${cfg}.jsonl`);
fs.writeFileSync(outPath, '');
const meta = { config: cfg, node: process.version, v8: process.versions.v8, platform: process.platform, arch: process.arch,
  execArgv: process.execArgv, warmup: WARMUP, cpus: require('os').cpus()[0].model, started: new Date().toISOString() };
fs.appendFileSync(outPath, JSON.stringify({ meta }) + '\n');
const items = [...synth, ...attacks];
let n = 0;
for (const a of items) {
  const code = a.code || fs.readFileSync(path.join(ROOT, ext[a.key].file), 'utf8');
  const c = curve(code, a.attack);
  fs.appendFileSync(outPath, JSON.stringify({ key: a.key, field: a.field, source: a.source, pattern: a.pattern ?? null,
    flags: a.flags ?? null, complexity: a.complexity ?? a.cls, expected: a.expected ?? null,
    procedure_expected: a.procedure_expected ?? null, ...c }) + '\n');
  if (++n % 50 === 0) console.log(`${cfg}: ${n}/${items.length}`);
}
fs.appendFileSync(outPath, JSON.stringify({ meta_end: new Date().toISOString() }) + '\n');
console.log(`${cfg}: done ${n} items`);
