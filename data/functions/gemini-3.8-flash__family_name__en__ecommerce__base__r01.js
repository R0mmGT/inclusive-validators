function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Validate reasonable length for a family name (1 to 100 characters)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Matches international letters and combining marks (accents).
  // Allows valid delimiters (hyphens, apostrophes, spaces, periods) between name parts.
  // Prevents consecutive special characters and leading/trailing delimiters (except optional trailing period).
  const lastNameRegex = /^[\p{L}\p{M}]+(?:(?:['\-\s]|\.\s?)[\p{L}\p{M}]+)*\.?$/u;

  return lastNameRegex.test(trimmed);
}
