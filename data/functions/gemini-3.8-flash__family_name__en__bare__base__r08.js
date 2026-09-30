function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  if (name.length < 1 || name.length > 100) {
    return false;
  }

  // Allows international letters, optionally separated by a single space, hyphen, or apostrophe
  const lastNameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return lastNameRegex.test(name);
}
