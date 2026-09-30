function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure reasonable length (e.g., 1 to 100 characters)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permitted characters across world cultures:
  // - \p{L}: any Unicode letter (Latin, Cyrillic, Arabic, CJK, Devanagari, etc.)
  // - \p{M}: Unicode combining marks/accents/vowel signs
  // - \s: whitespace (spaces between compound names)
  // - ' ’ ʼ: apostrophes and modifiers (e.g., O'Connor, D’Angelo, ʻOkina)
  // - . - ·: periods (abbreviations), hyphens (compound names), and middle dots (e.g., Catalan)
  const validNamePattern = /^[\p{L}\p{M}\s'’ʼ.\-·]+$/u;

  return validNamePattern.test(trimmed);
}
