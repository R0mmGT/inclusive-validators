function validate(input) {
  // Validate global phone numbers in a broad, culture-aware way without external libs.
  // Strategy:
  // - Accept international ("+...", "00...", "011...") and local forms.
  // - Allow common separators: spaces, hyphens, dots, parentheses, slashes.
  // - Recognize and strip common extension markers (ext, x, #, , or ;).
  // - Convert letters (vanity numbers) to digits using the standard phone keypad mapping.
  // - Normalize several common Unicode digit blocks (fullwidth, Arabic-Indic, etc.) to ASCII digits.
  // - Enforce only digits remain after cleaning and a reasonable length (2..15 digits per ITU E.164 max).
  if (typeof input !== 'string') return false;

  let s = input.trim();
  if (s.length === 0) return false;

  // Normalize characters: map letters to digits and some Unicode digits to ASCII digits.
  const letterToDigit = {
    A: '2', B: '2', C: '2',
    D: '3', E: '3', F: '3',
    G: '4', H: '4', I: '4',
    J: '5', K: '5', L: '5',
    M: '6', N: '6', O: '6',
    P: '7', Q: '7', R: '7', S: '7',
    T: '8', U: '8', V: '8',
    W: '9', X: '9', Y: '9', Z: '9'
  };

  // Map an individual character to its normalized form (digit, +, or separator/other).
  function normalizeChar(ch) {
    // ASCII digits
    if (ch >= '0' && ch <= '9') return ch;

    const code = ch.charCodeAt(0);

    // Fullwidth digits U+FF10 - U+FF19
    if (code >= 0xFF10 && code <= 0xFF19) return String(code - 0xFF10);

    // Arabic-Indic digits U+0660 - U+0669
    if (code >= 0x0660 && code <= 0x0669) return String(code - 0x0660);

    // Extended Arabic-Indic digits U+06F0 - U+06F9
    if (code >= 0x06F0 && code <= 0x06F9) return String(code - 0x06F0);

    // Devanagari digits U+0966 - U+096F
    if (code >= 0x0966 && code <= 0x096F) return String(code - 0x0966);

    // Bengali digits U+09E6 - U+09EF
    if (code >= 0x09E6 && code <= 0x09EF) return String(code - 0x09E6);

    // Gurmukhi digits U+0A66 - U+0A6F
    if (code >= 0x0A66 && code <= 0x0A6F) return String(code - 0x0A66);

    // Latin letters -> map to keypad digits (vanity numbers)
    const up = ch.toUpperCase();
    if (up >= 'A' && up <= 'Z' && letterToDigit[up]) return letterToDigit[up];

    // Keep '+' and common punctuation intact for now so they can be handled downstream
    if (ch === '+' || ch === '#' || ch === ',' || ch === ';') return ch;

    // Keep separators as-is (they will be stripped later): space, hyphen, dot, parentheses, slash, plus handled above
    if (ch === ' ' || ch === '\u00A0' || ch === '\t' || ch === '-' || ch === '.' || ch === '(' || ch === ')' || ch === '/') return ch;

    // Other characters are returned unchanged (will likely cause rejection later)
    return ch;
  }

  let normalized = '';
  for (let i = 0; i < s.length; i++) {
    normalized += normalizeChar(s[i]);
  }
  s = normalized;

  // Strip trailing extension if present (e.g. "ext 1234", "x123", "#1234", ";1234", ",1234")
  s = s.replace(/\s*(?:ext(?:ension)?|x|#|,|;)\s*\d+$/i, '').trim();

  if (s.length === 0) return false;

  // Remove common separators and parentheses
  s = s.replace(/[\s\-\.\(\)\/]+/g, '');

  // Validate plus sign usage: at most one and only at start
  const plusMatches = (s.match(/\+/g) || []).length;
  if (plusMatches > 1) return false;
  if (plusMatches === 1 && s[0] !== '+') return false;

  // Handle international dialing prefixes: leading '+', '00', or '011'
  let working = s;
  if (working[0] === '+') {
    working = working.slice(1);
  } else if (working.startsWith('00')) {
    working = working.slice(2);
  } else if (working.startsWith('011')) {
    // 011 is common international prefix from North America; accept but strip
    working = working.slice(3);
  }

  // After stripping prefixes, should be digits only
  if (!/^\d+$/.test(working)) return false;

  // Enforce reasonable length: at least 2 digits (to include short emergency/local codes) and at most 15 (E.164)
  const digitCount = working.length;
  if (digitCount < 2 || digitCount > 15) return false;

  return true;
}
