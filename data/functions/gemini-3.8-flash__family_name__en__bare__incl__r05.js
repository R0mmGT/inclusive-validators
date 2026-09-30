function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Length constraint: accounts for single-letter names up to long multi-word names
  if (name.length < 1 || name.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(name)) {
    return false;
  }

  // Must contain only letters, combining marks, hyphens, apostrophes, periods, and spaces
  if (!/^[\p{L}\p{M}'’.\- ]+$/u.test(name)) {
    return false;
  }

  // Must start with a letter, combining mark, or apostrophe (e.g., 't Hooft)
  if (!/^[\p{L}\p{M}'’]/u.test(name)) {
    return false;
  }

  // Must end with a letter, combining mark, or period (e.g., St.)
  if (!/[\p{L}\p{M}.]$/u.test(name)) {
    return false;
  }

  // Disallow consecutive punctuation, symbols, or whitespace (e.g., '--', '  ', '- ')
  if (/['’.\- ]{2}/u.test(name)) {
    return false;
  }

  return true;
}
