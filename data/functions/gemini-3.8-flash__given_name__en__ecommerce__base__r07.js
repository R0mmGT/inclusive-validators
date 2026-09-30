function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure length is within a reasonable range for a given name
  if (trimmed.length === 0 || trimmed.length > 50) {
    return false;
  }

  // Allows international Unicode letters, permitting single spaces, hyphens,
  // or apostrophes between letters (no leading/trailing or consecutive punctuation)
  const nameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return nameRegex.test(trimmed);
}
