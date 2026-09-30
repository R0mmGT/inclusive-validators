function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Allows Unicode letters with optional single spaces, hyphens, or apostrophes between letters
  const nameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return name.length >= 1 && name.length <= 50 && nameRegex.test(name);
}
