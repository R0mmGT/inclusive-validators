function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Reasonable length limits for a full name
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allows:
  // - \p{L}: Any Unicode letter (covers Latin, Han, Cyrillic, Arabic, Devanagari, etc.)
  // - \p{M}: Any Unicode mark (combining accents, vowel marks, diacritics)
  // - \s: Spaces
  // - Standard and typographical apostrophes (' ’ ‘ ʼ)
  // - Hyphens and dashes (- ‐)
  // - Period/dot (.) for abbreviations and initials
  // - Middle dot (· ・) used in scripts like Catalan, Chinese, Japanese
  const validNameRegex = /^[\p{L}\p{M}\s'\u2018\u2019\u02BC\-\u2010.\u00B7\u30FB]+$/u;

  return validNameRegex.test(trimmed);
}
