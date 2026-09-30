// Validate a wide range of international phone number formats without external libraries.
// Returns true for plausible phone numbers (international E.164-like and many common local formats).
function validate(input) {
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (s.length === 0) return false;

  // Feature-detect Unicode property escapes (for robust digit/letter detection)
  const hasUnicodeProp = (() => {
    try {
      new RegExp('\\p{Nd}', 'u');
      return true;
    } catch (e) {
      return false;
    }
  })();

  // Helper regex constructors that use Unicode props when available
  const reDigit = (flags = 'g') => (hasUnicodeProp ? new RegExp('\\p{Nd}', flags + 'u') : new RegExp('\\d', flags));
  const reAllDigits = (flags = '') => (hasUnicodeProp ? new RegExp('^\\p{Nd}+$', flags + 'u') : new RegExp('^\\d+$', flags));
  const reLetter = (flags = '') => (hasUnicodeProp ? new RegExp('\\p{L}', flags + 'u') : new RegExp('[A-Za-z]', flags));

  // Extract and strip common extensions like "ext 1234", "x123", "ext.1234", "#1234"
  const extPattern = hasUnicodeProp
    ? /(?:ext|ext\.|extension|x|#)\s*[:\.\-]?\s*(\p{Nd}+)$/iu
    : /(?:ext|ext\.|extension|x|#)\s*[:\.\-]?\s*(\d+)$/i;
  const extMatch = s.match(extPattern);
  if (extMatch) {
    s = s.slice(0, extMatch.index).trim();
    if (s.length === 0) return false; // something like "ext 123" isn't a phone number
  }

  // Balanced parentheses check: allow at most one pair, and '(' must come before ')'
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  if (openCount > 1 || closeCount > 1) return false;
  if (openCount === 1) {
    const openIdx = s.indexOf('(');
    const closeIdx = s.indexOf(')');
    if (openIdx > closeIdx) return false;
    const inside = s.slice(openIdx + 1, closeIdx);
    // inside parentheses should be digits and common separators only
    const insideAllowed = hasUnicodeProp
      ? /^[\p{Nd}\s.\-\/]+$/u
      : /^[\d\s.\-\/]+$/;
    if (!insideAllowed.test(inside)) return false;
  }

  // '+' is only allowed at the start (international format). Normalize common international prefixes.
  // Accept leading '+' or international dialing prefixes '00' or '011' optionally separated by spaces.
  // But reject '+' appearing elsewhere.
  if ((s.match(/\+/g) || []).length > 1) return false;
  if (s.indexOf('+') > 0) return false; // plus not at start

  // Normalize fullwidth plus/minus to ASCII plus if present
  s = s.replace(/\uFF0B/g, '+'); // fullwidth plus -> +

  // If starts with international dial prefixes, normalize them to '+'
  const trimmedLead = s.replace(/^[\s\u00A0]+/, ''); // remove leading spaces
  if (/^(?:00|011)[\s\-\.\/]*/.test(trimmedLead)) {
    // replace leading 00 or 011 (possibly with separators after) with '+'
    s = trimmedLead.replace(/^(?:00|011)[\s\-\.\/]*/, '+') + s.slice(trimmedLead.length);
  }

  // Reject any letters left in the main number (we already removed extension). Phone numbers should not contain letters here.
  if (reLetter().test(s)) return false;

  // Remove permitted separators: spaces, hyphens, dots, slashes, non-breaking spaces, thin spaces, parentheses (we validated them earlier)
  s = s.replace(/[\s\-\.\u00A0\u202F\/\u2009\u2007\u2028\u2029]+/g, '');
  s = s.replace(/[()]/g, '');

  if (s === '+' || s.length === 0) return false;

  // After cleanup, string should be optional leading '+' followed by only digits
  const plusAtStart = s[0] === '+';
  const after = plusAtStart ? s.slice(1) : s;
  if (after.length === 0) return false;

  // Ensure remaining characters are digits (including Unicode decimal digits)
  if (!reAllDigits().test(after)) return false;

  // Count digits using Unicode-aware digit regex if available
  const digits = (after.match(reDigit('g')) || []).length;

  // Reasonable global limits:
  // - E.164 defines up to 15 digits for country code + national number when in international form.
  // - Some emergency/service codes are shorter (2-3 digits).
  // We'll accept digit counts between 2 and 15 inclusive.
  if (digits < 2 || digits > 15) return false;

  // Avoid trivial sequences like "0000000" or "111111111" which are unlikely valid numbers
  const uniqueDigits = new Set((after.match(reDigit('g')) || []).map(ch => ch));
  if (uniqueDigits.size <= 1) return false;

  // Reject suspiciously long strings with lots of punctuation leftover (guard against junk)
  if (input.length > 50) return false;

  // Passed all sanity checks -> plausible international/local phone number
  return true;
}
