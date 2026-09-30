function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 100) return false;

  // Allowed characters:
  // - Unicode letters (\p{L}) and marks (\p{M})
  // - Any dash/punctuation from the Unicode Pd category (\p{Pd})
  // - ASCII apostrophe ' and right single quote ’ (U+2019)
  // - Middle dots · (U+00B7) and ・ (U+30FB)
  // - Period .
  // - Any space separator (\p{Zs})
  const allowedPattern = "^[\\p{L}\\p{M}\\p{Pd}'\\u2019\\u00B7\\u30FB\\.\\p{Zs}]+$";
  const allowedRe = new RegExp(allowedPattern, "u");
  if (!allowedRe.test(s)) return false;

  // Must contain at least one letter and no digits
  if (!/[\p{L}]/u.test(s)) return false;
  if (/\p{N}/u.test(s)) return false;

  // Disallow two or more punctuation characters in a row (punctuation as defined above)
  const punctClass = "[\\p{Pd}'\\u2019\\u00B7\\u30FB\\.]";
  const consecutivePunctRe = new RegExp(punctClass + "{2,}", "u");
  if (consecutivePunctRe.test(s)) return false;

  // Split on any Unicode space separator and validate each token/part
  const tokens = s.split(/\p{Zs}+/u);
  if (tokens.length === 0) return false;
  for (const t of tokens) {
    if (t.length === 0) return false;
    if (t.length > 50) return false; // guard against unreasonable single token length

    // Each token must start with a letter/mark (covers ideographs, scripts without spaces, etc.)
    if (!/^[\p{L}\p{M}]/u.test(t)) return false;

    // Each token must end with a letter/mark or a period (to allow initials like "J." or "R.R.")
    if (!/[\p{L}\p{M}\.]$/u.test(t)) return false;

    // Token must contain at least one letter
    if (!/[\p{L}]/u.test(t)) return false;

    // Already banned consecutive punctuation globally; additionally ban punctuation immediately adjacent to start (already covered)
    // Ensure there are no isolated punctuation-only tokens
    if (/^[\p{Pd}'\u2019\u00B7\u30FB\.]+$/u.test(t)) return false;
  }

  return true;
}
