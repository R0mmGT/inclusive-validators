function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure reasonable length bounds for international given names
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allowed characters:
  // - \p{L}: Letters from any language/script
  // - \p{M}: Combining marks/accents
  // - \s: Spaces (e.g., compound names like "Mary Anne")
  // - Hyphens: - (U+002D), ‐ (U+2010), ‑ (U+2011), – (U+2013)
  // - Apostrophes/Okinas: ' (U+0027), ’ (U+2019), ʻ (U+02BB), ʼ (U+02BC)
  // - Periods: . (U+002E) for abbreviated initials (e.g., "J.")
  const validNamePattern = /^[\p{L}\p{M}\s\u002D\u2010\u2011\u2013\u0027\u2019\u02BB\u02BC\u002E]+$/u;

  return validNamePattern.test(trimmed);
}
