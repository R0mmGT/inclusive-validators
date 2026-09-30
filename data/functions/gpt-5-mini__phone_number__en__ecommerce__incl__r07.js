function validate(input) {
  // Basic, library-free international phone number validator.
  // Accepts numbers in E.164-like forms and common formatted variants:
  // - optional leading '+' or international '00' prefix
  // - spaces, dots, hyphens, slashes and one pair of parentheses are allowed as separators
  // - trailing extensions like "ext 123", "x123" or "#123" are allowed and ignored
  // - uses Unicode decimal digits so many digit scripts are supported
  //
  // This function errs on the side of permissiveness for global coverage while
  // enforcing a sensible digit-length (7..15) and rejecting obviously invalid strings.
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Strip a trailing extension (ext, x, extension, #)
  s = s.replace(/\s*(?:ext|extension|x|#)\s*[:.]?\s*\d+$/i, '');

  // Parentheses checks: must be balanced and at most one pair,
  // and the inside of parentheses should contain only digits and separators.
  const opens = (s.match(/\(/g) || []).length;
  const closes = (s.match(/\)/g) || []).length;
  if (opens !== closes) return false;
  if (opens > 1) return false;
  if (opens === 1) {
    const inside = s.slice(s.indexOf('(') + 1, s.indexOf(')'));
    if (!/^[\p{Nd}\s\-\.\u00A0\u202F]*$/u.test(inside)) return false;
  }

  // Remove common separators (space, hyphen, dot, slash, various NBSPs, parentheses)
  const stripped = s.replace(/[\s\-\.\(\)\/\u00A0\u202F]+/g, '');

  // Remove international prefix if present
  let digits = stripped;
  if (digits.startsWith('+')) {
    digits = digits.slice(1);
  } else if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  // After normalization, must be only Unicode decimal digits
  if (!/^\p{Nd}+$/u.test(digits)) return false;

  // Enforce reasonable length: 7..15 digits covers most national and international numbers
  if (digits.length < 7 || digits.length > 15) return false;

  // Reject trivial repeated-digit numbers like "1111111"
  if (/^(\p{Nd})\1+$/u.test(digits)) return false;

  return true;
}
