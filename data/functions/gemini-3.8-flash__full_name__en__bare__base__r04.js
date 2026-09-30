function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Matches at least two words consisting of letters, optional hyphens, apostrophes, and period initials
  const fullNameRegex = /^[\p{L}]+(?:['’\-][\p{L}]+)*\.?(?:\s+[\p{L}]+(?:['’\-][\p{L}]+)*\.?)+$/u;
  return fullNameRegex.test(trimmed);
}
