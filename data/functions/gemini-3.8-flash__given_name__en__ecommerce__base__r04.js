function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure length is within a standard, practical range (1 to 50 characters)
  if (trimmed.length < 1 || trimmed.length > 50) {
    return false;
  }

  // Matches Unicode letters, allowing single spaces, hyphens, or apostrophes between letters.
  // Prevents consecutive punctuation, numbers, symbols, and leading/trailing separators.
  const nameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return nameRegex.test(trimmed);
}
