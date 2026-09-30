function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }
  
  const code = postalCode.trim();
  
  if (code.length === 0) {
    return false;
  }
  
  // Common global patterns
  const patterns = [
    // US ZIP: 5 digits or 5+4 format
    /^\d{5}(-\d{4})?$/,
    // Canadian: A1A 1A1 format
    /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ][ ]?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
    // UK: Various formats like AA9A 9AA, A9A 9AA, A9 9AA, A99 9AA, AA9 9AA, AA99 9AA
    /^[A-Z]{1,2}\d[A-Z\d]?[ ]?\d[A-Z]{2}$/i,
    // Australia: 4 digits
    /^\d{4}$/,
    // Germany: 5 digits
    /^\d{5}$/,
    // France: 5 digits
    /^\d{5}$/,
    // Japan: 〒123-4567 or 123-4567 or 1234567
    /^(\u3012[ ]?)?\d{3}-\d{4}$|^\d{7}$/,
    // Brazil: 00000-000
    /^\d{5}-\d{3}$/,
    // India: 6 digits
    /^\d{6}$/,
    // China: 6 digits
    /^\d{6}$/,
    // Mexico: 5 digits
    /^\d{5}$/,
    // Italy: 5 digits
    /^\d{5}$/,
    // Spain: 5 digits
    /^\d{5}$/,
    // Netherlands: 1234 AB or 1234AB
    /^\d{4}[ ]?[A-Z]{2}$/i,
    // Switzerland: 4 digits
    /^\d{4}$/,
    // Sweden: 5 digits (SE-123 45 or 123 45)
    /^(SE-)?\d{3}[ ]?\d{2}$/,
    // Denmark: 4 digits
    /^\d{4}$/,
    // Norway: 4 digits
    /^\d{4}$/,
    // Finland: 5 digits
    /^\d{5}$/,
    // Poland: 00-000
    /^\d{2}-\d{3}$/,
    // Czech Republic: 123 45 or 12345
    /^\d{3}[ ]?\d{2}$/,
    // Hungary: 4 digits
    /^\d{4}$/,
    // Austria: 4 digits
    /^\d{4}$/,
    // Portugal: 0000-000 or 0000000
    /^\d{4}-\d{3}$|^\d{7}$/,
    // Ireland: Various formats
    /^[A-Z]\d{2}[ ]?\d[A-Z]{2}$|^[A-Z]{3}[ ]?\d[A-Z]{2}$|^[A-Z]\d[A-Z][ ]?\d[A-Z]{2}$|^[A-Z]{2}\d[A-Z][ ]?\d[A-Z]{2}$/i,
    // Singapore: 6 digits
    /^\d{6}$/,
    // South Korea: 12345 or 123-456
    /^\d{5}$|^\d{3}-\d{3}$/,
    // Taiwan: 3+2 or 3+3 digits
    /^\d{3}(\d{2,3})?$/,
    // New Zealand: 4 digits
    /^\d{4}$/,
    // South Africa: 4 digits
    /^\d{4}$/,
  ];
  
  // Also accept generic numeric codes (2-10 digits)
  const genericNumeric = /^\d{2,10}$/;
  
  // Check against all patterns
  for (const pattern of patterns) {
    if (pattern.test(code)) {
      return true;
    }
  }
  
  // Check generic numeric pattern as fallback
  if (genericNumeric.test(code)) {
    return true;
  }
  
  // Some countries use alphanumeric codes with varying formats
  // This is a more permissive check for edge cases
  const alphanumericPattern = /^[A-Z0-9][A-Z0-9\- ]{1,14}[A-Z0-9]$/i;
  
  if (alphanumericPattern.test(code) && code.length >= 2 && code.length <= 15) {
    // Additional validation to avoid false positives
    // Should contain at least one digit for alphanumeric codes
    if (/\d/.test(code)) {
      return true;
    }
    // Or should be a recognized format like Canadian
    const lettersOnlyPatterns = [
      /^[A-Z]{2,3}[ ]?\d[A-Z]{2}$/i, // UK-like without leading digit
      /^[A-Z]\d[A-Z][ ]?\d[A-Z]{2}$/i, // Canadian-like
    ];
    
    for (const pattern of lettersOnlyPatterns) {
      if (pattern.test(code)) {
        return true;
      }
    }
  }
  
  return false;
}
