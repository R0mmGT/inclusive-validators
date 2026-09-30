function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Name length should be reasonable (1 to 50 characters)
  if (name.length === 0 || name.length > 50) {
    return false;
  }

  // Allows international letters, with internal spaces, hyphens, or apostrophes
  const nameRegex = /^\p{L}+(?:['\s-]\p{L}+)*$/u;

  return nameRegex.test(name);
}
