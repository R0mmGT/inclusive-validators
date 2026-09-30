function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();
  if (trimmed.length < 1 || trimmed.length > 50 || trimmed !== name) {
    return false;
  }

  // Matches unicode letters, allowing single internal hyphens, apostrophes, or spaces
  const nameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return nameRegex.test(name);
}
