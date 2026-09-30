function validate(lastName) {
  // Basic validation: must be a non-empty string
  if (typeof lastName !== 'string' || !lastName.trim()) {
    return false;
  }
  
  const name = lastName.trim();
  
  // Check for minimum and maximum reasonable length
  // Some cultures have single-character last names (e.g., "O" in Korean, "E" in Chinese)
  // Maximum length accommodates hyphenated and multi-part names
  if (name.length < 1 || name.length > 100) {
    return false;
  }
  
  // Check for obviously invalid patterns
  // 1. Should not be only numbers
  if (/^\d+$/.test(name)) {
    return false;
  }
  
  // 2. Should not contain obviously non-name characters
  // Allow letters, spaces, hyphens, apostrophes, periods, and diacritical marks
  // This regex pattern tries to be inclusive while filtering obviously invalid characters
  const invalidCharPattern = /[<>{}[\]\\|`~!@#$%^&*()+=\d]/;
  if (invalidCharPattern.test(name)) {
    return false;
  }
  
  // 3. Check for consecutive special characters (like '--', "''", '..')
  if (/[-.' ]{2,}/.test(name)) {
    return false;
  }
  
  // 4. Should not start or end with certain special characters
  if (/^[-.' ]|[-.' ]$/.test(name)) {
    return false;
  }
  
  // 5. Should contain at least one letter from any language's alphabet
  // This regex matches letters from various scripts (Latin, Cyrillic, Greek, CJK, Arabic, etc.)
  const letterPattern = /[\p{L}]/u;
  if (!letterPattern.test(name)) {
    return false;
  }
  
  // 6. Validate reasonable structure
  // Check that the name isn't just repeating the same character
  const uniqueChars = new Set(name.toLowerCase().replace(/[^a-z]/g, ''));
  if (uniqueChars.size === 0) {
    return false;
  }
  
  // Additional cultural considerations:
  // - Allow spaces for names like "De Silva", "Van Der Berg"
  // - Allow hyphens for hyphenated names like "Smith-Jones"
  // - Allow apostrophes for names like "O'Connor", "D'Angelo"
  // - Allow periods for abbreviations like "St. John" (though rare in last names)
  
  // Final check: ensure the name doesn't contain obviously malicious patterns
  // This is a simple heuristic to catch things like SQL injection attempts
  const suspiciousPatterns = [
    /(\b(select|insert|update|delete|drop|union|exec|execute)\b)/i,
    /(--|\/\*|\*\/|;)/,
    /(http|ftp|https):\/\//i,
    /<script|<\/script>/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(name)) {
      return false;
    }
  }
  
  return true;
}
