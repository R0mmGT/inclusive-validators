'use strict';
/**
 * Loads a generated validator into a fresh V8 context and calls it with a timeout.
 * node:vm is not a security boundary; see README.
 */
const vm = require('vm');

function stripModuleSyntax(code) {
  return code
    .replace(/^\s*export\s+default\s+/gm, '')
    .replace(/^\s*export\s+(?=(async\s+)?function|const\s|let\s|var\s|class\s)/gm, '')
    .replace(/^\s*export\s*\{[^}]*\}\s*;?\s*$/gm, '');
}

function loadValidator(code, timeoutMs) {
  const noop = () => {};
  const sandbox = { module: { exports: {} }, console: { log: noop, warn: noop, error: noop, info: noop, debug: noop } };
  sandbox.exports = sandbox.module.exports;
  const ctx = vm.createContext(sandbox);
  // Runtime errors in top-level code are kept as a warning if validate() is defined.
  let warning = null;
  try {
    vm.runInContext(stripModuleSyntax(code), ctx, { timeout: timeoutMs, filename: 'generated.js' });
  } catch (e) {
    if (e instanceof SyntaxError || (e && e.name === 'SyntaxError') || (e && e.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT')) throw e;
    warning = `${(e && e.name) || 'Error'}: ${String((e && e.message) || e).slice(0, 200)}`;
    let defined = false;
    try { defined = vm.runInContext('typeof validate === "function" || typeof module.exports === "function" || !!(module.exports && (module.exports.validate || module.exports.default))', ctx); }
    catch (_) { defined = false; }
    if (!defined) throw e;
  }
  const how = vm.runInContext(
    `typeof validate === 'function' ? 'global'
     : typeof module.exports === 'function' ? 'module'
     : (module.exports && typeof module.exports.validate === 'function') ? 'module.validate'
     : (module.exports && typeof module.exports.default === 'function') ? 'module.default'
     : 'none'`, ctx, { timeout: timeoutMs });
  if (how === 'none') {
    const e = new Error('no callable validate() found');
    e.code = 'NO_VALIDATE';
    throw e;
  }
  const ref = { global: 'validate', module: 'module.exports',
                'module.validate': 'module.exports.validate', 'module.default': 'module.exports.default' }[how];
  vm.runInContext(`globalThis.__v = ${ref};`, ctx);
  return { ctx, how, warning };
}

function describe(r) {
  if (r === null) return 'null';
  if (r && typeof r.then === 'function') return 'promise';
  return `${typeof r}:${r ? 'truthy' : 'falsy'}`;
}

// outcome: accept | reject | non_boolean | error | timeout
function callValidator(ctx, input, timeoutMs) {
  ctx.__input = input;
  const t0 = process.hrtime.bigint();
  const elapsed = () => Number(process.hrtime.bigint() - t0) / 1e6;
  try {
    const r = vm.runInContext('__v(__input)', ctx, { timeout: timeoutMs });
    const ms = elapsed();
    if (r === true) return { outcome: 'accept', ms };
    if (r === false) return { outcome: 'reject', ms };
    return { outcome: 'non_boolean', ms, returned: describe(r) };
  } catch (e) {
    const ms = elapsed();
    if (e && e.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT') return { outcome: 'timeout', ms };
    return { outcome: 'error', ms, error: String((e && e.message) || e).slice(0, 200) };
  }
}

module.exports = { loadValidator, callValidator, stripModuleSyntax };