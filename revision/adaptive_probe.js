#!/usr/bin/env node
'use strict';
/**
 * Guard-aware probe of the statically vulnerable occurrences that the growth procedure
 * did NOT confirm (Reviewer 1, point 2). Instead of doubling k, every pump count
 * k = 1, 2, 3, ... is tried while the attack is at most MAX_LEN characters, so an input
 * just below a length guard is not skipped. Reports the slowest single call.
 * A second variant replaces recheck's suffix by "!" (the suffix is often a control
 * character that trim()/normalisation removes).
 * Output: revision/out/adaptive_probe.json
 */
const fs = require('fs');
const path = require('path');
const { loadValidator, callValidator } = require('../harness/sandbox');
const ROOT = path.resolve(__dirname, '..');
const MAX_LEN = 2000, TIMEOUT = 2000;
const ext = Object.fromEntries(fs.readFileSync(path.join(ROOT, 'data/extracted.jsonl'), 'utf8')
  .split('\n').filter(Boolean).map(JSON.parse).map((r) => [r.key, r]));
const attacks = JSON.parse(fs.readFileSync(path.join(__dirname, 'out', 'attacks.json'), 'utf8'))
  .filter((a) => a.loadable && a.attack && a.source === 'static' && !a.stored_confirmed);
const build = (a, k, suffix) => a.pumps.map((p) => p.prefix + p.pump.repeat(Math.max(0, k + (p.bias || 0)))).join('') + suffix;
const out = [];
for (const a of attacks) {
  const code = fs.readFileSync(path.join(ROOT, ext[a.key].file), 'utf8');
  const res = { key: a.key, pattern: a.pattern, complexity: a.complexity };
  for (const [name, suffix] of [['recheck_suffix', a.attack.suffix], ['bang_suffix', '!']]) {
    let st = loadValidator(code, 2000);
    let worst = { ms: 0, len: 0, k: 0, timeout: false };
    for (let k = 1; ; k++) {
      const s = build(a.attack, k, suffix);
      if (s.length > MAX_LEN) break;
      const r = callValidator(st.ctx, s, TIMEOUT);
      if (r.outcome === 'timeout') { worst = { ms: TIMEOUT, len: s.length, k, timeout: true }; break; }
      if (r.ms > worst.ms) worst = { ms: Math.round(r.ms * 100) / 100, len: s.length, k, timeout: false };
    }
    res[name] = worst;
  }
  out.push(res);
}
fs.writeFileSync(path.join(__dirname, 'out', 'adaptive_probe.json'), JSON.stringify(out, null, 1));
const fnWorst = {};
for (const r of out) {
  const m = Math.max(r.recheck_suffix.ms, r.bang_suffix.ms);
  fnWorst[r.key] = Math.max(fnWorst[r.key] || 0, m);
}
const v = Object.values(fnWorst);
console.log(JSON.stringify({ occurrences: out.length, functions: v.length,
  ge100ms: v.filter((x) => x >= 100).length, ge500ms: v.filter((x) => x >= 500).length,
  ge1s: v.filter((x) => x >= 1000).length, timeout2s: v.filter((x) => x >= TIMEOUT).length,
  slowest: Object.entries(fnWorst).sort((a, b) => b[1] - a[1]).slice(0, 10) }, null, 1));
