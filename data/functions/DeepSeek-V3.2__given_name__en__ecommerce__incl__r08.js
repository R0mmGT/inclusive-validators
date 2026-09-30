function validate(firstName) {
  // Check input type
  if (typeof firstName !== 'string') {
    return false;
  }
  
  // Trim whitespace and check if empty
  const trimmed = firstName.trim();
  if (trimmed.length === 0) {
    return false;
  }
  
  // Check length boundaries (reasonably permissive but with limits)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }
  
  // Check for control characters (excluding spaces)
  if (/[\x00-\x1F\x7F]/.test(trimmed)) {
    return false;
  }
  
  // Basic check for at least one non-whitespace, non-punctuation character
  // This allows letters from any script, numbers in some cultures, hyphens, apostrophes, and spaces within names
  const validPattern = /^[\p{L}\p{M}\p{N}\s'\-\.]+$/u;
  
  // Additional check to ensure there's at least one letter character (from any script)
  const hasLetter = /[\p{L}\p{M}]/u.test(trimmed);
  
  // Check for consecutive special characters or starting/ending with them (except hyphen/apostrophe which can be valid)
  const invalidBoundaries = /^[\s\-'\.]|[\s\-'\.]$/.test(trimmed);
  const consecutiveSpecials = /[\s\-'\.]{2,}/.test(trimmed);
  
  // Allow names like "Jean-Luc", "O'Neill", "Maria del Carmen", "Xi'an"
  // But reject names that are only special characters or have problematic patterns
  
  return validPattern.test(trimmed) && 
         hasLetter && 
         !invalidBoundaries && 
         !consecutiveSpecials;
}
