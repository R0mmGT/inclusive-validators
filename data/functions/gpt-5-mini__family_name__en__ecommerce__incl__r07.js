function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace characters (including non-breaking spaces)
  const s = name.trim();
  if (s.length === 0) return false;

  // Reasonable length limit to avoid abuse; allow very long names up to 100 characters
  if (s.length > 100) return false;

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(s)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L})
  // - Unicode combining marks (\p{M}) so accented letters are OK
  // - Space separators (\p{Zs}) for multi-part names
  // - Any dash character (\p{Pd}) to allow hyphens and similar
  // - A set of apostrophe-like characters and the middle dot (used in some names)
  const allowedPattern = /^[\p{L}\p{M}\p{Zs}\p{Pd}'\u2018\u2019\u02BC\u02BB\u00B7]+$/u;
  if (!allowedPattern.test(s)) return false;

  // Disallow starting or ending with a separator/punctuation
  const edgeBad = /^[\p{Zs}\p{Pd}'\u2018\u2019\u02BC\u02BB\u00B7]|[\p{Zs}\p{Pd}'\u2018\u2019\u02BC\u02BB\u00B7]$/u;
  if (edgeBad.test(s)) return false;

  // Disallow two or more separator/punctuation characters in a row
  // This prevents sequences like "--", " -", "''", "  " (multiple spaces), " '", etc.
  const consecutiveSeparators = /(?:[\p{Zs}\p{Pd}'\u2018\u2019\u02BC\u02BB\u00B7]){2,}/u;
  if (consecutiveSeparators.test(s)) return false;

  // If all checks pass, consider it a valid family name
  return true;
}
