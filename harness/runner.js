#!/usr/bin/env node
'use strict';
/**
 * Run every extracted validator against the corpus items of its field.
 *
 * Input : data/extracted.jsonl, corpus/corpus.json
 * Output: data/results.jsonl
 */
const fs = require('fs');
const path = require('path');
const { loadValidator, callValidator } = require('./sandbox');

const ROOT = path.resolve(__dirname, '..');
const cfgText = fs.readFileSync(path.join(ROOT, 'config.yaml'), 'utf8');
const num = (k, d) => { const m = cfgText.match(new RegExp(`^\\s*${k}:\\s*(\\d+)`, 'm')); return m ? Number(m[1]) : d; };
const CALL_TIMEOUT = num('call_timeout_ms', 1000);
const LOAD_TIMEOUT = num('load_timeout_ms', 2000);

const readJsonl = (p) => fs.existsSync(p)
  ? fs.readFileSync(p, 'utf8').split('\n').filter(Boolean).map(JSON.parse) : [];

const corpus = JSON.parse(fs.readFileSync(path.join(ROOT, 'corpus/corpus.json'), 'utf8')).items;
const byField = {};
for (const it of corpus) (byField[it.field] ||= []).push(it);

const index = readJsonl(path.join(ROOT, 'data/extracted.jsonl')).filter((r) => r.status === 'ok');
const outPath = path.join(ROOT, 'data/results.jsonl');
const done = new Set(readJsonl(outPath).map((r) => r.key));

let n = 0;
for (const rec of index) {
  if (done.has(rec.key)) continue;
  const code = fs.readFileSync(path.join(ROOT, rec.file), 'utf8');
  const row = { key: rec.key, field: rec.field };
  try {
    const { ctx, how, warning } = loadValidator(code, LOAD_TIMEOUT);
    row.load_status = 'ok';
    row.export_style = how;
    if (warning) row.load_warning = warning;
    row.results = byField[rec.field].map((it) => ({ id: it.id, ...callValidator(ctx, it.value, CALL_TIMEOUT) }));
  } catch (e) {
    row.load_status = e.code === 'NO_VALIDATE' ? 'no_validate'
      : e.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT' ? 'load_timeout' : 'load_error';
    row.load_error = String(e.message || e).slice(0, 300);
    row.results = [];
  }
  fs.appendFileSync(outPath, JSON.stringify(row) + '\n');
  if (++n % 100 === 0) console.log(`  ${n} functions executed`);
}
console.log(`Executed ${n} new functions (${done.size} already done).`);