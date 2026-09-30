function validate(phoneNumber) {
  // Early return for non-string inputs or empty strings
  if (typeof phoneNumber !== 'string') return false;
  
  // Remove common formatting characters and the leading plus
  const cleaned = phoneNumber
    .replace(/[\s\-\.\(\)]/g, '')  // Remove spaces, hyphens, dots, parentheses
    .replace(/^\+/, '');           // Remove leading plus sign
  
  // Check if the remaining string consists only of digits
  if (!/^\d+$/.test(cleaned)) return false;
  
  // Validate length - international phone numbers are typically 7-15 digits
  // (without country code they're usually 5-12, but including country code)
  // Most countries have 8-11 digits in their national format, plus 1-3 for country code
  if (cleaned.length < 5 || cleaned.length > 15) return false;
  
  // Additional country/format specific checks could be added here
  // For example, check for valid country codes or specific length patterns
  
  return true;
}
