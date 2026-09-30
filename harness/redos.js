#!/usr/bin/env node
'use strict';
/**
 * ReDoS analysis of every extracted validator.
 *
 * 1. Extract regexes with acorn (literals and RegExp() with constant arguments).
 * 2. Classify each regex with recheck.
 * 3. Confirm vulnerable regexes by calling validate() with attack strings of
 *    growing pump count and estimating the complexity exponent.
 *
 * Output: data/redos.jsonl
 */
// recheck has no native binary for Windows.
if (!process.env.RECHECK_BACKEND && process.platform === 'win32') process.env.RECHECK_BACKEND = 'pure';
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const walk = require('acorn-walk');
const { check } = require('recheck');
const { loadValidator, callValidator, stripModuleSyntax } = require('./sandbox');

const ROOT = path.resolve(__dirname, '..');
const cfgText = fs.readFileSync(path.join(ROOT, 'config.yaml'), 'utf8');
const num = (k, d) => { const m = cfgText.match(new RegExp(`^\\s*${k}:\\s*(\\d+)`, 'm')); return m ? Number(m[1]) : d; };
const RECHECK_TIMEOUT = num('recheck_timeout_ms', 10000);
const CONFIRM_TIMEOUT = num('confirm_timeout_ms', 2000);
const CONFIRM_FLOOR = num('confirm_floor_ms', 20);
const CONFIRM_EXPONENT = Number((cfgText.match(/^\s*confirm_exponent:\s*([\d.]+)/m) || [])[1] || 1.5);
const CONFIRM_MAX_LEN = num('confirm_max_length', 1000000);
const LOAD_TIMEOUT = num('load_timeout_ms', 2000);

const readJsonl = (p) => fs.existsSync(p)
  ? fs.readFileSync(p, 'utf8').split('\n').filter(Boolean).map(JSON.parse) : [];

function constString(n) {
  if (!n) return null;
  if (n.type === 'Literal' && typeof n.value === 'string') return n.value;
  if (n.type === 'TemplateLiteral' && n.expressions.length === 0) return n.quasis[0].value.cooked;
  return null;
}

function extractRegexes(code) {
  let ast = null;
  for (const sourceType of ['module', 'script']) {
    for (const src of [code, stripModuleSyntax(code)]) {
      try { ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType, allowHashBang: true }); break; } catch (_) {}
    }
    if (ast) break;
  }
  if (!ast) return { parse_error: true, regexes: [] };
  const regexes = [];
  walk.full(ast, (node) => {
    if (node.type === 'Literal' && node.regex) {
      regexes.push({ kind: 'literal', pattern: node.regex.pattern, flags: node.regex.flags });
    } else if ((node.type === 'NewExpression' || node.type === 'CallExpression')
               && node.callee.type === 'Identifier' && node.callee.name === 'RegExp' && node.arguments.length) {
      const [a, b] = node.arguments;
      if (a.type === 'Literal' && a.regex) return;
      const p = constString(a);
      if (p === null) regexes.push({ kind: 'dynamic', pattern: null, flags: null });
      else regexes.push({ kind: 'constructor', pattern: p, flags: b ? (constString(b) ?? '') : '' });
    }
  });
  return { parse_error: false, regexes };
}

// Heuristic tags on each regex
function tags(p) {
  const unicodeProperty = /\\[pP]\{/.test(p);
  const nonAsciiExplicit = /[\u0080-\uFFFF]/.test(p) || /\\u(00[89a-fA-F][0-9a-fA-F]|0[1-9a-fA-F][0-9a-fA-F]{2}|[1-9a-fA-F][0-9a-fA-F]{3}|\{)/.test(p) || /\\x[89a-fA-F]/.test(p);
  const asciiLetterRange = /a-z|A-Z/.test(p);
  const wordClass = /\\w/.test(p);
  return {
    unicode_property: unicodeProperty,
    non_ascii_explicit: nonAsciiExplicit,
    ascii_letter_range: asciiLetterRange,
    word_class: wordClass,
    ascii_only_letters: (asciiLetterRange || wordClass) && !unicodeProperty && !nonAsciiExplicit,
    bounded_quantifier: /\{\d+,\d+\}/.test(p),
  };
}

function buildAttack(a, k) {
  return a.pumps.map((p) => p.prefix + p.pump.repeat(Math.max(0, k + (p.bias || 0)))).join('') + a.suffix;
}

// A context interrupted by a timeout is not reused: `state.loaded` is reloaded.
function confirmByGrowth(code, state, attack) {
  const measure = (k) => {
    const input = buildAttack(attack, k);
    let best = null;
    for (let i = 0; i < 3; i++) {
      const r = callValidator(state.loaded.ctx, input, CONFIRM_TIMEOUT);
      if (r.outcome === 'timeout') {
        try { state.loaded = loadValidator(code, LOAD_TIMEOUT); } catch (_) { state.loaded = null; }
        return { k, len: input.length, ms: Infinity, timeout: true };
      }
      best = best === null ? r.ms : Math.min(best, r.ms);
      if (r.ms >= 500) break;
    }
    return { k, len: input.length, ms: best, timeout: false };
  };

  let prev = null;
  for (let k = 1; ; k *= 2) {
    if (!state.loaded) return { confirmed: null, reason: 'reload_failed' };
    const cur = measure(k);
    if (cur.timeout) {
      return { confirmed: true, reason: prev ? 'timeout_after_growth' : 'timeout_at_k1',
               k_prev: prev && prev.k, ms_prev: prev && round(prev.ms), k_cur: k, ms_cur: null, exponent: null };
    }
    if (prev && prev.ms >= CONFIRM_FLOOR) {
      // time ~ n^e  =>  e = log2(t(4k) / t(k)) / 2
      const next = measure(k * 2);
      if (next.timeout) {
        return { confirmed: true, reason: 'timeout_after_growth', k_prev: prev.k, ms_prev: round(prev.ms),
                 k_cur: k, ms_cur: round(cur.ms), exponent: null };
      }
      const exponent = Math.log2(next.ms / prev.ms) / 2;
      return { confirmed: exponent >= CONFIRM_EXPONENT, reason: 'exponent', k_prev: prev.k, ms_prev: round(prev.ms),
               k_cur: k, ms_cur: round(cur.ms), k_next: k * 2, ms_next: round(next.ms),
               exponent: Math.round(exponent * 100) / 100 };
    }
    if (cur.len > CONFIRM_MAX_LEN) {
      return { confirmed: false, reason: 'no_slowdown_up_to_max_length', k_cur: k, ms_cur: round(cur.ms), exponent: null };
    }
    prev = cur;
  }
}
const round = (x) => Math.round(x * 100) / 100;

(async () => {
  const index = readJsonl(path.join(ROOT, 'data/extracted.jsonl')).filter((r) => r.status === 'ok');
  const outPath = path.join(ROOT, 'data/redos.jsonl');
  const done = new Set(readJsonl(outPath).map((r) => r.key));
  const cache = new Map();
  let n = 0;

  for (const rec of index) {
    if (done.has(rec.key)) continue;
    const code = fs.readFileSync(path.join(ROOT, rec.file), 'utf8');
    const { parse_error, regexes } = extractRegexes(code);
    const row = { key: rec.key, field: rec.field, parse_error, n_regex: regexes.length,
                  n_dynamic: regexes.filter((r) => r.kind === 'dynamic').length, regexes: [] };

    const state = { loaded: null };
    try { state.loaded = loadValidator(code, LOAD_TIMEOUT); } catch (_) { state.loaded = null; }
    row.loadable = !!state.loaded;

    const seen = new Set();
    for (const r of regexes.filter((x) => x.kind !== 'dynamic')) {
      const k = `/${r.pattern}/${r.flags}`;
      if (seen.has(k)) continue;
      seen.add(k);
      if (!cache.has(k)) {
        try {
          const res = await check(r.pattern, r.flags, { timeout: RECHECK_TIMEOUT });
          cache.set(k, {
            status: res.status,
            complexity: res.complexity ? res.complexity.type : null,
            checker: res.checker || null,
            attack: res.attack ? { pumps: res.attack.pumps, suffix: res.attack.suffix, base: res.attack.base, length: res.attack.string.length } : null,
            error: res.error ? (res.error.kind || String(res.error)) : null,
          });
        } catch (e) {
          cache.set(k, { status: 'error', complexity: null, checker: null, attack: null, error: String(e.message || e).slice(0, 200) });
        }
      }
      const c = cache.get(k);
      const entry = { pattern: r.pattern, flags: r.flags, kind: r.kind, ...tags(r.pattern),
                      recheck_status: c.status, complexity: c.complexity, checker: c.checker, recheck_error: c.error,
                      attack_length: c.attack ? c.attack.length : null };
      if (c.status === 'vulnerable' && c.attack && state.loaded) {
        const g = confirmByGrowth(code, state, c.attack);
        entry.confirmed = g.confirmed;
        entry.confirm = g;
      }
      row.regexes.push(entry);
    }

    row.static_vulnerable = row.regexes.some((e) => e.recheck_status === 'vulnerable');
    row.exponential = row.regexes.some((e) => e.recheck_status === 'vulnerable' && e.complexity === 'exponential');
    row.confirmed_vulnerable = row.regexes.some((e) => e.confirmed === true);
    row.ascii_only_letters = row.regexes.some((e) => e.ascii_only_letters)
      && !row.regexes.some((e) => e.unicode_property || e.non_ascii_explicit);
    row.unicode_aware = row.regexes.some((e) => e.unicode_property);

    fs.appendFileSync(outPath, JSON.stringify(row) + '\n');
    if (++n % 100 === 0) console.log(`  ${n} functions analysed`);
  }
  console.log(`Analysed ${n} new functions (${done.size} already done). Unique regexes checked: ${cache.size}`);
  process.exit(0);
})();
