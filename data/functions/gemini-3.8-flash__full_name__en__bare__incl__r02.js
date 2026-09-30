function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Guard against empty strings or excessively long inputs
  if (trimmed.length < 1 || trimmed.length > 255) {
    return false;
  }

  // A valid name must contain at least one letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allowed characters:
  // - \p{L}: Unicode letters (covers all scripts: Latin, Cyrillic, Arabic, Han, Devanagari, etc.)
  // - \p{M}: Unicode combining marks/diacritics
  // - \s: Spaces
  // - Punctuation commonly found in names across cultures:
  //   hyphens/dashes (- and \u2010-\u2015), apostrophes/glottal stops (', ’, ʻ, ʼ),
  //   middle dots (·, ・), and periods (.)
  const namePattern = /^[\p{L}\p{M}\s.'’ʻʼ\u2010-\u2015\u00B7\u30FB-]+$/u;

  return namePattern.test(trimmed);
}
