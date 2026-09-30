function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();
  if (trimmed !== name || name.length < 1 || name.length > 50) {
    return false;
  }

  // Matches names using Unicode letters, allowing single hyphens, apostrophes,
  // or spaces between letter segments (e.g., "Mary-Jane", "Anne Marie", "D'Angelo").
  const nameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return nameRegex.test(name);
}
