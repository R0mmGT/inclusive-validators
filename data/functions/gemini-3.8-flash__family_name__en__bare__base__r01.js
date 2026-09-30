function validate(name) {
  if (typeof name !== 'string' || name.length < 1 || name.length > 100) {
    return false;
  }

  // Matches names with Unicode letters/combining marks, allowing valid separators
  // (hyphens, spaces, apostrophes, and periods) without consecutive punctuation.
  const regex = /^[\p{L}\p{M}](?:[ '’.-]?[\p{L}\p{M}]+)*\.?$/u;
  return regex.test(name);
}
