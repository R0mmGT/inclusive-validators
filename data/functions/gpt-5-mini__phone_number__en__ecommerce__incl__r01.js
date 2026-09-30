function validate(input) {
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Normalize some fullwidth plus chars to ASCII plus
  s = s.replace(/\uFF0B/g, '+');

  // Strip common extension markers like "ext", "x", "#" followed by digits
  s = s.replace(/\s*(?:ext\.?|extension|#|x)\s*\+?\d+$/i, '');

  // Remove common grouping/separator characters (spaces, dashes, dots, parentheses, slashes, various non-breaking spaces)
  s = s.replace(/[\s.\-()\/\u00A0\u202F\u2007\u2009]+/g, '');

  if (!s) return false;

  // Handle international prefixes: leading + or leading 00 (common international access code)
  let body = s;
  if (body.startsWith('+')) {
    body = body.slice(1);
  } else if (body.startsWith('00')) {
    body = body.slice(2);
  }

  // Convert any Unicode decimal digits to ASCII digits and reject other characters
  const unicodeDigit = /\p{Nd}/u;
  let digits = '';
  for (const ch of body) {
    if (unicodeDigit.test(ch)) {
      // Number(ch) converts Unicode digits to their numeric value, then to string
      digits += String(Number(ch));
    } else if (ch >= '0' && ch <= '9') {
      digits += ch;
    } else {
      // contains an unexpected character (letters, symbols, etc.)
      return false;
    }
  }

  // Basic length checks: realistic phone numbers (national significant number) are typically between 7 and 15 digits.
  // E.164 allows up to 15 digits. We reject very short numbers (like emergency short codes) for registration.
  if (digits.length < 7 || digits.length > 15) return false;

  // Reject trivially invalid numbers like all-the-same-digit sequences
  if (/^(\d)\1+$/.test(digits)) return false;

  return true;
}
