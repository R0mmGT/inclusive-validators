function validate(name) {
  // A valid first name must be a non-empty string
  if (typeof name !== 'string' || name.trim().length === 0) {
    return false;
  }
  
  const trimmedName = name.trim();
  
  // Check basic length constraints (reasonable for any culture)
  // Some cultures have very short names (e.g., "Li", "Jo") and some longer compound names
  if (trimmedName.length < 1 || trimmedName.length > 100) {
    return false;
  }
  
  // Check for control characters or obviously invalid patterns
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(trimmedName)) {
    return false;
  }
  
  // Allow a wide range of characters from various writing systems:
  // - Latin letters (including accented characters)
  // - Greek letters
  // - Cyrillic letters
  // - Common Chinese characters (Han)
  // - Hiragana and Katakana (Japanese)
  // - Hangul (Korean)
  // - Arabic letters and related scripts
  // - Hebrew letters
  // - Devanagari and other Indic scripts
  // - Thai, Armenian, Georgian, etc.
  // Also allow hyphens, apostrophes, and spaces (for compound names)
  // But ensure there's at least one letter-like character
  
  // This regex matches strings that contain at least one character from a recognized script
  // and otherwise consist only of allowed characters (letters, spaces, hyphens, apostrophes)
  const validNamePattern = /^[\p{L}\p{M}\-'. ]+$/u;
  
  if (!validNamePattern.test(trimmedName)) {
    return false;
  }
  
  // Ensure there's at least one letter (not just punctuation/spaces)
  const hasLetter = /[\p{L}\p{M}]/u.test(trimmedName);
  if (!hasLetter) {
    return false;
  }
  
  // Additional cultural considerations:
  
  // 1. Some cultures have names starting with certain prefixes
  //    (e.g., "O'" in Irish, "Al-" in Arabic, "Mc" in Scottish)
  //    These are already allowed by our character set
  
  // 2. Some cultures use multiple spaces or hyphens
  //    Check for excessive consecutive non-letter characters
  if (/[\-'. ]{3,}/.test(trimmedName)) {
    return false;
  }
  
  // 3. Ensure the name doesn't start or end with punctuation/hyphen/space
  //    (after trimming we already removed outer spaces, but check other characters)
  if (/^[\-'. ]|[\-'. ]$/.test(trimmedName)) {
    return false;
  }
  
  // 4. Check for realistic syllable/word structure
  //    At least one character should be a letter from a major script
  
  // Final validation: the name should look plausible
  // Count the number of letter characters vs total length
  const letterMatches = trimmedName.match(/[\p{L}\p{M}]/gu);
  const letterCount = letterMatches ? letterMatches.length : 0;
  
  // Ensure majority of characters are letters (allow for punctuation/spaces)
  if (letterCount < Math.ceil(trimmedName.length * 0.3)) {
    return false;
  }
  
  return true;
}
