function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Length check: reasonable family name length between 1 and 100 characters
  if (name.length < 1 || name.length > 100) {
    return false;
  }

  // Allows letters (Unicode), single apostrophes, hyphens, and spaces between letter segments
  const nameRegex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return nameRegex.test(name);
}
