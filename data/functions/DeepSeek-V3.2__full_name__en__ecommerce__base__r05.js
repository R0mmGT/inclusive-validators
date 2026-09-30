function validate(name) {
  // Basic validation: non-empty string, reasonable length
  if (typeof name !== 'string' || name.trim().length === 0) {
    return false;
  }
  
  const trimmedName = name.trim();
  
  // Reasonable length for a person's full name (2-100 characters)
  if (trimmedName.length < 2 || trimmedName.length > 100) {
    return false;
  }
  
  // Must contain at least two name parts (first and last name)
  const nameParts = trimmedName.split(/\s+/);
  if (nameParts.length < 2) {
    return false;
  }
  
  // Each part must be at least 2 characters long (except for valid initials with period)
  for (let part of nameParts) {
    // Allow initials like "J." or "A." but not single letters without period
    if (part.length === 1 && !part.match(/^[A-Za-z]$/)) {
      return false;
    }
    
    // Minimum 2 chars for normal name parts
    if (part.length < 2 && !part.match(/^[A-Za-z]\.$/)) {
      return false;
    }
    
    // Check for valid characters: letters, hyphens, apostrophes, periods, and spaces (already split)
    if (!part.match(/^[A-Za-z]+([-'.][A-Za-z]+)*\.?$/)) {
      return false;
    }
    
    // Each part should start with a capital letter (common naming convention)
    if (!part.match(/^[A-Z]/)) {
      return false;
    }
  }
  
  // Check for excessive consecutive spaces or unusual patterns
  if (name.includes('  ') || name.includes('..') || name.includes('--')) {
    return false;
  }
  
  // Check for common invalid patterns
  const invalidPatterns = [
    /\d/, // No numbers
    /[^\w\s\-'.]/, // No special characters except allowed ones
    /^\.|\.\.|\.$/ // No leading, trailing, or consecutive periods in the full string
  ];
  
  if (invalidPatterns.some(pattern => pattern.test(trimmedName))) {
    return false;
  }
  
  return true;
}
