function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  name = name.trim();
  if (name.length === 0) return false;

  // Limit the length (in Unicode code points) to avoid crazy input sizes
  const length = [...name].length;
  if (length > 100) return false;

  // Allowed characters:
  // - Unicode letters (\p{L}) and combining marks (\p{M})
  // - Space (regular ASCII space)
  // - A small, carefully chosen set of punctuation commonly used in names:
  //   apostrophes (straight and typographic), modifier apostrophe,
  //   hyphen/minus and various dashes, middle dot, and period.
  // This intentionally excludes digits and most symbols like @ # $ % etc.
  const allowed = /^[\p{L}\p{M} \u00B7'’\u02BC\-\u2010-\u2014\.]+$/u;
  if (!allowed.test(name)) return false;

  // Must start and end with a letter (not punctuation or space)
  if (!(/^\p{L}.*\p{L}$/u.test(name))) return false;

  // Disallow multiple consecutive spaces
  if (/ {2,}/.test(name)) return false;

  // Disallow multiple consecutive punctuation characters from our set
  // (e.g. "--", "''", "..", ".-", etc.)
  if (/['’\u02BC\-\u2010-\u2014\.\u00B7]{2,}/u.test(name)) return false;

  // Ensure there's at least one letter (redundant with start/end checks but explicit)
  if (!(/\p{L}/u.test(name))) return false;

  // Passed all checks -> likely a valid personal full name for international input
  return true;
}
