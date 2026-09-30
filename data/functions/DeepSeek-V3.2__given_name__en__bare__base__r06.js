function validate(firstName) {
  // Check if input is a string
  if (typeof firstName !== 'string') {
    return false;
  }
  
  // Trim whitespace and check if empty
  const trimmedName = firstName.trim();
  if (trimmedName.length === 0) {
    return false;
  }
  
  // Check length constraints (typical first names are 1-50 characters)
  if (trimmedName.length > 50) {
    return false;
  }
  
  // Check for invalid characters
  // Allow letters, spaces, hyphens, apostrophes, and some accented characters
  // but reject names with numbers or special symbols
  const validNamePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+$/;
  if (!validNamePattern.test(trimmedName)) {
    return false;
  }
  
  // Check for excessive special characters (no more than 2 of any special character)
  const specialCharPattern = /['\-]/g;
  const specialChars = trimmedName.match(specialCharPattern);
  if (specialChars) {
    const charCounts = {};
    for (const char of specialChars) {
      charCounts[char] = (charCounts[char] || 0) + 1;
      if (charCounts[char] > 2) {
        return false;
      }
    }
  }
  
  // Check for consecutive special characters
  if (/['\-]{2,}/.test(trimmedName)) {
    return false;
  }
  
  // Check for valid start and end characters
  // Should start and end with a letter (not space, hyphen, or apostrophe)
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]/.test(trimmedName) || 
      !/[A-Za-zÀ-ÖØ-öø-ÿ]$/.test(trimmedName)) {
    return false;
  }
  
  // Check for excessive spaces (no more than 1 space in a row)
  if (/\s{2,}/.test(trimmedName)) {
    return false;
  }
  
  // Check for realistic capitalization
  // If the name has multiple words (like "Mary Ann"), check each word starts with uppercase
  const words = trimmedName.split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    // Skip checking capitalization for names starting with apostrophe (like O'Connor)
    if (word.startsWith("'") || word.startsWith("-")) {
      if (word.length > 1 && /^[A-Za-zÀ-ÖØ-öø-ÿ]/.test(word.charAt(1))) {
        continue;
      }
    }
    
    // Check if first character of each word is a letter and is uppercase
    // (allowing for cultural variations where some names start lowercase)
    // For simplicity, we'll accept both cases but require the first character to be a letter
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]/.test(word)) {
      return false;
    }
  }
  
  // Check for minimum word length (at least one letter)
  const lettersOnly = trimmedName.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, '');
  if (lettersOnly.length === 0) {
    return false;
  }
  
  return true;
}
