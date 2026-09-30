function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Check reasonable length constraints (1 to 50 characters)
  if (name.length < 1 || name.length > 50) {
    return false;
  }

  // Matches Unicode letters, allowing single spaces, hyphens, and apostrophes between letters
  const nameRegex = /^[\p{L}]+(?:['’ -][\p{L}]+)*$/u;

  return nameRegex.test(name);
}
