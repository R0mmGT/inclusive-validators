'use strict';
/**
 * Validation suite of synthetic validators with known complexity, used to check
 * the growth-based confirmation (Reviewer 1). `expected` is the ground truth by
 * construction; `procedure_expected` is what a correct run of the procedure
 * should report (it differs only for N1, a documented false-negative case).
 */
const A = (pump, prefix = '', suffix = '\u0000') => ({ pumps: [{ prefix, pump, bias: 0 }], suffix });
const A2 = (pump) => ({ pumps: [{ prefix: '0', pump, bias: 0 }, { prefix: '', pump, bias: 0 }], suffix: '\u0000' });

module.exports = [
  // Linear controls: given an attack-shaped input, they must not be confirmed.
  { id: 'L1', cls: 'linear', expected: false, code: "function validate(s){return /^[\\p{L}\\p{M}]+(?:[ '\\u2019.-][\\p{L}\\p{M}]+)*$/u.test(s);}", attack: A('a', 'a') },
  { id: 'L2', cls: 'linear', expected: false, code: "function validate(s){let n=0;for(let i=0;i<s.length;i++){n+=s.charCodeAt(i)%7;}return n>=0&&/^\\d+$/.test(s);}", attack: A('0', '0') },
  { id: 'L3', cls: 'n log n', expected: false, code: "function validate(s){const t=s.split('').sort().join('');return t.length>0&&/^[a-z]+$/.test(s);}", attack: A('a', 'a') },
  { id: 'L4', cls: 'linear', expected: false, code: "function validate(s){return /^\\+?(\\d[\\s-]?)+$/.test(s);}", attack: A('0', '0') },
  { id: 'L5', cls: 'linear', expected: false, code: "function validate(s){return /^(?:[a-z]|[0-9])+$/.test(s);}", attack: A('a', 'a') },
  // Super-linear, unguarded: must be confirmed.
  { id: 'Q1', cls: 'quadratic', expected: true, code: "function validate(s){return /^\\d+\\d+$/.test(s);}", attack: A('0', '0') },
  { id: 'Q2', cls: 'quadratic (search)', expected: true, code: "function validate(s){return /a*a*b/.test(s);}", attack: { pumps: [{ prefix: '', pump: 'a', bias: 0 }, { prefix: '', pump: 'a', bias: 0 }], suffix: '\u0000b' } },
  { id: 'C1', cls: 'cubic', expected: true, code: "function validate(s){return /^\\d+\\d+\\d+$/.test(s);}", attack: A2('0') },
  { id: 'E1', cls: 'exponential', expected: true, code: "function validate(s){return /^(a+)+$/.test(s);}", attack: A('a', 'a') },
  { id: 'E2', cls: 'exponential', expected: true, code: "function validate(s){return /^([A-Za-z]+[ '-]?)+$/.test(s);}", attack: A('A', 'A') },
  // Guarded variants.
  { id: 'G1', cls: 'quadratic, length <= 200', expected: false, code: "function validate(s){if(s.length>200)return false;return /^\\d+\\d+$/.test(s);}", attack: A('0', '0') },
  { id: 'G2', cls: 'exponential, length <= 50', expected: true, code: "function validate(s){if(s.length>50)return false;return /^(a+)+$/.test(s);}", attack: A('a', 'a') },
  { id: 'G3', cls: 'exponential, length <= 16', expected: false, code: "function validate(s){if(s.length>16)return false;return /^(a+)+$/.test(s);}", attack: A('a', 'a') },
  { id: 'G4', cls: 'quadratic, length <= 100000', expected: true, code: "function validate(s){if(s.length>100000)return false;return /^\\d+\\d+$/.test(s);}", attack: A('0', '0') },
  { id: 'G5', cls: 'cubic, length <= 300', expected: false, code: "function validate(s){if(s.length>300)return false;return /^\\d+\\d+\\d+$/.test(s);}", attack: A2('0') },
  // Normalization invalidates the recheck attack, but an adaptive attack exists.
  { id: 'N1', cls: 'exponential, control characters stripped', expected: true, procedure_expected: false,
    code: "function validate(s){s=s.replace(/[\\u0000-\\u001f]/g,'');return /^(a+)+$/.test(s);}", attack: A('a', 'a'),
    adaptive_attack: A('a', 'a', '!') },
];
