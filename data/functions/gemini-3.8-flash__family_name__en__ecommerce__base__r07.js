function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure appropriate length (between 1 and 100 characters)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Allows international letters, hyphens, apostrophes, spaces, and periods.
  // Must start with a letter and end with a letter or period (e.g., St.).
  const nameRegex = /^[\p{L}](?:[\p{L}'’.\s-]*[\p{L}.])?$/u;

  return nameRegex.test(trimmed);
}
