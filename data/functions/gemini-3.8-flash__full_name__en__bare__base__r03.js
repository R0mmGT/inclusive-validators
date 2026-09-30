function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Matches at least two name components (first and last name)
  // Supports Unicode letters, hyphens, apostrophes, and periods (e.g., for initials)
  const namePattern = /^(?:[\p{L}]+(?:['’.-][\p{L}]+)*\.?\s+)+[\p{L}]+(?:['’.-][\p{L}]+)*\.?$/u;

  return namePattern.test(trimmed);
}
