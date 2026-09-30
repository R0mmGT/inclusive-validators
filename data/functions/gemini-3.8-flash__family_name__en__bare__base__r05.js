function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Validates standard, compound, and international family names:
  // - Length between 1 and 100 characters
  // - Supports all Unicode letters (\p{L})
  // - Allows hyphens, apostrophes, spaces, and abbreviations with periods (e.g., "St. John")
  const regex = /^(?=.{1,100}$)[\p{L}]+(?:(?:[ '\-]|(?:\. ))[\p{L}]+)*$/u;

  return regex.test(name);
}
