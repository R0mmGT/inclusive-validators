function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Check length: first names are typically between 1 and 50 characters
  if (name.length < 1 || name.length > 50) {
    return false;
  }

  // Allows Unicode letters with single spaces, hyphens, or apostrophes between them
  // Disallows leading/trailing spaces or punctuation and consecutive separators
  const nameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return nameRegex.test(name);
}
