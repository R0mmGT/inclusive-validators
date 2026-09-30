function validate(postalCode) {
  // Check if input is a string
  if (typeof postalCode !== 'string') return false;
  
  // Trim whitespace from both ends
  postalCode = postalCode.trim();
  
  // Empty string check
  if (postalCode.length === 0) return false;
  
  // US ZIP code pattern: 5 digits or 5 digits + hyphen + 4 digits
  const usPattern = /^\d{5}(-\d{4})?$/;
  
  // Canadian postal code pattern: A1A 1A1 (letter-digit-letter digit-letter-digit)
  const caPattern = /^[A-Z]\d[A-Z] \d[A-Z]\d$/i;
  
  // UK postcode patterns (simplified)
  const ukPatterns = [
    /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,  // Standard: SW1A 1AA
    /^[A-Z]\d \d[A-Z]{2}$/i,               // Format: W1A 1AA
    /^[A-Z]{2}\d{1,2} \d[A-Z]{2}$/i,       // Format: CR2 6XH
    /^[A-Z]{2}\d[A-Z] \d[A-Z]{2}$/i,       // Format: EH10 4SB
  ];
  
  // Australian postcode pattern: 4 digits
  const auPattern = /^\d{4}$/;
  
  // Check against patterns
  return usPattern.test(postalCode) ||
         caPattern.test(postalCode) ||
         ukPatterns.some(pattern => pattern.test(postalCode)) ||
         auPattern.test(postalCode);
}
