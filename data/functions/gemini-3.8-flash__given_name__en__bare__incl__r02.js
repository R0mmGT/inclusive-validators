function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Check reasonable length constraints (e.g., between 1 and 100 characters)
  if (name.length === 0 || name.length > 100) {
    return false;
  }

  // Regular expression using Unicode property escapes:
  // \p{L} matches any Unicode letter across all scripts (Latin, Cyrillic, Arabic, CJK, Devanagari, etc.)
  // \p{M} matches Unicode combining marks/accents
  // Allows valid internal delimiters: standard space, hyphens (-), apostrophes (' and ’), and middle dots (· and ・)
  // Ensures names start and end with a letter/mark and prevents consecutive punctuation
  const namePattern = /^[\p{L}\p{M}]+(?:['’\- ·・][\p{L}\p{M}]+)*$/u;

  return namePattern.test(name);
}
