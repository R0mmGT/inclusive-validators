function validate(lastName) {
  // Check if input is a string
  if (typeof lastName !== 'string') {
    return false;
  }
  
  // Trim whitespace from both ends
  const trimmedName = lastName.trim();
  
  // Check if string is empty after trimming
  if (trimmedName.length === 0) {
    return false;
  }
  
  // Common validation rules for last names:
  
  // 1. Minimum and maximum length (adjust as needed)
  if (trimmedName.length < 1 || trimmedName.length > 50) {
    return false;
  }
  
  // 2. Allow letters from various scripts (Latin, Cyrillic, Greek, etc.)
  //    Allow common punctuation in names: hyphens, apostrophes, spaces
  //    Allow accented characters
  const lastNamePattern = /^[\p{L}\s'-]+$/u;
  
  // 3. Check for consecutive special characters or invalid sequences
  const invalidPatterns = [
    /^-/,      // Starting with hyphen
    /-$/,      // Ending with hyphen
    /^'/,      // Starting with apostrophe
    /'$/,      // Ending with apostrophe
    /--/,      // Double hyphen
    /''/,      // Double apostrophe
    /\s\s+/,   // Multiple consecutive spaces
    /'\s|\s'/, // Apostrophe followed by space or vice versa
    /-\s|\s-/, // Hyphen followed by space or vice versa
    /'[-]|[-]'/, // Apostrophe adjacent to hyphen
  ];
  
  // Test basic pattern
  if (!lastNamePattern.test(trimmedName)) {
    return false;
  }
  
  // Test for invalid patterns
  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmedName)) {
      return false;
    }
  }
  
  // 4. Check if name contains at least one letter
  const hasLetter = /\p{L}/u.test(trimmedName);
  if (!hasLetter) {
    return false;
  }
  
  // 5. Optional: Check for unrealistic repetition (e.g., "aaaaaaaa")
  const characters = trimmedName.replace(/[^a-z]/gi, '').toLowerCase();
  if (characters.length > 3) {
    const firstChar = characters[0];
    const allSame = characters.split('').every(char => char === firstChar);
    if (allSame) {
      return false;
    }
  }
  
  return true;
}
