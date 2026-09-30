function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  name = name.trim();

  // Reject empty or excessively long names
  if (name.length === 0 || name.length > 100) return false;

  // Allowed character classes:
  // \p{L} = any kind of letter from any language
  // \p{M} = combining marks (accents, diacritics)
  // Additionally allow a small set of separators commonly used in surnames:
  //   - ASCII hyphen-minus (-)
  //   - ASCII apostrophe (')
  //   - right single quotation mark (’ U+2019)
  //   - middle dot (· U+00B7)
  //   - space
  //
  // We do NOT allow digits or most punctuation/symbols.
  const allowedRe = /^[\p{L}\p{M}\u00B7'’\- ]+$/u;
  if (!allowedRe.test(name)) return false;

  // Must contain at least one letter
  if (!/\p{L}/u.test(name)) return false;

  // Disallow leading or trailing separator characters (space, hyphen, apostrophe, middle dot)
  if (/^[ \-'\u2019\u00B7]/.test(name) || /[ \-'\u2019\u00B7]$/.test(name)) return false;

  // Disallow two or more separators in a row (e.g., "--", "  ", "''", "- '")
  if (/[ \-'\u2019\u00B7]{2,}/.test(name)) return false;

  // Disallow separators adjacent to spaces (e.g., "Smith -Jones" or "Smith- Jones")
  // Spaces are allowed between words (e.g., "de la Cruz") but not next to hyphen/apostrophe/middle dot.
  if (/(?:\s[-'’\u00B7]|[-'’\u00B7]\s)/.test(name)) return false;

  // All checks passed: likely a valid surname across many languages/cultures
  return true;
}
