function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // A full name should have at least two words, contain only letters (including Unicode),
  // hyphens, apostrophes, and optional periods (for initials/titles), separated by single spaces.
  const fullNameRegex = /^[\p{L}]+(?:['’\-]?[\p{L}]+)*\.?(?: [\p{L}]+(?:['’\-]?[\p{L}]+)*\.?)+$/u;

  return fullNameRegex.test(name.trim());
}
