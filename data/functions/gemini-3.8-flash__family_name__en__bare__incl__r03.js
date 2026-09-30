function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Enforce reasonable length limits for a family name
  if (name.length < 1 || name.length > 100) {
    return false;
  }

  // Matches names using Unicode properties:
  // - \p{L}: any kind of letter from any language
  // - \p{M}: combining marks (accents, diacritics, vowel signs in scripts like Devanagari, Arabic, etc.)
  // Allows valid delimiters (hyphen, space, ASCII and typographic apostrophes) between letters.
  const nameRegex = /^[\p{L}\p{M}]+(?:[-\s'’][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(name);
}
