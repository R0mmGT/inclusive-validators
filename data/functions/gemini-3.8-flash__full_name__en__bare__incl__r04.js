function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Enforce reasonable length boundaries
  if (trimmed.length === 0 || trimmed.length > 150) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allowed characters:
  // - \p{L}: Unicode letters (covers Latin, Cyrillic, Hanzi, Kanji, Hangul, Arabic, Devanagari, etc.)
  // - \p{M}: Unicode combining marks/accents
  // - \s: Spaces
  // - Punctuation used in names: hyphens/dashes, apostrophes/modifier letters, middle dots, periods
  const namePattern = /^[\p{L}\p{M}\s.'’ʻʼ\-\u2010-\u2015\u00B7\u30FB]+$/u;

  return namePattern.test(trimmed);
}
