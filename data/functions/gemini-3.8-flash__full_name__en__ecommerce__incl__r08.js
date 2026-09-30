function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Enforce reasonable length limits for a person's name
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Must contain at least one letter across any language/script
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow:
  // - \p{L}: Any letter in any script (including modifier letters like ʻOkina)
  // - \p{M}: Combining diacritics/accents/vowel signs (used in Arabic, Devanagari, Thai, etc.)
  // - \p{Pd}: Any hyphen/dash character
  // - \s: Whitespace characters (including non-breaking spaces)
  // - ' and ’: Apostrophes (ASCII and typographic)
  // - .: Periods/dots (for initials, abbreviations, honorifics)
  // - \u00B7 and \u30FB: Middle dots (Catalan l·l, Japanese interpunct)
  const nameRegex = /^[\p{L}\p{M}\p{Pd}\s'’.\u00B7\u30FB]+$/u;

  return nameRegex.test(trimmed);
}
