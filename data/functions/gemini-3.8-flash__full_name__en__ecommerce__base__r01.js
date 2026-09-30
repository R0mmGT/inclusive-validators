function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Enforce a reasonable length for a full name (e.g., 3 to 100 characters)
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Requires at least two words (first and last name)
  // Supports international Unicode letters, hyphens, apostrophes, and periods (e.g., for initials)
  const fullNameRegex = /^[\p{L}]+(?:['\.\-][\p{L}]+)*\.?(?:\s+[\p{L}]+(?:['\.\-][\p{L}]+)*\.?)+$/u;

  return fullNameRegex.test(trimmed);
}
