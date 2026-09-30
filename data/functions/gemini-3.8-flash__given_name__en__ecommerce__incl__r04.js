function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure reasonable length for a given name
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one letter from any language/script
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow Unicode letters (\p{L}), combining marks/diacritics (\p{M}),
  // dash punctuation (\p{Pd}), spaces, apostrophes (' and ’), and periods
  const validNamePattern = /^[\p{L}\p{M}\p{Pd}\s'’.]+$/u;

  return validNamePattern.test(trimmed);
}
