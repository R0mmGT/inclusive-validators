function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Check reasonable length constraints for a given name
  if (name.length === 0 || name.length > 100) {
    return false;
  }

  // Regex breakdown:
  // \p{L} matches any Unicode letter across any script/language.
  // \p{M} matches Unicode combining marks (accents, diacritics, vowel signs).
  // ['’ʼ\s.-] allows legitimate internal separators (hyphens, spaces, apostrophes, dots).
  // \.? allows an optional trailing dot for initials (e.g., "A." or "A.J.").
  const nameRegex = /^[\p{L}\p{M}]+(?:['’ʼ\s.-][\p{L}\p{M}]+)*\.?$/u;

  return nameRegex.test(name);
}
