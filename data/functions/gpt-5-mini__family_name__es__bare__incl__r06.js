function validate(name) {
  // Validates a person surname across scripts/cultures using Unicode-aware rules.
  // Returns true for likely valid surnames, false otherwise.
  if (typeof name !== 'string') return false;

  const s = name.trim();

  // Basic length limits (sensible, but adjustable)
  if (s.length === 0 || s.length > 100) return false;

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(s)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L}) and combining marks (\p{M})
  // - Apostrophes: ' and ’
  // - Hyphen/minus and dashes: -, en dash (U+2013), em dash (U+2014)
  // - Middle dot (U+00B7)
  // - Period (.)
  // - Space (ASCII space only; other whitespace is rejected)
  const overallAllowed = /^[\p{L}\p{M}'’\-\u2013\u2014\u00B7\. ]+$/u;
  if (!overallAllowed.test(s)) return false;

  // Overall must start with a letter and end with a letter (some tokens may end with a period like "St.", but the whole surname should end with a letter)
  if (!/^\p{L}/u.test(s)) return false;
  if (!/\p{L}\p{M}*$/u.test(s)) return false;

  // No consecutive ASCII spaces
  if (s.includes('  ')) return false;

  // No sequences of two or more punctuation characters from the allowed punctuation set
  const punctSeq = /['’\-\u2013\u2014\.·]{2,}/u;
  if (punctSeq.test(s)) return false;

  // Split into space-separated tokens (e.g. "van", "der", "St.", "Nguyen")
  const tokens = s.split(' ');
  for (const t of tokens) {
    // Every token must start with a letter
    if (!/^\p{L}/u.test(t)) return false;

    // Token may contain only the allowed non-space characters
    const tokenAllowed = /^[\p{L}\p{M}'’\-\u2013\u2014\u00B7\.]+$/u;
    if (!tokenAllowed.test(t)) return false;

    // Token must not contain two punctuation characters in a row
    if (punctSeq.test(t)) return false;

    // Token should end with a letter or a period (allow abbreviations like "St.")
    if (!/[\p{L}\p{M}\.]$/u.test(t)) return false;

    // Prevent tokens that are just a single punctuation or just a dot
    if (!/\p{L}/u.test(t)) return false;
  }

  return true;
}
