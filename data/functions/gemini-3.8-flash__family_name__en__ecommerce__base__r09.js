function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure length is reasonable (1 to 100 characters)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Allows international letters (\p{L}) and common name punctuation (hyphens,
  // straight/curly apostrophes, spaces, and abbreviations like "St. John").
  // Disallows consecutive punctuation, leading/trailing non-letters, and numbers/symbols.
  const nameRegex = /^[\p{L}](?:[\p{L}]|(?:\. |['’ -])(?=[\p{L}]))*$/u;

  return nameRegex.test(trimmed);
}
