function validate(lastName) {
  // Check if input is a non-empty string
  if (typeof lastName !== 'string') {
    return false;
  }
  
  const trimmed = lastName.trim();
  
  // Empty string or only whitespace is invalid
  if (trimmed.length === 0) {
    return false;
  }
  
  // Minimum and maximum length constraints (adjustable)
  // Too short might be initials or errors, too long might be abuse
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }
  
  // Allow letters from any language (including accented characters),
  // hyphens, apostrophes, spaces, and dots that are common in surnames
  const validPattern = /^[\p{L}\p{M}\s'-\.]+$/u;
  
  if (!validPattern.test(trimmed)) {
    return false;
  }
  
  // Check for some common problematic patterns
  // Multiple consecutive special characters (except spaces between words)
  const consecutiveSpecialChars = /['\-\.]{2,}/;
  if (consecutiveSpecialChars.test(trimmed)) {
    return false;
  }
  
  // Starts or ends with special characters (except apostrophe which can be valid at start)
  const invalidStart = /^[\s\-\.]/;
  const invalidEnd = /[\s\-\.]$/;
  if (invalidStart.test(trimmed) || invalidEnd.test(trimmed)) {
    // Allow apostrophe at start (like O'Connor)
    if (!trimmed.startsWith("'")) {
      return false;
    }
  }
  
  // Must contain at least one letter (not just special characters or numbers)
  const hasLetter = /[\p{L}\p{M}]/u.test(trimmed);
  if (!hasLetter) {
    return false;
  }
  
  return true;
}
