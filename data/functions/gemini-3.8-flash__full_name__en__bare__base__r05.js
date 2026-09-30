function validate(name) {
  if (typeof name !== 'string') return false;

  const trimmed = name.trim();
  if (trimmed.length < 3 || trimmed.length > 100) return false;

  // Requires at least two words (first and last name)
  // Supports Unicode letters, spaces, hyphens, apostrophes, and period initials (e.g., "John F. Kennedy")
  const fullNameRegex = /^[\p{L}]+(?:['’.-]?[\p{L}]+)*\.?(?:\s+[\p{L}]+(?:['’.-]?[\p{L}]+)*\.?)+$/u;

  return fullNameRegex.test(trimmed);
}
