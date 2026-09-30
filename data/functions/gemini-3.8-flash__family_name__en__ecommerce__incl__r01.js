function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure reasonable length bounds (1 to 100 characters)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow Unicode letters, combining marks (accents/diacritics), spaces,
  // hyphens, periods, and various apostrophe/quote characters used globally
  const validNamePattern = /^[\p{L}\p{M}\s'\u2018\u2019\u02BB\u02BC\.\-\u2010-\u2015]+$/u;

  return validNamePattern.test(trimmed);
}
