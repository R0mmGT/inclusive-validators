function validate(lastName) {
  // Check input type
  if (typeof lastName !== 'string') {
    return false;
  }
  
  // Allow empty string (some cultures may have single names only)
  if (lastName.length === 0) {
    return true;
  }
  
  // Maximum reasonable length check (adjustable but prevents extremes)
  if (lastName.length > 150) {
    return false;
  }
  
  // Basic sanitization - remove surrounding whitespace
  const trimmedName = lastName.trim();
  
  // Allow single character last names (like "O" or "X")
  if (trimmedName.length === 0) {
    return true;
  }
  
  // Check for control characters or problematic Unicode
  for (let i = 0; i < trimmedName.length; i++) {
    const code = trimmedName.charCodeAt(i);
    // Block control characters (except soft hyphen \u00AD and zero-width characters)
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
      return false;
    }
    
    // Check for private use area characters (not suitable for names)
    if (code >= 0xE000 && code <= 0xF8FF) {
      return false;
    }
    
    // Check for surrogate pairs (valid in many scripts)
    if (code >= 0xD800 && code <= 0xDFFF) {
      // Validate it's part of a proper surrogate pair
      if (i === trimmedName.length - 1) {
        return false; // Lone high surrogate
      }
      const nextCode = trimmedName.charCodeAt(i + 1);
      if (!(nextCode >= 0xDC00 && nextCode <= 0xDFFF)) {
        return false; // Invalid surrogate pair
      }
      i++; // Skip the low surrogate
    }
  }
  
  // Check for mixed script issues (warning but not blocking)
  // We don't block mixed scripts as names can legitimately contain them
  
  // Check for excessive repeating characters (likely not valid)
  if (/(.)\1{10,}/.test(trimmedName)) {
    return false;
  }
  
  // Check for problematic patterns (emails, URLs, etc.)
  const problematicPatterns = [
    /@.*\./, // Email-like pattern
    /https?:\/\//, // URL
    /^\d+$/, // Only numbers
    /[<>\[\]{}|\\^~%]/, // Problematic symbols
    /\x00/, // Null character
  ];
  
  for (const pattern of problematicPatterns) {
    if (pattern.test(trimmedName)) {
      return false;
    }
  }
  
  // Allow a wide range of Unicode characters from various scripts
  // This regex allows letters, marks, apostrophes, hyphens, spaces, etc.
  // but blocks obviously problematic characters
  const namePattern = /^[\p{L}\p{M}\p{Zs}\-'’.()\u00AD\u200B\u200C\u200D\u2060]+$/u;
  
  return namePattern.test(trimmedName);
}
