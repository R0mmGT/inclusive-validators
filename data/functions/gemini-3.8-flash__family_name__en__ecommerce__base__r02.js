function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Check length constraints (1 to 100 characters)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Allows international letters (Unicode), diacritics, spaces, hyphens, apostrophes, and periods.
  // Requires starting with a letter or apostrophe, ending with a letter or period (for abbreviations),
  // and allows single-character names.
  const regex = /^[\p{L}\p{M}'’](?:[\p{L}\p{M}\s'’\-.]{0,98}[\p{L}\p{M}.])?$/u;

  return regex.test(trimmed);
}
