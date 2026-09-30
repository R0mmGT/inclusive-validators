function validate(lastName) {
  // Handle edge cases
  if (typeof lastName !== 'string') {
    return false;
  }
  
  // Check if string is empty or contains only whitespace
  if (lastName.trim() === '') {
    return false;
  }
  
  const trimmed = lastName.trim();
  
  // Base length check (reasonable maximum for practical purposes)
  if (trimmed.length > 100) {
    return false;
  }
  
  // Check for invalid characters that are never valid in any culture's names
  // These include control characters, certain punctuation marks, and symbols
  const invalidChars = /[\x00-\x1F\x7F<>{}[\]|\\^~`@#$%*+=_]/;
  if (invalidChars.test(trimmed)) {
    return false;
  }
  
  // Check for numbers - while some cultures may use numbers historically,
  // for modern validation we typically exclude pure numbers
  if (/^\d+$/.test(trimmed)) {
    return false;
  }
  
  // Allow letters from all scripts, apostrophes, hyphens, spaces (for multi-part names),
  // and common diacritical marks
  // This includes:
  // - Latin, Cyrillic, Greek, Armenian, Hebrew, Arabic, Devanagari, CJK, etc.
  // - Apostrophes, hyphens, spaces
  // - Digits mixed with letters (e.g., "O'Conner", "Van Der Beek", "Al-Masri", "D'Angelo")
  const validPattern = /^[\p{L}\p{M}\s'\-.\d]+$/u;
  
  if (!validPattern.test(trimmed)) {
    return false;
  }
  
  // Ensure there's at least one letter (not just punctuation or digits)
  const hasLetter = /[\p{L}\p{M}]/u.test(trimmed);
  if (!hasLetter) {
    return false;
  }
  
  // Additional sensible constraints
  // Check for consecutive special characters
  if (/['\-.]{2,}/.test(trimmed)) {
    return false;
  }
  
  // Check if starts or ends with special character (except apostrophe in some cases like O'Connor)
  if (/^[\-.]|[\-.][\s]*$/.test(trimmed)) {
    return false;
  }
  
  return true;
}
