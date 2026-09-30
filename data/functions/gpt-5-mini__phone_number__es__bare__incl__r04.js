function validate(phone) {
  // Robust, library-free international phone number heuristic validator.
  // Returns true for typical valid phone numbers worldwide (international/local),
  // using E.164-like digit limits and allowing common separators and extensions.
  if (typeof phone !== 'string') return false;
  let s = phone.trim();
  if (s.length === 0) return false;

  // Reject obvious spam/metadata separators
  if (/[;,]/.test(s)) return false;

  // Remove a single trailing extension if present (e.g. "ext 123", "x123", "#123")
  s = s.replace(/\s*(?:ext(?:ension)?|ext\.|x|#)\s*[:.\-]?\s*\p{N}+\s*$/iu, '').trim();

  // If any letters remain, it's not a plain phone number
  if (/\p{L}/u.test(s)) return false;

  // Parentheses should be balanced
  const openPar = (s.match(/\(/g) || []).length;
  const closePar = (s.match(/\)/g) || []).length;
  if (openPar !== closePar) return false;

  // Only allow one leading plus sign
  const plusMatches = (s.match(/\+/g) || []).length;
  if (plusMatches > 1) return false;

  // Disallow plus sign except at start
  if (plusMatches === 1 && s[0] !== '+') return false;

  // Recognize international prefix '00' at the start as well
  const hasPlus = s[0] === '+';
  const has00 = !hasPlus && s.startsWith('00');

  // Remove everything except Unicode digits (Nd)
  // Keep note of leading international marker (plus or 00) separately
  let body = s;
  if (hasPlus) body = s.slice(1);
  else if (has00) body = s.slice(2);

  const digitMatches = body.match(/\p{N}/gu) || [];
  const digits = digitMatches.join('');

  // Common sensible digit-length bounds for telephone numbers:
  // E.164 max is 15 digits. Minimum practical subscriber length ~6 for many countries.
  const MIN_DIGITS = 6;
  const MAX_DIGITS = 15;

  if (digits.length < MIN_DIGITS || digits.length > MAX_DIGITS) return false;

  // After stripping digits, the remaining characters (excluding the allowed leading + or 00)
  // should be only separators like spaces, hyphens, dots, parentheses, or thin spaces.
  // Rebuild a normalized form and compare to ensure no other symbols were present.
  // Normalize original (without extension) by removing allowed separators and comparing digits.
  const normalized = (hasPlus ? '+' : has00 ? '00' : '') + digits;
  // Build a version of s where we remove known separators and allowed markers and compare digits presence.
  const sWithoutSeparators = s
    .replace(/[\s\-\.\u2009\u200A\u200B\u00A0()\/\\\u2011\u2013\u2014]/gu, '') // remove various spaces, dashes, slashes, parens
    .replace(/^0+(?=\d)/, (m) => m) // keep zeros if they are meaningful (no-op here, just clarity)
    .replace(/\s+/g, '');

  // sWithoutSeparators may contain a leading '+', or '00', then digits only; reject otherwise
  if (sWithoutSeparators !== normalized) return false;

  // Disallow sequences that are all the same digit (e.g., "1111111") - very likely invalid
  if (/^(\d)\1+$/.test(digits)) return false;

  return true;
}
