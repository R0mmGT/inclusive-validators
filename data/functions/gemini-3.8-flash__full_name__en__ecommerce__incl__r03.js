function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Allow names between 1 and 150 characters
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Ensure the name contains at least one Unicode letter (e.g., accounts for mononyms,
  // CJK characters, Arabic, Cyrillic, Latin, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permit only Unicode letters, combining marks/accents, spaces, hyphens, periods, and apostrophes
  const validCharsRegex = /^[\p{L}\p{M}\s'’ʻʼ.\-]+$/u;

  return validCharsRegex.test(trimmed);
}
