function validate(name) {
  // Check basic requirements
  if (typeof name !== 'string' || name.length === 0) {
    return false;
  }
  
  // Trim whitespace and check if empty after trimming
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return false;
  }
  
  // Check minimum and maximum length (1-100 characters)
  // Some cultures have very short names (like "Xi" or "Bo") and some have compound names
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }
  
  // Check for invalid control characters
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(trimmed)) {
    return false;
  }
  
  // Check for reasonable character composition
  // Allow letters from all scripts, apostrophes, hyphens, spaces (for compound names), 
  // and combining marks/diacritics
  // This regex pattern allows:
  // - Letters from all Unicode scripts (including Latin, Cyrillic, Arabic, Chinese, etc.)
  // - Common punctuation: apostrophes, hyphens, spaces (for names like "Jean Paul")
  // - Combining diacritical marks (for accented characters)
  const validNamePattern = /^[\p{L}\p{M}'\-\s]+$/u;
  
  if (!validNamePattern.test(trimmed)) {
    return false;
  }
  
  // Check that name contains at least one letter character
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }
  
  // Check for consecutive punctuation or spaces
  if (/['\-]{2,}/.test(trimmed) || /\s{2,}/.test(trimmed)) {
    return false;
  }
  
  // Check that name doesn't start or end with punctuation (except apostrophe at start for names like O'Connor)
  if (/^[-\s]|[\s-]$/.test(trimmed)) {
    return false;
  }
  
  // Check for reasonable structure - not all punctuation or spaces
  const letterCount = (trimmed.match(/\p{L}/ug) || []).length;
  const totalChars = trimmed.length;
  
  // Ensure at least 50% of characters are letters (allowing for long compound names with spaces)
  if (letterCount / totalChars < 0.5) {
    return false;
  }
  
  // Check for excessive repetition of the same character (like "aaaaaaaa")
  if (/(.)\1{9,}/.test(trimmed)) {
    return false;
  }
  
  return true;
}
