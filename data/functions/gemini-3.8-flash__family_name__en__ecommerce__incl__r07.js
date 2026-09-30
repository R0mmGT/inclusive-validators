function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Allow names between 1 and 100 characters in length
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow letters, combining marks (accents/diacritics), spaces, hyphens, periods, and apostrophes
  // Supports international apostrophe variants (e.g., standard ', typographic ’, and modifier letter apostrophe ʼ)
  const validCharsRegex = /^[\p{L}\p{M}\s'\-’ʼ.]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // Should not start or end with a hyphen
  if (trimmed.startsWith('-') || trimmed.endsWith('-')) {
    return false;
  }

  return true;
}
