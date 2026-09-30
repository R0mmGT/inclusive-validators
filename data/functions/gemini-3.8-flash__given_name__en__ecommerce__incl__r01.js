function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Enforce reasonable length boundaries for a given name
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain only Unicode letters, combining marks (accents/diacritics),
  // spaces, hyphens, periods, and various apostrophe types (including modifier letters like Hawaiian ʻokina)
  const allowedChars = /^[\p{L}\p{M}\s'’ʼʻ.\-]+$/u;

  // Must contain at least one Unicode letter
  const hasLetter = /\p{L}/u;

  return allowedChars.test(trimmed) && hasLetter.test(trimmed);
}
