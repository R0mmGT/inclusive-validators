function validate(phoneString) {
  if (typeof phoneString !== 'string') return false;
  
  // Trim whitespace and remove common visual separators
  const normalized = phoneString.trim()
    .replace(/[\s\-\.()]/g, '');
  
  // Check if string is empty after normalization
  if (normalized.length === 0) return false;
  
  // Check for international prefix variants
  const hasPlusPrefix = normalized.startsWith('+');
  const hasDoubleZeroPrefix = normalized.startsWith('00');
  
  // Remove international prefixes for digit validation
  let digitsOnly = normalized;
  if (hasPlusPrefix) {
    digitsOnly = normalized.substring(1);
  } else if (hasDoubleZeroPrefix) {
    digitsOnly = normalized.substring(2);
  }
  
  // Validate remaining characters are only digits
  if (!/^\d+$/.test(digitsOnly)) return false;
  
  // Country code validation (after + or 00)
  let countryCodePart = '';
  if (hasPlusPrefix || hasDoubleZeroPrefix) {
    // Extract potential country code (1-3 digits typically)
    countryCodePart = digitsOnly.substring(0, Math.min(3, digitsOnly.length));
    const countryCode = parseInt(countryCodePart, 10);
    
    // Basic country code range check (1-999)
    // Note: Actual valid codes are 1-3 digits, but we're being lenient
    if (countryCode < 1 || countryCode > 999) return false;
    
    // Check minimum length after country code
    const numberWithoutCC = digitsOnly.substring(countryCodePart.length);
    if (numberWithoutCC.length < 4) return false; // Too short for national number
  } else {
    // Local format (no international prefix)
    // Must have reasonable length for national numbers (typically 5-15 digits)
    if (digitsOnly.length < 5 || digitsOnly.length > 15) return false;
  }
  
  // Overall length check (including international prefix)
  // ITU E.164 maximum is 15 digits plus '+' prefix
  const totalDigits = digitsOnly.length;
  const maxDigits = 15;
  const minDigits = hasPlusPrefix || hasDoubleZeroPrefix ? 7 : 5; // Country code + national number
  
  if (totalDigits > maxDigits || totalDigits < minDigits) return false;
  
  return true;
}
