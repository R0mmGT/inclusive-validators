function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensures at least two name parts separated by whitespace.
  // Supports Unicode letters, apostrophes, hyphens, and initials with periods.
  const fullNameRegex = /^[\p{L}]+(?:['’\-][\p{L}]+)*\.?(?:\s+[\p{L}]+(?:['’\-][\p{L}]+)*\.?)+$/u;

  return fullNameRegex.test(trimmed);
}
