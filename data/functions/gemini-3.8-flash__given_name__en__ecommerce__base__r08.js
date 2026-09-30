function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Common reasonable length constraint for a given name (1 to 50 characters)
  if (name.length < 1 || name.length > 50) {
    return false;
  }

  // Allows international letters, marks/diacritics, spaces, hyphens, and apostrophes.
  // Must start and end with a letter, and forbids consecutive punctuation/spaces.
  const namePattern = /^(?!.*[ '\u2019-]{2})[\p{L}\p{M}](?:[\p{L}\p{M} '\u2019-]*[\p{L}\p{M}])?$/u;

  return namePattern.test(name);
}
