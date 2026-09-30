function validate(phone) {
  // Handle null, undefined, or non-string inputs
  if (typeof phone !== 'string') {
    return false;
  }
  
  // Remove all whitespace, hyphens, dots, parentheses, and plus signs for basic cleaning
  // Keep the plus sign for international format detection
  let cleaned = phone.trim();
  
  // Remove common separators: spaces, dots, dashes, parentheses
  cleaned = cleaned.replace(/[\s\.\-\(\)]/g, '');
  
  // Empty string is not valid
  if (cleaned.length === 0) {
    return false;
  }
  
  // International format check: must start with + followed by digits
  if (cleaned.startsWith('+')) {
    // Remove the + for digit validation
    const digitsOnly = cleaned.substring(1);
    
    // International numbers should have 1-3 digits for country code and at least 4 digits for local number
    // Minimum total: country code (1-3) + area code + local number = ~7+ digits
    // Maximum: ITU-E.164 allows up to 15 digits after the +
    if (!/^\d+$/.test(digitsOnly) || digitsOnly.length < 7 || digitsOnly.length > 15) {
      return false;
    }
    
    // Country codes are 1-3 digits
    // First 1-3 digits after + should be a valid country code (1-999)
    const countryCode = digitsOnly.match(/^\d{1,3}/)[0];
    const countryCodeNum = parseInt(countryCode, 10);
    
    // Country codes should be between 1 and 999 inclusive
    if (countryCodeNum < 1 || countryCodeNum > 999) {
      return false;
    }
    
    // The remaining digits after country code should be at least 4 digits
    const remainingDigits = digitsOnly.substring(countryCode.length);
    if (remainingDigits.length < 4) {
      return false;
    }
    
    return true;
  }
  
  // Domestic format: only digits, possibly with leading zero
  if (!/^\d+$/.test(cleaned)) {
    return false;
  }
  
  // Domestic numbers typically range from 5 to 15 digits
  // Some countries have very short numbers (e.g., 911), but for registration
  // we expect a full phone number, so we use a reasonable range
  if (cleaned.length < 5 || cleaned.length > 15) {
    return false;
  }
  
  // Additional check: leading zero for domestic international format in some countries
  // is acceptable, but should be followed by more digits
  
  return true;
}
