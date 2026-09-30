function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Basic length constraints for a reasonable full name
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Ensures at least two words (e.g., first and last name),
  // supporting international Unicode letters, hyphens, apostrophes, and initials with periods.
  const fullNameRegex = /^[\p{L}]+(?:['’\-][\p{L}]+)*\.?(?:\s+[\p{L}]+(?:['’\-][\p{L}]+)*\.?)+$/u;

  return fullNameRegex.test(trimmed);
}
