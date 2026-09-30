function validate(lastName) {
  // Return false for non-string input or null/undefined
  if (typeof lastName !== 'string') return false;
  
  // Trim whitespace and check if string is empty after trimming
  const trimmed = lastName.trim();
  if (trimmed.length === 0) return false;
  
  // Check for reasonable length (1-100 characters)
  if (trimmed.length > 100) return false;
  
  // Allow letters from any language (including accented characters),
  // spaces, hyphens, apostrophes, and periods
  const validPattern = /^[\p{L}\s\-'.]+$/u;
  
  // Additional sanity checks:
  // 1. Should contain at least one letter character
  // 2. Should not start or end with punctuation/spaces (after trim)
  // 3. Should not contain consecutive punctuation/spaces
  const hasLetter = /\p{L}/u.test(trimmed);
  const startsWithInvalid = /^[\s\-'.]/.test(trimmed);
  const endsWithInvalid = /[\s\-'.]$/.test(trimmed);
  const hasConsecutivePunctuation = /[\s\-'.]{2,}/.test(trimmed);
  
  return validPattern.test(trimmed) && 
         hasLetter && 
         !startsWithInvalid && 
         !endsWithInvalid && 
         !hasConsecutivePunctuation;
}
