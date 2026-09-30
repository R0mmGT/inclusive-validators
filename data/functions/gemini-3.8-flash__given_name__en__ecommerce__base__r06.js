function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure length is reasonable for a given name (1 to 50 characters)
  if (trimmed.length < 1 || trimmed.length > 50) {
    return false;
  }

  // Allows international letters (\p{L}), with internal single spaces, hyphens, or apostrophes
  const nameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return nameRegex.test(trimmed);
}
