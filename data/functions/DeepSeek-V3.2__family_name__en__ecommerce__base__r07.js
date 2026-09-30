function validate(lastName) {
  // Check if input is a non-empty string
  if (typeof lastName !== 'string' || lastName.trim().length === 0) {
    return false;
  }
  
  const trimmedLastName = lastName.trim();
  
  // Check length constraints (reasonable for last names)
  if (trimmedLastName.length > 64 || trimmedLastName.length < 1) {
    return false;
  }
  
  // Allow letters from various scripts, hyphens, apostrophes, and spaces
  // This includes Latin, Cyrillic, Greek, Chinese, Japanese, Korean, Arabic, Hebrew, etc.
  // Also allows common punctuation in names: hyphens, apostrophes, and spaces
  const lastNamePattern = /^[\p{L}\p{M}\s'-]+$/u;
  
  // Validate against the pattern
  if (!lastNamePattern.test(trimmedLastName)) {
    return false;
  }
  
  // Additional validation: Check for consecutive special characters
  if (/['-]{2,}/.test(trimmedLastName) || /^\s|\s$/.test(trimmedLastName)) {
    return false;
  }
  
  // Ensure the name contains at least one letter (not just special chars/spaces)
  const hasLetter = /[\p{L}\p{M}]/u.test(trimmedLastName);
  if (!hasLetter) {
    return false;
  }
  
  return true;
}
