function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  if (name.length < 1 || name.length > 100) {
    return false;
  }

  // Matches names with Unicode letters, allowing single spaces, hyphens, or apostrophes between letters
  const regex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return regex.test(name);
}
