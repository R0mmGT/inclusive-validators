function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Matches at least two name parts separated by spaces.
  // Supports Unicode letters, hyphens, apostrophes, and periods (e.g., for initials).
  const fullNameRegex = /^[\p{L}]+(?:['’-][\p{L}]+)*\.?(?:\s+[\p{L}]+(?:['’-][\p{L}]+)*\.?)+$/u;

  return fullNameRegex.test(name.trim());
}
