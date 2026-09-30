function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Check reasonable length constraints
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Ensures at least two words (e.g., first and last name),
  // supports Unicode letters (accents, international characters),
  // and allows common punctuation like hyphens, apostrophes, and periods for initials.
  const fullNamePattern = /^[\p{L}]+(?:['’.-][\p{L}]+)*\.?(?:\s+[\p{L}]+(?:['’.-][\p{L}]+)*\.?)+$/u;

  return fullNamePattern.test(trimmed);
}
