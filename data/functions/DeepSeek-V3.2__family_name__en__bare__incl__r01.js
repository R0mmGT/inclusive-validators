function validate(lastName) {
  // Basic type and length validation
  if (typeof lastName !== 'string' || lastName.length === 0) {
    return false;
  }

  // Trim whitespace
  const trimmedName = lastName.trim();
  
  // Minimum and maximum length checks (adjust based on real-world data)
  if (trimmedName.length < 1 || trimmedName.length > 100) {
    return false;
  }

  // Check for control characters or dangerous patterns
  if (/[\x00-\x1F\x7F]/.test(trimmedName)) {
    return false;
  }

  // Unicode letter validation (includes all scripts)
  // This allows letters from any alphabet, plus common symbols used in names
  const validNamePattern = /^[\p{L}\p{M}'\-\s.]+$/u;
  
  // Additional check to ensure at least one letter character exists
  const hasLetter = /[\p{L}\p{M}]/u.test(trimmedName);
  
  // Check for excessive repeating characters
  const hasExcessiveRepeats = /(.)\1{5,}/.test(trimmedName);
  
  // Check for reasonable spacing (not too many consecutive spaces)
  const hasExcessiveSpaces = /\s{3,}/.test(trimmedName);
  
  // Allow names with apostrophes, hyphens, spaces, and dots (common in many cultures)
  // Examples: O'Connor, Smith-Jones, van der Berg, St. John, etc.
  return validNamePattern.test(trimmedName) && 
         hasLetter && 
         !hasExcessiveRepeats && 
         !hasExcessiveSpaces;
}
