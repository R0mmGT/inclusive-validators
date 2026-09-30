function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  if (name.length < 1 || name.length > 50) {
    return false;
  }

  // Matches Unicode letters, allowing single spaces, hyphens,
  // or apostrophes between letters. Disallows numbers, symbols,
  // and leading/trailing/consecutive punctuation or whitespace.
  const nameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return nameRegex.test(name);
}
