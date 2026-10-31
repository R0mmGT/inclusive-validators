#!/usr/bin/env node
'use strict';
/**
 * Worked example for the revision (Reviewer 1, point 9).
 * Gemini 3.8 Flash, given name, English, online-store context, repetition 7:
 *   without instruction  -> /^\p{L}+(?:[' -]\p{L}+)*$/u, length <= 50
 *   with instruction     -> /^[\p{L}\p{M}]+(?:['’ʼ\- ][\p{L}\p{M}]+)*\.?$/u, length <= 100
 *   repaired (ours)      -> same as above without U+02BC in the separator class
 * Reports recheck's verdict, behaviour on the given-name corpus, and timings on the
 * recheck attack string inside the 100-character guard.
 * Output: revision/out/worked_example.json
 */
const fs = require('fs');
const path = require('path');
const { checkSync } = require('recheck');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');

const variants = {
  without_instruction: { re: /^\p{L}+(?:[' -]\p{L}+)*$/u, max: 50, nfc: false },
  with_instruction: { re: /^[\p{L}\p{M}]+(?:['’ʼ\- ][\p{L}\p{M}]+)*\.?$/u, max: 100, nfc: true },
  repaired: { re: /^[\p{L}\p{M}]+(?:['’\- ][\p{L}\p{M}]+)*\.?$/u, max: 100, nfc: true },
};
const validate = (v) => (s) => {
  if (typeof s !== 'string') return false;
  let t = s.trim();
  if (t.length < 1 || t.length > v.max) return false;
  if (v.nfc) t = t.normalize('NFC');
  return v.re.test(t);
};
const corpus = JSON.parse(fs.readFileSync(path.join(ROOT, 'corpus/corpus.json'), 'utf8')).items
  .filter((i) => i.field === 'given_name');
const ext = JSON.parse(fs.readFileSync(path.join(__dirname, 'corpus_ext.json'), 'utf8')).items
  .filter((i) => i.field === 'given_name');
const out = {};
for (const [name, v] of Object.entries(variants)) {
  const r = checkSync(v.re.source, v.re.flags, { timeout: 10000 });
  const f = validate(v);
  const valid = corpus.filter((i) => i.expected === 'valid' && i.category !== 'control');
  const rejected = valid.filter((i) => !f(i.value)).map((i) => i.value);
  const acceptedInvalid = corpus.filter((i) => i.expected === 'invalid' && f(i.value)).map((i) => i.value);
  const nfdRejected = ext.filter((i) => i.category === 'nfd_variant' && !f(i.value)).length;
  const extAccepted = ext.filter((i) => i.expected === 'invalid' && f(i.value)).map((i) => i.category);
  // timings on the recheck attack for the with-instruction pattern (pumps "AʼAʼ" after prefix "ʼʼ", suffix from recheck)
  const timings = [];
  for (const k of [4, 8, 12, 14, 16, 18, 20, 22, 24]) {
    const s = 'ʼʼ' + 'Aʼ'.repeat(2 * k) + '\u0000';
    const t0 = process.hrtime.bigint();
    let timeout = false;
    if (s.length <= v.max) {
      try { vm.runInNewContext('re.test(s)', { re: v.re, s: s.normalize('NFC') }, { timeout: 10000 }); }
      catch (e) { timeout = true; }
    }
    const ms = Number(process.hrtime.bigint() - t0) / 1e6;
    timings.push({ len: s.length, ms: timeout ? null : Math.round(ms * 100) / 100, timeout_10s: timeout, guarded_out: s.length > v.max });
    if (timeout) break;
  }
  out[name] = { pattern: v.re.source, flags: v.re.flags, max_length: v.max, recheck: r.status, complexity: r.complexity && r.complexity.type,
    attack: r.attack ? { pumps: r.attack.pumps, suffix: r.attack.suffix } : null,
    frr: `${rejected.length}/${valid.length}`, rejected, false_accepts: acceptedInvalid,
    nfd_rejected: `${nfdRejected}/${ext.filter((i) => i.category === 'nfd_variant').length}`,
    ext_negatives_accepted: extAccepted, timings };
}
fs.writeFileSync(path.join(__dirname, 'out', 'worked_example.json'), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
