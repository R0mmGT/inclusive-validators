function validate(name) {
  // Check if input is a non-empty string
  if (typeof name !== 'string' || name.trim().length === 0) {
    return false;
  }
  
  const trimmedName = name.trim();
  
  // Check for minimum and maximum length (1-100 characters)
  if (trimmedName.length < 1 || trimmedName.length > 100) {
    return false;
  }
  
  // Check for consecutive spaces or leading/trailing spaces (already trimmed)
  if (trimmedName.includes('  ') || name !== trimmedName) {
    return false;
  }
  
  // Split into name parts
  const nameParts = trimmedName.split(/\s+/);
  
  // Must have at least two parts (first name and last name)
  if (nameParts.length < 2) {
    return false;
  }
  
  // Each part must:
  // 1. Not be empty
  // 2. Start with a letter (Unicode letter from any language)
  // 3. Contain only valid name characters: letters, apostrophes, hyphens, periods, and spaces
  // 4. Have no consecutive special characters
  // 5. Have no leading or trailing special characters within each part
  
  const namePartRegex = /^\p{L}[\p{L}'.-]*$/u;
  const specialCharRegex = /[.'-]/;
  
  for (let part of nameParts) {
    // Check if part is not empty
    if (part.length === 0) {
      return false;
    }
    
    // Check for valid characters and structure
    if (!namePartRegex.test(part)) {
      return false;
    }
    
    // Check for consecutive special characters
    if (/([.'-]{2,})/.test(part)) {
      return false;
    }
    
    // Check that special characters aren't at the start or end
    if (specialCharRegex.test(part[0]) || specialCharRegex.test(part[part.length - 1])) {
      return false;
    }
    
    // Additional check for hyphen: ensure letters on both sides
    if (part.includes('-')) {
      const hyphenParts = part.split('-');
      for (let hp of hyphenParts) {
        if (hp.length === 0 || !/^\p{L}/u.test(hp)) {
          return false;
        }
      }
    }
  }
  
  // Check for common invalid patterns
  const invalidPatterns = [
    /^\d+$/, // Only numbers
    /[@#$%^&*+=_<>[\]{}|\\:;"/?~`0-9]/, // Invalid symbols
    /\b(test|example|admin|user)\b/i, // Test/placeholder names
  ];
  
  for (let pattern of invalidPatterns) {
    if (pattern.test(trimmedName)) {
      return false;
    }
  }
  
  return true;
}
