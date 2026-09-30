function validate(name) {
  if (typeof name !== 'string' || name.length === 0 || name.length > 100) {
    return false;
  }

  // Allows letters (including accented/Unicode characters) with single internal spaces, hyphens, or apostrophes
  const regex = /^[\p{L}\p{M}]+(?:['’ -][\p{L}\p{M}]+)*$/u;

  return regex.test(name);
}
