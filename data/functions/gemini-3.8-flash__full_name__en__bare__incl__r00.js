function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Names should have a reasonable length (allowing short mononyms up to long compound names)
  if (trimmed.length === 0 || trimmed.length > 250) {
    return false;
  }

  // Must contain at least one Unicode letter (rejects strings consisting solely of punctuation/whitespace)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allowed characters:
  // - \p{L}: Any Unicode letter (covers Latin, Cyrillic, Arabic, Devanagari, CJK, etc.)
  // - \p{M}: Combining marks, diacritics, and vowel signs
  // - \p{Pd}: Punctuation dashes and hyphens (e.g., Jean-Luc)
  // - '’ʼ‘ʻ: Typographic apostrophes and glottal stop characters (e.g., O'Connor, Hawaiʻi)
  // - \.: Periods for abbreviations/initials (e.g., J. R. R. Tolkien)
  // - \u00B7: Middle dot (used in Catalan, Chinese/Japanese transliterations)
  // - ,: Commas (e.g., "Last, First" format)
  // - \s: Whitespace separating name components
  const validNamePattern = /^[\p{L}\p{M}\p{Pd}'’ʼ‘ʻ\.\u00B7,\s]+$/u;

  return validNamePattern.test(trimmed);
}
