function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace (users may paste with extra spaces)
  const s = name.trim();
  if (s.length === 0) return false;

  // Reasonable length limit (count by Unicode code points)
  const length = [...s].length;
  if (length > 100) return false; // adjust max as desired

  // Allowed characters:
  // - \p{L} letters from any script
  // - \p{M} combining marks (for accents/diacritics)
  // - \p{Zs} space separators (to allow internal spaces)
  // - \p{Pd} punctuation dashes (hyphen, en-dash, etc.)
  // - ASCII apostrophe ' and RIGHT SINGLE QUOTATION MARK ’ (commonly used)
  const allowedRe = /^[\p{L}\p{M}\p{Zs}\p{Pd}'\u2019]+$/u;
  if (!allowedRe.test(s)) return false;

  // Must contain at least one letter
  if (!/\p{L}/u.test(s)) return false;

  // Disallow consecutive separator characters (spaces/dashes/apostrophes),
  // e.g. no "--", "  ", "''", " -", etc.
  if (/(?:[\p{Zs}\p{Pd}'\u2019]{2,})/u.test(s)) return false;

  // First character should be a letter (no leading punctuation)
  if (!/^\p{L}/u.test(s)) return false;

  // Last character should be a letter or a combining mark (not punctuation)
  if (!/[\p{L}\p{M}]$/u.test(s)) return false;

  return true;
}
