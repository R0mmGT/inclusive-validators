function validate(name) {
  // Basic type and length checks
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length < 2 || s.length > 100) return false;

  // Split into name parts (ignore multiple spaces)
  const parts = s.split(/\s+/);
  if (parts.length < 2) return false; // require at least two parts (first + last)

  // Regexes using Unicode property escapes (u flag) to allow international letters
  const initialRe = /^[\p{L}]\.?$/u; // single-letter initial, optional dot (e.g. "J" or "J.")
  const nameRe = /^[\p{L}][\p{L}\p{M}'\u2019-]*[\p{L}\p{M}]$/u;
  // Disallow consecutive special characters like -- or '' or -' etc.
  const consecutiveSpecials = /[-'\u2019]{2,}/;
  // Disallow any digits or other disallowed punctuation anywhere
  const forbiddenChars = /[0-9@#\$%\^&\*\(\)_=\+\[\]\{\}\\|;:"<>,\/\?~`]/;

  for (const part of parts) {
    if (part.length === 0) return false;

    // No forbidden characters
    if (forbiddenChars.test(part)) return false;

    // Periods are only allowed for single-letter initials (e.g. "J."), not within multi-letter parts
    if (part.includes('.') && !initialRe.test(part)) return false;

    // Accept initials
    if (initialRe.test(part)) continue;

    // Otherwise, must match name pattern: starts and ends with a letter, interior may have letters, marks, apostrophes or hyphens
    if (!nameRe.test(part)) return false;

    // No consecutive apostrophes/hyphens or mixes thereof
    if (consecutiveSpecials.test(part)) return false;
  }

  return true;
}
