function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Check acceptable length bounds for international names
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allowed characters:
  // - \p{L}: Letters across all scripts (Latin, Hanzi, Arabic, Cyrillic, Devanagari, etc.)
  // - \p{M}: Diacritics and combining marks (accents, vowel markers)
  // - \s: Whitespace separating name parts
  // - Common name punctuation: hyphens (- ‐ –), apostrophes (' ’ ʻ ʼ), periods (.), middle dots (·)
  const namePattern = /^[\p{L}\p{M}\s'\-\.\u2010\u2013\u2019\u02BB\u02BC\u00B7]+$/u;

  return namePattern.test(trimmed);
}
