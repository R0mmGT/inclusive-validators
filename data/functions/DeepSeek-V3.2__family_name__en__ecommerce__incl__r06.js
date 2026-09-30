function validate(lastName) {
  // Check if input is a string
  if (typeof lastName !== 'string') {
    return false;
  }
  
  // Trim whitespace and check for empty string
  const trimmedName = lastName.trim();
  if (trimmedName.length === 0) {
    return false;
  }
  
  // Define a broad character set that accommodates global last names
  const validCharactersPattern = /^[\p{L}\p{M}\s.'\-]+$/u;
  
  // Additional constraints to prevent abuse while being culturally inclusive
  const minLength = 1;
  const maxLength = 70;
  const maxConsecutiveSpecialChars = 2;
  const maxSpecialCharCount = 4;
  
  // Check length constraints
  if (trimmedName.length < minLength || trimmedName.length > maxLength) {
    return false;
  }
  
  // Check for valid characters
  if (!validCharactersPattern.test(trimmedName)) {
    return false;
  }
  
  // Check for consecutive special characters
  const consecutiveSpecialCharsPattern = /[.'\-]{3,}/;
  if (consecutiveSpecialCharsPattern.test(trimmedName)) {
    return false;
  }
  
  // Count special characters
  const specialCharCount = (trimmedName.match(/[.'\-]/g) || []).length;
  if (specialCharCount > maxSpecialCharCount) {
    return false;
  }
  
  // Check for names that are only special characters or digits
  const lettersOnly = trimmedName.replace(/[.'\-\s]/g, '');
  if (lettersOnly.length === 0) {
    return false;
  }
  
  // Check for invalid starting/ending characters
  if (/^[.'\-]|[.'\-]$/.test(trimmedName)) {
    return false;
  }
  
  // Check for invalid sequences
  if (/\s[.'\-]|[.'\-]\s/.test(trimmedName)) {
    return false;
  }
  
  // Check for multiple spaces
  if (/\s{2,}/.test(trimmedName)) {
    return false;
  }
  
  // All checks passed
  return true;
}
