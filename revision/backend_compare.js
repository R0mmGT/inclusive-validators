#!/usr/bin/env node
'use strict';
/**
 * Analyse every distinct (pattern, flags) of data/redos.jsonl with the recheck backend given
 * by RECHECK_BACKEND (pure | native) and write revision/out/backend_<backend>.jsonl.
 * Compare the two outputs with: node revision/backend_compare.js --compare
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'out');

if (process.argv[2] === '--compare') {
  const read = (b) => new Map(fs.readFileSync(path.join(OUT, `backend_${b}.jsonl`), 'utf8').split('\n').filter(Boolean)
    .map(JSON.parse).map((r) => [r.pattern + '\u0000' + r.flags, r]));
  const p = read('pure'), n = read('native');
  let same = 0, diffStatus = 0, diffCx = 0, diffAttack = 0, total = 0;
  const diffs = [];
  for (const [k, a] of p) {
    const b = n.get(k);
    if (!b) continue;
    total++;
    if (a.status !== b.status) { diffStatus++; diffs.push({ pattern: a.pattern, pure: a.status, native: b.status }); continue; }
    if (a.complexity !== b.complexity) { diffCx++; diffs.push({ pattern: a.pattern, pure: a.complexity, native: b.complexity }); continue; }
    if (a.attack !== b.attack) diffAttack++;
    same++;
  }
  const res = { total, same_status_and_complexity: same, status_differs: diffStatus, complexity_differs: diffCx,
    attack_string_differs_among_agreeing: diffAttack, diffs };
  fs.writeFileSync(path.join(OUT, 'backend_compare.json'), JSON.stringify(res, null, 1));
  console.log(JSON.stringify({ ...res, diffs: res.diffs.slice(0, 20) }, null, 1));
  process.exit(0);
}

const backend = process.env.RECHECK_BACKEND || 'auto';
const { checkSync } = require('recheck');
const seen = new Set();
const pats = [];
for (const l of fs.readFileSync(path.join(ROOT, 'data/redos.jsonl'), 'utf8').split('\n').filter(Boolean)) {
  for (const r of JSON.parse(l).regexes || []) {
    const k = r.pattern + '\u0000' + r.flags;
    if (!seen.has(k)) { seen.add(k); pats.push([r.pattern, r.flags]); }
  }
}
const outPath = path.join(OUT, `backend_${backend}.jsonl`);
fs.writeFileSync(outPath, '');
const t0 = Date.now();
for (const [pattern, flags] of pats) {
  let r;
  try { r = checkSync(pattern, flags, { timeout: 10000 }); } catch (e) { r = { status: 'error', error: String(e) }; }
  fs.appendFileSync(outPath, JSON.stringify({ pattern, flags, status: r.status,
    complexity: r.complexity ? r.complexity.type : null, checker: r.checker || null,
    attack: r.attack ? r.attack.string : null }) + '\n');
}
console.log(`${backend}: ${pats.length} patterns in ${(Date.now() - t0) / 1000}s`);
