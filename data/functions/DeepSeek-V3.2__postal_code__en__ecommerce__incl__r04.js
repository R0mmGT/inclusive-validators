function validate(postalCode) {
  // Handle edge cases
  if (typeof postalCode !== 'string') return false;
  if (postalCode.trim().length === 0) return false;
  
  const trimmedCode = postalCode.trim();
  
  // Country-specific validation patterns
  const patterns = {
    // United States: 5 digits or 5+4 format
    US: /^\d{5}(-\d{4})?$/,
    // Canada: A1A 1A1 format
    CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
    // United Kingdom: Various formats (simplified)
    UK: /^(GIR 0AA|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i,
    // Australia: 4 digits
    AU: /^\d{4}$/,
    // Germany: 5 digits
    DE: /^\d{5}$/,
    // France: 5 digits
    FR: /^\d{5}$/,
    // Japan: 〒123-4567 or 123-4567 format
    JP: /^(\d{3}-\d{4}|〒\d{3}-\d{4})$/,
    // Brazil: 5 digits + optional -3 digits
    BR: /^\d{5}(-\d{3})?$/,
    // India: 6 digits
    IN: /^\d{6}$/,
    // China: 6 digits
    CN: /^\d{6}$/,
    // Russia: 6 digits
    RU: /^\d{6}$/,
    // Mexico: 5 digits
    MX: /^\d{5}$/,
    // Italy: 5 digits
    IT: /^\d{5}$/,
    // Spain: 5 digits
    ES: /^\d{5}$/,
    // South Korea: 5 digits or 3+3 format
    KR: /^(\d{5}|\d{3}-\d{3})$/,
    // Argentina: 4 digits or A1234ABC format
    AR: /^(\d{4}|[A-Z]\d{4}[A-Z]{3})$/i,
    // Netherlands: 4 digits + 2 letters
    NL: /^\d{4} ?[A-Z]{2}$/i,
    // Switzerland: 4 digits
    CH: /^\d{4}$/,
    // Sweden: 5 digits
    SE: /^\d{5}$/,
    // Norway: 4 digits
    NO: /^\d{4}$/,
    // Denmark: 4 digits
    DK: /^\d{4}$/,
    // Finland: 5 digits
    FI: /^\d{5}$/,
    // Poland: 2 digits - 3 digits
    PL: /^\d{2}-\d{3}$/,
    // Czech Republic: 3 digits + space + 2 digits
    CZ: /^\d{3} ?\d{2}$/,
    // Portugal: 4 digits + hyphen + 3 digits
    PT: /^\d{4}-\d{3}$/,
    // Turkey: 5 digits
    TR: /^\d{5}$/,
    // Saudi Arabia: 5 digits
    SA: /^\d{5}$/,
    // South Africa: 4 digits
    ZA: /^\d{4}$/,
    // New Zealand: 4 digits
    NZ: /^\d{4}$/,
    // Ireland: Various formats (simplified)
    IE: /^([A-Z]\d{2}|[A-Z]{3}|[A-Z]\d[A-Z]|[A-Z]{2}\d) ?[A-Z\d]{4}$/i
  };
  
  // Universal pattern - accepts common formats without strict country validation
  const universalPatterns = [
    // 4-6 digit codes (most common)
    /^\d{4,6}$/,
    // 5 digits with optional dash + 4 (US style)
    /^\d{5}(-\d{4})?$/,
    // Alphanumeric with spaces/dashes (UK, Canada, Netherlands, etc.)
    /^[A-Z\d]{3,} ?[A-Z\d]{3,}$/i,
    // Postal codes with country prefixes (like JP)
    /^[A-Z]{1,3}\d{1,2}[- ]?\d{1,2}[A-Z\d]{0,3}$/i,
    // Patterns with dashes
    /^\d{3,5}-\d{2,4}$/
  ];
  
  // First try country-specific patterns
  for (const pattern of Object.values(patterns)) {
    if (pattern.test(trimmedCode)) {
      return true;
    }
  }
  
  // Then try universal patterns
  for (const pattern of universalPatterns) {
    if (pattern.test(trimmedCode)) {
      return true;
    }
  }
  
  // Additional length and content checks for flexibility
  const codeLength = trimmedCode.replace(/[^A-Z\d]/gi, '').length;
  const hasLetters = /[A-Z]/i.test(trimmedCode);
  const hasDigits = /\d/.test(trimmedCode);
  
  // Accept codes that are 3-10 alphanumeric characters
  // This catches many formats not explicitly listed
  if (codeLength >= 3 && codeLength <= 10) {
    if (hasDigits && (hasLetters || !hasLetters)) {
      // Ensure it's not just special characters
      const alnumCount = (trimmedCode.match(/[A-Z\d]/gi) || []).length;
      if (alnumCount >= 3) {
        return true;
      }
    }
  }
  
  return false;
}
