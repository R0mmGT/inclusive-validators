function validate(input) {
  // Basic type/trim
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (s.length === 0) return false;

  // Normalize common Unicode digits (many common numeral blocks)
  (function replaceUnicodeDigits() {
    const blocks = [
      { from: 0x0660, to: 0x0669, base: 0x0660 }, // Arabic-Indic
      { from: 0x06F0, to: 0x06F9, base: 0x06F0 }, // Extended Arabic-Indic (Persian)
      { from: 0x0966, to: 0x096F, base: 0x0966 }, // Devanagari
      { from: 0x09E6, to: 0x09EF, base: 0x09E6 }, // Bengali
      { from: 0x0A66, to: 0x0A6F, base: 0x0A66 }, // Gurmukhi
      { from: 0x0AE6, to: 0x0AEF, base: 0x0AE6 }, // Gujarati
      { from: 0x0B66, to: 0x0B6F, base: 0x0B66 }, // Oriya
      { from: 0x0BE6, to: 0x0BEF, base: 0x0BE6 }, // Tamil
      { from: 0x0C66, to: 0x0C6F, base: 0x0C66 }, // Telugu
      { from: 0x0CE6, to: 0x0CEF, base: 0x0CE6 }, // Kannada
      { from: 0x0D66, to: 0x0D6F, base: 0x0D66 }, // Malayalam
      { from: 0x0E50, to: 0x0E59, base: 0x0E50 }, // Thai
      { from: 0x0ED0, to: 0x0ED9, base: 0x0ED0 }, // Lao
      { from: 0x17E0, to: 0x17E9, base: 0x17E0 }, // Khmer
      { from: 0x1040, to: 0x1049, base: 0x1040 }, // Myanmar
      { from: 0xFF10, to: 0xFF19, base: 0xFF10 }  // Fullwidth 0-9
    ];
    // Build regex for these ranges
    const ranges = blocks.map(b => `\\u{${b.from.toString(16)}}-\\u{${b.to.toString(16)}}`).join('');
    const re = new RegExp('[' + ranges + ']', 'gu');
    s = s.replace(re, ch => {
      const code = ch.codePointAt(0);
      for (let b of blocks) {
        if (code >= b.from && code <= b.to) {
          return String(code - b.base);
        }
      }
      return ch;
    });
  })();

  // Remove and ignore a trailing extension (ext, extension, x, #)
  s = s.replace(/\s*(?:ext(?:ension)?|x|#)\.?:?\s*\d+\s*$/i, '').trim();

  if (s.length === 0) return false;

  // Parentheses must be balanced
  const openParens = (s.match(/\(/g) || []).length;
  const closeParens = (s.match(/\)/g) || []).length;
  if (openParens !== closeParens) return false;

  // Allow vanity numbers: map A-Z to digits (standard phone keypad)
  s = s.replace(/[A-Za-z]/g, ch => {
    const c = ch.toUpperCase();
    if ('ABC'.includes(c)) return '2';
    if ('DEF'.includes(c)) return '3';
    if ('GHI'.includes(c)) return '4';
    if ('JKL'.includes(c)) return '5';
    if ('MNO'.includes(c)) return '6';
    if ('PQRS'.includes(c)) return '7';
    if ('TUV'.includes(c)) return '8';
    if ('WXYZ'.includes(c)) return '9';
    return '';
  });

  // Disallow characters other than digits, plus and common separators at this stage
  // (We'll strip separators next.)
  if (/[^0-9+\s().\-··.\/]/u.test(s)) {
    // Allow multi-byte middle dot '·' and slash; above regex filters most other unexpected characters.
    // If there are other unexpected characters, reject.
    return false;
  }

  // Ensure at most one plus and if present it must be at the start (international format)
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && s[0] !== '+') return false;

  // Remove common separators (spaces, hyphens, dots, middle dot, parentheses, slashes)
  const normalized = s.replace(/[\s.\-·()\/]/g, '');

  if (normalized.length === 0) return false;

  // Now handle international prefixes: '+' or leading 00 or 011 (common international prefixes)
  let core = normalized;
  if (core[0] === '+') {
    core = core.slice(1);
  } else if (core.startsWith('00')) {
    core = core.slice(2);
  } else if (core.startsWith('011')) {
    core = core.slice(3);
  }

  // After removing prefix, should be digits only
  if (!/^\d+$/.test(core)) return false;

  // Count digits. Use E.164 max length 15 (international standard).
  // For a registration number we require a reasonable minimum (e.g. 7 digits),
  // which covers most national numbers while excluding too-short short codes.
  const digitCount = core.length;
  if (digitCount < 7 || digitCount > 15) return false;

  return true;
}
