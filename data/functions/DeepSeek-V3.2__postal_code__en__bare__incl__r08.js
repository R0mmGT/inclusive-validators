function validate(postalCode) {
  // Handle null, undefined, or non-string inputs
  if (typeof postalCode !== 'string') {
    return false;
  }
  
  // Remove spaces, hyphens, and other common separators
  const normalized = postalCode.replace(/[\s\-\.]/g, '');
  
  // Check if the normalized string is empty or too long
  if (normalized.length === 0 || normalized.length > 10) {
    return false;
  }
  
  // Check if the string contains only valid characters
  // Alphanumeric plus allowed special characters found in postal codes
  if (!/^[A-Z0-9\-\s]+$/i.test(postalCode)) {
    return false;
  }
  
  // Country-specific validations
  const countryPatterns = {
    // United States: 5 digits, optional dash+4 digits
    'US': /^\d{5}(-\d{4})?$/,
    // Canada: A1A 1A1 format
    'CA': /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
    // United Kingdom: Various complex formats, basic validation
    'GB': /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
    // Australia: 4 digits
    'AU': /^\d{4}$/,
    // Germany: 5 digits
    'DE': /^\d{5}$/,
    // France: 5 digits
    'FR': /^\d{5}$/,
    // Japan: 3 digits dash 4 digits
    'JP': /^\d{3}-\d{4}$/,
    // Brazil: 5 digits dash 3 digits
    'BR': /^\d{5}-\d{3}$/,
    // India: 6 digits
    'IN': /^\d{6}$/,
    // China: 6 digits
    'CN': /^\d{6}$/,
    // Russia: 6 digits
    'RU': /^\d{6}$/,
    // Mexico: 5 digits
    'MX': /^\d{5}$/,
    // Italy: 5 digits
    'IT': /^\d{5}$/,
    // Spain: 5 digits
    'ES': /^\d{5}$/,
    // Netherlands: 4 digits, 2 letters (no IO, SS, SD)
    'NL': /^\d{4}\s?[A-Z]{2}$/i,
    // Sweden: 3 digits space 2 digits
    'SE': /^\d{3}\s\d{2}$/,
    // Switzerland: 4 digits
    'CH': /^\d{4}$/,
  };
  
  // Try to match against any country pattern
  for (const pattern of Object.values(countryPatterns)) {
    if (pattern.test(normalized) || pattern.test(postalCode)) {
      return true;
    }
  }
  
  // If no country pattern matched, apply general rules
  // Must contain at least one digit
  if (!/\d/.test(normalized)) {
    return false;
  }
  
  // General length check for most postal codes (3-10 characters after normalization)
  if (normalized.length < 3 || normalized.length > 10) {
    return false;
  }
  
  // Additional general validation:
  // Shouldn't contain repeating sequences that look invalid
  const repeatingPattern = /^(\d)\1+$/;
  if (repeatingPattern.test(normalized)) {
    return false;
  }
  
  // Final check: ensure it looks like a plausible postal code
  // Mixed alphanumeric or all digits with reasonable length
  const plausiblePattern = /^([A-Z]?\d[A-Z\d]*|\d+[A-Z]?[A-Z\d]*)$/i;
  return plausiblePattern.test(normalized);
}
