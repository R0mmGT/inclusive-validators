function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Basic length constraints
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // A full name must consist of at least two parts (e.g., first and last name)
  const parts = trimmed.split(/\s+/);
  if (parts.length < 2) {
    return false;
  }

  // Validates each word: supports Unicode letters, hyphens, apostrophes, and optional periods (for initials)
  const namePartRegex = /^\p{L}+(?:['.-]\p{L}+)*\.?$/u;

  return parts.every(part => namePartRegex.test(part));
}
