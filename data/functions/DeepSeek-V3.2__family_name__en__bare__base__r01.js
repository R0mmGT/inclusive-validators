function validate(lastName) {
  // Check if input is a non-empty string
  if (typeof lastName !== 'string' || lastName.length === 0) {
    return false;
  }

  // Trim whitespace and check length constraints
  const trimmed = lastName.trim();
  const length = trimmed.length;
  
  // Common constraints: length between 1 and 64 characters
  if (length < 1 || length > 64) {
    return false;
  }

  // Allow letters from any alphabet, spaces, hyphens, apostrophes, and periods
  // This regex covers:
  // - Letters (including accented characters and non-Latin scripts)
  // - Common separators: space, hyphen, apostrophe, period
  // - Unicode property escapes \p{L} match any letter from any language
  // - The 'u' flag enables full Unicode matching
  const validLastNameRegex = /^[\p{L}\s\-'.]+$/u;

  // Additional check: should not consist only of separators
  const onlySeparatorsRegex = /^[\s\-'.]+$/;

  return validLastNameRegex.test(trimmed) && !onlySeparatorsRegex.test(trimmed);
}
