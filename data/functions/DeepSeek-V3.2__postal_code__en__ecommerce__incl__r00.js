function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }
  
  const trimmedCode = postalCode.trim();
  
  if (trimmedCode.length === 0) {
    return false;
  }
  
  // International postal code patterns by country/region
  const patterns = {
    // North America
    'US': /^\d{5}(-\d{4})?$/, // ZIP code
    'CA': /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] ?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
    
    // Europe
    'UK': /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
    'DE': /^\d{5}$/,
    'FR': /^\d{5}$/,
    'ES': /^\d{5}$/,
    'IT': /^\d{5}$/,
    'NL': /^\d{4} ?[A-Z]{2}$/i,
    'BE': /^\d{4}$/,
    'CH': /^\d{4}$/,
    'AT': /^\d{4}$/,
    'DK': /^\d{4}$/,
    'SE': /^\d{3} ?\d{2}$/,
    'NO': /^\d{4}$/,
    'FI': /^\d{5}$/,
    'PL': /^\d{2}-\d{3}$/,
    'CZ': /^\d{3} ?\d{2}$/,
    'SK': /^\d{3} ?\d{2}$/,
    'HU': /^\d{4}$/,
    'RO': /^\d{6}$/,
    'BG': /^\d{4}$/,
    'GR': /^\d{3} ?\d{2}$/,
    'IE': /^[A-Z]\d{2} ?[A-Z0-9]{4}$/i,
    
    // Asia
    'JP': /^\d{3}-\d{4}$/,
    'CN': /^\d{6}$/,
    'IN': /^\d{6}$/,
    'KR': /^\d{5}$/,
    'TW': /^\d{3}(\d{2})?$/,
    'SG': /^\d{6}$/,
    'MY': /^\d{5}$/,
    'TH': /^\d{5}$/,
    'PH': /^\d{4}$/,
    'VN': /^\d{6}$/,
    'ID': /^\d{5}$/,
    
    // Oceania
    'AU': /^\d{4}$/,
    'NZ': /^\d{4}$/,
    
    // Latin America
    'BR': /^\d{5}-\d{3}$/,
    'MX': /^\d{5}$/,
    'AR': /^[A-Z]\d{4}[A-Z]{3}$/i,
    'CL': /^\d{7}$/,
    'CO': /^\d{6}$/,
    'PE': /^\d{5}$/,
    
    // Africa
    'ZA': /^\d{4}$/,
    'EG': /^\d{5}$/,
    'NG': /^\d{6}$/,
    
    // Middle East
    'IL': /^\d{5}$/,
    'SA': /^\d{5}$/,
    'AE': /^\d{5}$/,
    'TR': /^\d{5}$/,
  };
  
  // Minimum universal checks (basic postal code validation)
  // 1. Should not contain only whitespace
  // 2. Should have at least 3 characters (shortest valid postal codes)
  // 3. Should not exceed 10 characters (longest common postal codes)
  // 4. Should contain at least one alphanumeric character
  if (trimmedCode.length < 3 || trimmedCode.length > 10) {
    return false;
  }
  
  // Check if it matches any known pattern
  for (const country in patterns) {
    if (patterns[country].test(trimmedCode)) {
      return true;
    }
  }
  
  // Fallback: generic international pattern
  // Allows alphanumeric with spaces or hyphens, common in many countries
  const genericPattern = /^[A-Z0-9][A-Z0-9\- ]{2,9}$/i;
  
  // Additional check: must contain at least one digit
  const hasDigit = /\d/.test(trimmedCode);
  
  return genericPattern.test(trimmedCode) && hasDigit;
}
