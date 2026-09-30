function validate(input) {
  // Basic type/emptiness check
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Strip common extension suffixes (ext, extension, x, #) if present
  // Accept Unicode digits in the extension as well
  const extRegex = /\b(?:ext|extension|x|#)\s*[:.]?\s*(\p{Nd}+)\b$/iu;
  const extMatch = s.match(extRegex);
  if (extMatch) {
    s = s.slice(0, extMatch.index).trim();
    if (!s) return false;
  }

  // Allow characters commonly used in phone formatting:
  // leading plus, Unicode digits, spaces, parentheses, hyphen, dot, slash
  // Reject if plus appears anywhere except at the very start
  if ((s.match(/\+/g) || []).length > 1) return false;
  if (s.includes('+') && s[0] !== '+') return false;

  // Now ensure only allowed characters are present
  if (!/^[+\p{Nd}\s().\-\/]+$/u.test(s)) return false;

  // Parentheses must be balanced
  const opens = (s.match(/\(/g) || []).length;
  const closes = (s.match(/\)/g) || []).length;
  if (opens !== closes) return false;

  // Count Unicode digits. E.164 allows up to 15 digits; many valid national numbers
  // are at least ~7 digits. This range is a practical compromise for global validation.
  const digits = s.match(/\p{Nd}/gu) || [];
  const dcount = digits.length;
  if (dcount < 7 || dcount > 15) return false;

  // Rejection of obviously nonsense forms (e.g. only separators)
  if (!/\p{Nd}/u.test(s)) return false;

  return true;
}
