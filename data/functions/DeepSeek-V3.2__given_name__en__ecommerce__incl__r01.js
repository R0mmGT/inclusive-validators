function validate(name) {
  // Check basic requirements
  if (typeof name !== 'string') {
    return false;
  }
  
  const trimmedName = name.trim();
  
  // Name should not be empty, too short, or too long
  if (trimmedName.length < 1 || trimmedName.length > 100) {
    return false;
  }
  
  // Check for only printable characters (excluding control characters)
  // Allow letters, spaces, hyphens, apostrophes, and various diacritics
  // This regex matches characters from multiple scripts and allows common name separators
  const validNamePattern = /^[\p{L}\p{M}\s\-'.]+$/u;
  
  if (!validNamePattern.test(trimmedName)) {
    return false;
  }
  
  // Check for consecutive special characters (like -- or '' or ..)
  const consecutiveSpecialChars = /([\s\-'.])\1/;
  if (consecutiveSpecialChars.test(trimmedName)) {
    return false;
  }
  
  // Check if name starts or ends with special characters (except apostrophe which can be valid at start/end in some names)
  const invalidStartEnd = /^[\s\-.]|[\s\-.]$/;
  if (invalidStartEnd.test(trimmedName)) {
    return false;
  }
  
  // Ensure there's at least one letter character (not just special characters)
  const hasLetter = /[\p{L}\p{M}]/u;
  if (!hasLetter.test(trimmedName)) {
    return false;
  }
  
  // Check for common problematic patterns (like email addresses or URLs)
  const emailPattern = /@/;
  const urlPattern = /(http|www|\.com|\.net|\.org)/i;
  if (emailPattern.test(trimmedName) || urlPattern.test(trimmedName)) {
    return false;
  }
  
  // Check for excessive repeating characters (like Aaaa or ---)
  const excessiveRepeat = /(.)\1{3,}/;
  if (excessiveRepeat.test(trimmedName)) {
    return false;
  }
  
  // Allow names with apostrophes at start (like O'Connor) and ensure proper usage
  // Remove apostrophes and check if remaining string follows rules
  const nameWithoutApostrophes = trimmedName.replace(/'/g, '');
  if (nameWithoutApostrophes.length < 1) {
    return false;
  }
  
  return true;
}
