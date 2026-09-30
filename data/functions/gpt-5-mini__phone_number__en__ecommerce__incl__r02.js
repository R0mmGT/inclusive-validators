function validate(input) {
  // Basic type and trim
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Feature-detect Unicode property escapes (for Unicode digits)
  let supportsUnicodeProps = true;
  try { new RegExp('\\p{Nd}', 'u'); } catch (e) { supportsUnicodeProps = false; }

  const DIGIT = supportsUnicodeProps ? '\\p{Nd}' : '\\d';
  const UFLAG = supportsUnicodeProps ? 'u' : '';

  // Remove common extension suffixes (ext, extension, x, #) at the end
  const extRe = new RegExp('(?:\\s|^)(?:ext(?:ension)?|x|#)\\.?\\s*' + DIGIT + '+$' , UFLAG + 'i');
  s = s.replace(extRe, '').trim();

  if (!s) return false;

  // Disallow any characters except digits, spaces, parentheses, plus, hyphen and dot
  const invalidCharRe = new RegExp('[^' + DIGIT + '\\s()+\\-\\.]', UFLAG);
  if (invalidCharRe.test(s)) return false;

  // Plus sign rules: at most one, and if present must be at the start
  const plusMatches = s.match(/\+/g) || [];
  if (plusMatches.length > 1) return false;
  if (plusMatches.length === 1 && s[0] !== '+') return false;

  // Parentheses rules: must be balanced, not nested, at most one pair
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  if (openCount > 1 || closeCount > 1) return false;
  if (openCount === 1) {
    const m = s.match(/\(([^)]*)\)/);
    if (!m) return false;
    const inside = m[1];
    // inside parentheses allow only digits, spaces, hyphens or dots
    const invalidInsideRe = new RegExp('[^' + DIGIT + '\\s\\-\\.]', UFLAG);
    if (invalidInsideRe.test(inside)) return false;
    // require at least 1 digit and limit to a reasonable length (avoid parentheses containing whole number)
    const digitsInside = (inside.match(new RegExp(DIGIT, 'g' + (supportsUnicodeProps ? 'u' : ''))) || []).length;
    if (digitsInside < 1 || digitsInside > 6) return false;
  }

  // Count digits in the remaining string
  const digitMatches = s.match(new RegExp(DIGIT, 'g' + (supportsUnicodeProps ? 'u' : '')));
  const digitCount = (digitMatches || []).length;

  // E.164 allows up to 15 digits; require a practical minimum (commonly 7)
  if (digitCount < 7 || digitCount > 15) return false;

  return true;
}
