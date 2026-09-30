function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Enforce realistic length boundaries (1 to 100 characters)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allowed characters:
  // - \p{L}: Any Unicode letter (covers Latin, Han, Cyrillic, Arabic, Devanagari, etc.)
  // - \p{M}: Combining marks and accents
  // - Common name punctuation: spaces, hyphens/dashes, apostrophes, and periods
  const validNamePattern = /^[\p{L}\p{M}\s'\u2019\u02BC\.\-\u2010-\u2015]+$/u;

  return validNamePattern.test(trimmed);
}
