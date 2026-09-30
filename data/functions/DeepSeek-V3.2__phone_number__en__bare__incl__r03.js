const validate = (phoneString) => {
  // Remove all non-digit characters except leading plus
  const stripped = phoneString.replace(/[^\d\+]/g, '');
  
  // Basic sanity checks
  if (!phoneString || typeof phoneString !== 'string') return false;
  if (stripped.length < 4) return false; // Shortest valid numbers are ~4 digits
  if (stripped.length > 20) return false; // Reasonable upper bound

  // Check for valid international format
  if (stripped.startsWith('+')) {
    // International format: + followed by country code (1-3 digits) and subscriber number
    const withoutPlus = stripped.slice(1);
    if (!/^\d+$/.test(withoutPlus)) return false; // Only digits after +
    if (withoutPlus.length < 4) return false;
    
    // Country codes are 1-3 digits (ITU-T E.164 recommendation)
    const countryCodeMatch = withoutPlus.match(/^(\d{1,3})/);
    if (!countryCodeMatch) return false;
    
    // Country code validation (not exhaustive but covers major ranges)
    const countryCode = countryCodeMatch[1];
    // Known invalid country codes (e.g., reserved codes)
    const invalidCountryCodes = ['0', '1', '100', '101', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149'];
    if (invalidCountryCodes.includes(countryCode)) return false;
    
    // Subscriber number after country code should be reasonable length
    const subscriberNumber = withoutPlus.slice(countryCode.length);
    if (subscriberNumber.length < 3) return false;
    if (subscriberNumber.length > 15) return false;
    
    // Check for at least some digit variation (not all same digit)
    if (/^(\d)\1+$/.test(subscriberNumber)) return false;
    
    return true;
  }
  
  // National format (no leading +)
  if (!/^\d+$/.test(stripped)) return false;
  
  // Check for reasonable national number length (varies by country, but general range)
  if (stripped.length < 4 || stripped.length > 15) return false;
  
  // Check for at least some digit variation (not all same digit)
  if (/^(\d)\1+$/.test(stripped)) return false;
  
  // Check for common invalid patterns (like test numbers)
  const invalidPatterns = [
    /^1234567890$/,
    /^0123456789$/,
    /^1111111111$/,
    /^2222222222$/,
    /^3333333333$/,
    /^4444444444$/,
    /^5555555555$/,
    /^6666666666$/,
    /^7777777777$/,
    /^8888888888$/,
    /^9999999999$/,
    /^0000000000$/,
  ];
  
  for (const pattern of invalidPatterns) {
    if (pattern.test(stripped)) return false;
  }
  
  return true;
};
