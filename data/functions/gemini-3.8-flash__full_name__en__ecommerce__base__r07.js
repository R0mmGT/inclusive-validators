function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure a reasonable length for a full name
  if (trimmed.length < 2 || trimmed.length > 100) {
    return false;
  }

  // Validates at least two name parts separated by spaces.
  // Supports Unicode letters (\p{L}), hyphens, apostrophes, and trailing periods for initials.
  const fullNameRegex = /^[\p{L}]+(?:['’\-][\p{L}]+)*\.?(?:\s+[\p{L}]+(?:['’\-][\p{L}]+)*\.?)+$/u;

  return fullNameRegex.test(trimmed);
}
