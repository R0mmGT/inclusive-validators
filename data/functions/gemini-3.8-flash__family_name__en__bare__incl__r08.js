function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure length is reasonable (names globally can be 1 char, e.g., "O" or "U")
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow only Unicode letters, combining marks, whitespace, hyphens, apostrophes, and periods
  if (!/^[\p{L}\p{M}\s\-\u2010-\u2015'’ʼʻ.]+$/u.test(trimmed)) {
    return false;
  }

  // Disallow names starting or ending with a hyphen or starting with a period
  if (/^[-\u2010-\u2015.]|[-\u2010-\u2015]$/u.test(trimmed)) {
    return false;
  }

  // Disallow repeated consecutive punctuation marks
  if (/[-\u2010-\u2015]{2,}|\.{2,}|['’ʼʻ]{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
