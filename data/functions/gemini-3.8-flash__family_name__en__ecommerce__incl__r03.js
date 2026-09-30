function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure reasonable length bounds for storage and display
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter (supports any script/language)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow only Unicode letters, marks/diacritics, spaces, hyphens, apostrophes, and dots
  const validNamePattern = /^[\p{L}\p{M}'’.\-\s]+$/u;

  return validNamePattern.test(trimmed);
}
