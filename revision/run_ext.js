#!/usr/bin/env node
'use strict';
/**
 * Run every usable validator (load_status ok in data/results.jsonl) on the
 * supplementary corpus revision/corpus_ext.json, with the original harness and timeouts.
 * Output: revision/out/results_ext.jsonl
 */
const fs = require('fs');
const path = require('path');
const { loadValidator, callValidator } = require('../harness/sandbox');

const ROOT = path.resolve(__dirname, '..');
const readJsonl = (p) => fs.readFileSync(p, 'utf8').split('\n').filter(Boolean).map(JSON.parse);
const items = JSON.parse(fs.readFileSync(path.join(__dirname, 'corpus_ext.json'), 'utf8')).items;
const byField = {};
for (const it of items) (byField[it.field] ||= []).push(it);
const ext = Object.fromEntries(readJsonl(path.join(ROOT, 'data/extracted.jsonl')).map((r) => [r.key, r]));
const usable = readJsonl(path.join(ROOT, 'data/results.jsonl')).filter((r) => r.load_status === 'ok');
const outPath = path.join(__dirname, 'out', 'results_ext.jsonl');
fs.writeFileSync(outPath, '');
let n = 0;
for (const r of usable) {
  const code = fs.readFileSync(path.join(ROOT, ext[r.key].file), 'utf8');
  const row = { key: r.key, field: r.field };
  try {
    const { ctx } = loadValidator(code, 2000);
    row.results = byField[r.field].map((it) => {
      const c = callValidator(ctx, it.value, 1000);
      delete c.ms;
      return { id: it.id, ...c };
    });
  } catch (e) {
    row.error = String(e.message || e).slice(0, 200);
    row.results = [];
  }
  fs.appendFileSync(outPath, JSON.stringify(row) + '\n');
  if (++n % 250 === 0) console.log(`${n}/${usable.length}`);
}
console.log(`done ${n}`);
