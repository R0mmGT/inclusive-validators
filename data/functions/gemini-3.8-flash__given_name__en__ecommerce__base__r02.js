function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Length check: between 1 and 50 characters
  if (name.length < 1 || name.length > 50) {
    return false;
  }

  // Allows letters (from any language/script), diacritics/combining marks,
  // and single spaces, hyphens, or apostrophes between letters.
  const nameRegex = /^[\p{L}\p{M}]+(?:['’ -][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(name);
}
