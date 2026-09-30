function validate(phoneString) {
  // Handle null, undefined, or non-string input
  if (typeof phoneString !== 'string') {
    return false;
  }
  
  // Remove all whitespace characters
  let cleaned = phoneString.replace(/\s+/g, '');
  
  // Common international prefix patterns
  const patterns = [
    /^\+1\d{10}$/,        // +1 followed by 10 digits (US/Canada)
    /^1\d{10}$/,          // 1 followed by 10 digits (US/Canada without +)
    /^\+\d{10,15}$/,      // + followed by 10-15 digits (international)
    /^\d{10}$/,           // Just 10 digits (US/Canada local format)
    /^\(\d{3}\)\d{3}-\d{4}$/,  // (123)456-7890
    /^\d{3}-\d{3}-\d{4}$/,     // 123-456-7890
    /^\d{3}\.\d{3}\.\d{4}$/,   // 123.456.7890
    /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, // +1-234-567-8901
  ];
  
  // Check if any pattern matches
  for (let pattern of patterns) {
    if (pattern.test(cleaned)) {
      // Additional validation: ensure only digits, plus, parentheses, hyphens, or dots
      const validChars = /^[\d\+\-\(\)\.]+$/;
      return validChars.test(cleaned);
    }
  }
  
  return false;
}
