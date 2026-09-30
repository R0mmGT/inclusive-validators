function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  if (name.length < 1 || name.length > 50) {
    return false;
  }

  // Matches names with Unicode letters, allowing single internal spaces, hyphens, or apostrophes
  const nameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return nameRegex.test(name);
}
