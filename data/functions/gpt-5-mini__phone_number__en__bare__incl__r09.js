function validate(input) {
  // Robust international phone number validation without external libs.
  // Accepts E.164-style numbers (+...), common international dialing prefixes (00, 011),
  // local numbers, numbers with separators, extensions (ext/x/#...), and vanity numbers (1-800-FLOWERS).
  // Returns true for plausible phone numbers (4-15 significant digits after removing international dialing prefixes),
  // false otherwise.

  if (typeof input !== 'string') return false;

  // Normalize
  let s = input.trim();
  if (!s) return false;

  // Normalize a few common Unicode variants
  s = s.replace(/\uFF0B/g, '+'); // fullwidth plus -> +
  s = s.replace(/^tel:/i, '');   // remove tel: scheme if present

  // Remove extension portion (ext, extension, x, #) and anything after it
  s = s.replace(/\s*(?:ext|extension|x|#)\s*[:.]?\s*\d+\s*$/i, '').trim();

  // Mapping letters (vanity numbers) to digits per standard phone keypad
  const letterMap = {
    A: '2', B: '2', C: '2',
    D: '3', E: '3', F: '3',
    G: '4', H: '4', I: '4',
    J: '5', K: '5', L: '5',
    M: '6', N: '6', O: '6',
    P: '7', Q: '7', R: '7', S: '7',
    T: '8', U: '8', V: '8',
    W: '9', X: '9', Y: '9', Z: '9'
  };

  // Allowed separator characters to ignore
  const separators = new Set([' ', '\u00A0', '-', '.', '(', ')', '/', '\u2009', '\t']);

  let cleaned = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    // Allow '+' only as the very first character
    if (i === 0 && ch === '+') {
      cleaned += '+';
      continue;
    }

    // Numeric characters from many scripts: use Number() to convert single-character numerals
    const num = Number(ch);
    if (!Number.isNaN(num) && Number.isFinite(num) && String(Math.trunc(num)) === String(num)) {
      // Number() will convert many unicode digits (e.g. Arabic-Indic) to a numeric value
      cleaned += String(num);
      continue;
    }

    // Letters -> keypad digits
    const up = ch.toUpperCase();
    if (up >= 'A' && up <= 'Z') {
      cleaned += letterMap[up] || '';
      continue;
    }

    // Ignore common separators
    if (separators.has(ch)) continue;

    // Any other character is treated as invalid
    return false;
  }

  // No multiple '+' signs
  if ((cleaned.match(/\+/g) || []).length > 1) return false;

  // Extract digits portion (keep original info about leading +)
  const hadPlus = cleaned.startsWith('+');
  let digits = hadPlus ? cleaned.slice(1) : cleaned;

  // Must contain only digits now
  if (!/^\d+$/.test(digits)) return false;

  // Handle common international dialing prefixes: 00 (ITU) and 011 (NANP)
  let nat = digits;
  let usedIntlPrefix = false;
  if (nat.startsWith('011')) {
    nat = nat.slice(3);
    usedIntlPrefix = true;
  } else if (nat.startsWith('00')) {
    nat = nat.slice(2);
    usedIntlPrefix = true;
  }

  // If the number is provided as an international form (+ or usedIntlPrefix),
  // the country code (first digit(s)) must not start with 0.
  if ((hadPlus || usedIntlPrefix) && nat.length > 0 && nat[0] === '0') return false;

  // Enforce plausible lengths:
  // - E.164 max is 15 digits. Be permissive on the lower bound to include short national numbers,
  //   but reject extremely short strings that are unlikely to be real phone numbers.
  const LEN_MIN = 4;  // allow short national numbers (but not too short)
  const LEN_MAX = 15; // E.164 maximum
  if (nat.length < LEN_MIN || nat.length > LEN_MAX) return false;

  // Passed all checks -> plausible international phone number
  return true;
}
