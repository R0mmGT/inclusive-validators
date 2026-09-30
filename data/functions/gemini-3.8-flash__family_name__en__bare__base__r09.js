function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  if (name.length < 1 || name.length > 100) {
    return false;
  }

  // Matches names containing Unicode letters, allowing single hyphens,
  // apostrophes, or spaces between letters.
  const regex = /^\p{L}+(?:['’\- ]\p{L}+)*$/u;

  return regex.test(name);
}
