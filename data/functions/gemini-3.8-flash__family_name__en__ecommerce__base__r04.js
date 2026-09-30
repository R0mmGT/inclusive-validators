function validate(lastName) {
  if (typeof lastName !== 'string') {
    return false;
  }

  const trimmed = lastName.trim();

  // Validate reasonable length constraints (1 to 100 characters)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Allows international letters (Unicode \p{L}), spaces, hyphens, and apostrophes.
  // Must start and end with a letter (or consist of a single letter).
  const lastNameRegex = /^[\p{L}](?:[\p{L}\s'’-]*[\p{L}])?$/u;

  return lastNameRegex.test(trimmed);
}
