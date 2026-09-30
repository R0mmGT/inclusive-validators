function validate(name) {
  if (typeof name !== 'string' || name.length < 1 || name.length > 70) {
    return false;
  }

  // Matches names using Unicode letters, allowing single hyphens, apostrophes,
  // or spaces between letter sequences (e.g., "Mary", "Jean-Luc", "D'Angelo", "Mary Jane").
  return /^\p{L}+(?:['’ -]\p{L}+)*$/u.test(name);
}
