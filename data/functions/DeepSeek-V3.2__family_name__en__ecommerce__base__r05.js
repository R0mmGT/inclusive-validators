function validate(lastName) {
  // Check if input is a non-empty string
  if (typeof lastName !== 'string' || lastName.trim() === '') {
    return false;
  }
  
  const trimmedName = lastName.trim();
  
  // Check maximum reasonable length (e.g., 50 characters)
  if (trimmedName.length > 50) {
    return false;
  }
  
  // Check for minimum length (at least 1 character)
  if (trimmedName.length < 1) {
    return false;
  }
  
  // Allow letters (including accented characters), hyphens, apostrophes, and spaces
  // This pattern supports:
  // - Standard Latin letters (a-z, A-Z)
  // - Accented characters (common in European names)
  // - Hyphens (for compound names like Smith-Jones)
  // - Apostrophes (for names like O'Connor)
  // - Spaces (for names with multiple parts like "De La Cruz")
  const validNamePattern = /^[\p{L}\s'-]+$/u;
  
  if (!validNamePattern.test(trimmedName)) {
    return false;
  }
  
  // Additional validation rules
  
  // Check for consecutive special characters (like -- or '')
  if (/(['-])\1/.test(trimmedName)) {
    return false;
  }
  
  // Check if name starts or ends with special characters
  if (/^['-]|['-]$/.test(trimmedName)) {
    return false;
  }
  
  // Ensure there's at least one letter character
  if (!/\p{L}/u.test(trimmedName)) {
    return false;
  }
  
  // Check for excessive special characters (more than 3)
  const specialCharCount = (trimmedName.match(/['-]/g) || []).length;
  if (specialCharCount > 3) {
    return false;
  }
  
  // Check for excessive consecutive spaces (more than 1)
  if (/\s{2,}/.test(trimmedName)) {
    return false;
  }
  
  return true;
}
