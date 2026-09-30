function validate(input) {
  if (typeof input !== 'string') return false;
  // Normalize spaces and trim
  let s = input.replace(/\u00A0/g, ' ').trim();
  if (s.length === 0) return false;

  // Remove common extension patterns (e.g. "ext 123", "x123", "#123")
  s = s.replace(/\s*(?:[,;]|(?:ext(?:ension)?|x|xtn|#)\.?):?\s*\d+\s*$/i, '');

  // Quick reject for obviously invalid characters (we'll allow digits, letters for vanity numbers,
  // plus sign, spaces, hyphens, dots, parentheses)
  if (!/^[0-9A-Za-z+\s\-().\u00A0]+$/.test(s)) return false;

  // Balanced parentheses check
  const open = (s.match(/\(/g) || []).length;
  const close = (s.match(/\)/g) || []).length;
  if (open !== close) return false;

  // Convert any Unicode digits (e.g. Arabic-Indic) to ASCII digits
  try {
    s = s.replace(/\p{Nd}/gu, ch => String(Number(ch)));
  } catch (e) {
    // If Unicode property escapes not supported, fallback to a few common ranges
    const unicodeDigitMap = [
      [0x0660, 0x0669], // Arabic-Indic
      [0x06F0, 0x06F9], // Extended Arabic-Indic
      [0x0966, 0x096F], // Devanagari
      [0xFF10, 0xFF19]  // Fullwidth
    ];
    s = s.split('').map(ch => {
      const code = ch.charCodeAt(0);
      for (const [start, end] of unicodeDigitMap) {
        if (code >= start && code <= end) return String(code - start);
      }
      return ch;
    }).join('');
  }

  // Map vanity letters to digits (telephone keypad)
  const map = {
    A: '2', B: '2', C: '2',
    D: '3', E: '3', F: '3',
    G: '4', H: '4', I: '4',
    J: '5', K: '5', L: '5',
    M: '6', N: '6', O: '6',
    P: '7', Q: '7', R: '7', S: '7',
    T: '8', U: '8', V: '8',
    W: '9', X: '9', Y: '9', Z: '9'
  };
  s = s.replace(/[A-Za-z]/g, ch => map[ch.toUpperCase()] || '');

  // After conversions, ensure remaining characters are digits, plus sign, or separators
  if (!/^[0-9+\s\-().]+$/.test(s)) return false;

  // Remove separators (spaces, hyphens, dots, parentheses)
  let cleaned = s.replace(/[\s\-.()]+/g, '');

  if (cleaned.length === 0) return false;

  // Handle common international dialing prefixes:
  // +, 00 (many countries), 011 (North American international prefix)
  let digits = cleaned;
  if (digits.startsWith('+')) {
    digits = digits.slice(1);
  } else if (digits.startsWith('00')) {
    digits = digits.slice(2);
  } else if (digits.startsWith('011')) {
    digits = digits.slice(3);
  }

  // Must be digits only now
  if (!/^\d+$/.test(digits)) return false;

  // Validate length:
  // ITU-T E.164 maximum is 15 digits. Local numbers vary; for broad worldwide coverage
  // we require between 4 and 15 digits (this allows most national and international numbers
  // while excluding extremely short incidental numbers).
  if (digits.length < 4 || digits.length > 15) return false;

  return true;
}
