function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Enforce a reasonable length limit
  if (trimmed.length === 0 || trimmed.length > 150) {
    return false;
  }

  // Must consist only of Unicode letters, diacritic marks, spaces, 
  // hyphens, apostrophes, and periods (e.g., St. John, d'Artagnan, García-Márquez, 王, Al-Khalid).
  const allowedCharsPattern = /^[\p{L}\p{M}\s'’ʻ.\-]+$/u;

  // Must contain at least one Unicode letter (prevents input containing only punctuation or spaces)
  const hasLetterPattern = /\p{L}/u;

  return allowedCharsPattern.test(trimmed) && hasLetterPattern.test(trimmed);
}
