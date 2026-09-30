function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim common surrounding whitespace (including non-breaking space)
  name = name.replace(/^[\s\u00A0]+|[\s\u00A0]+$/g, '');
  if (name.length === 0) return false;

  // Reasonable length limits for a full name (adjustable)
  if (name.length > 100) return false;

  // This regex uses Unicode property escapes (requires modern JS environments).
  // Rules applied:
  // - Allowed characters: Unicode letters (\p{L}), marks (\p{M}), numbers (\p{N}),
  //   space and NBSP, common apostrophes, a range of hyphen/dash characters,
  //   middle dot, and period.
  // - Must start and end with a letter/mark/number (no leading/trailing punctuation).
  // - No two separator characters in a row (prevents runs like "--", "  ", "''").
  // - Must contain at least one Unicode letter (prevents purely numeric names).
  // - Must not be only digits and separators.
  const NAME_REGEX = /^(?=.{1,100}$)(?!.*[ \u00A0'\u2019\u00B7\.\u2010\u2011\u2012\u2013\u2014]{2})(?!^[\d \u00A0'\u2019\u00B7\.\u2010\u2011\u2012\u2013\u2014]+$)(?=.*\p{L})[\p{L}\p{M}\p{N}](?:[\p{L}\p{M}\p{N} \u00A0'\u2019\u00B7\.\u2010\u2011\u2012\u2013\u2014\-])*[\p{L}\p{M}\p{N}]$/u;

  return NAME_REGEX.test(name);
}
