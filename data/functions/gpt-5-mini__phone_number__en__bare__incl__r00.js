function validate(input) {
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (s.length === 0) return false;

  // Remove a trailing extension like "ext 123", "x123", "#123", "extension 123"
  // Accept Unicode digits in the extension token using \p{Nd} when available.
  try {
    s = s.replace(/\s*(?:ext(?:ension)?|ext\.|x|#)\s*[:.]?\s*\p{Nd}+\s*$/iu, '');
  } catch (e) {
    // If the runtime doesn't support \p{Nd}, use a simpler fallback to strip ascii-digit extensions
    s = s.replace(/\s*(?:ext(?:ension)?|ext\.|x|#)\s*[:.]?\s*\d+\s*$/i, '');
  }
  s = s.trim();
  if (s.length === 0) return false;

  // Normalize common international dialing prefixes 011... and 00... to '+'
  if (s.startsWith('011')) {
    s = '+' + s.slice(3).trim();
  } else if (s.startsWith('00')) {
    s = '+' + s.slice(2).trim();
  }

  // Parentheses must be balanced and not closed before opened
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth < 0) return false;
    }
  }
  if (depth !== 0) return false;

  // Only allow +, digits (including many Unicode digits), spaces, hyphens, dots, parentheses
  // Use Unicode digit class when available.
  try {
    if (!/^[+\p{Nd}\s\-\.\(\)]+$/u.test(s)) return false;
  } catch (e) {
    // Fallback for engines without \p support: allow ASCII digits only
    if (!/^[+\d\s\-\.\(\)]+$/.test(s)) return false;
  }

  // Plus sign rules: at most one and only at the start when present
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && s[0] !== '+') return false;

  // Convert common Unicode digit blocks to ASCII digits so we can validate lengths and leading zeros.
  function unicodeDigitsToAscii(str) {
    const ranges = [
      [0x30, 0x39],    // ASCII
      [0x0660, 0x0669],// Arabic-Indic
      [0x06F0, 0x06F9],// Extended Arabic-Indic
      [0x0966, 0x096F],// Devanagari
      [0x09E6, 0x09EF],// Bengali
      [0x0A66, 0x0A6F],// Gurmukhi
      [0x0AE6, 0x0AEF],// Gujarati
      [0x0B66, 0x0B6F],// Oriya
      [0x0BE6, 0x0BEF],// Tamil
      [0x0C66, 0x0C6F],// Telugu
      [0x0CE6, 0x0CEF],// Kannada
      [0x0D66, 0x0D6F],// Malayalam
      [0x0E50, 0x0E59],// Thai
      [0x0ED0, 0x0ED9],// Lao
      [0x1040, 0x1049],// Myanmar
      [0xFF10, 0xFF19] // Fullwidth
    ];
    let out = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.codePointAt(i);
      // If surrogate pair was consumed, skip the next code unit
      if (code > 0xFFFF) i++;
      let mapped = null;
      for (let j = 0; j < ranges.length; j++) {
        const [start, end] = ranges[j];
        if (code >= start && code <= end) {
          mapped = String(code - start);
          break;
        }
      }
      out += (mapped !== null) ? mapped : String.fromCodePoint(code);
    }
    return out;
  }

  const normalized = unicodeDigitsToAscii(s);

  // Remove allowed separators and parentheses; preserve leading plus for a moment
  const hasPlus = normalized[0] === '+';
  let core = normalized.replace(/[+\s\-\.\(\)]/g, '');
  // After stripping separators, core must be only ASCII digits
  if (!/^\d+$/.test(core)) return false;

  // E.164: maximum 15 digits. A sensible minimum is 3 digits (e.g., short national numbers are sometimes 2-3 digits, but 2 is rare).
  const digits = core.length;
  if (digits < 3 || digits > 15) return false;

  // If input used an international plus/prefix, the country code cannot start with 0
  if (hasPlus) {
    if (core[0] === '0') return false;
  }

  return true;
}
