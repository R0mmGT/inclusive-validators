function validate(phone) {
  if (typeof phone !== 'string') return false;
  
  // Trim and remove any common formatting characters
  const cleaned = phone.trim()
    .replace(/[\s\-\.\(\)\+]/g, '');
  
  // Empty string is not valid
  if (cleaned.length === 0) return false;
  
  // Check if it contains only digits and optional leading plus
  if (!/^\+?\d+$/.test(cleaned)) return false;
  
  // Check if it has a reasonable length
  // Minimum: 4 digits (like some island nations)
  // Maximum: 15 digits (E.164 standard maximum including country code)
  const digitsOnly = cleaned.replace(/^\+/, '');
  
  if (digitsOnly.length < 4 || digitsOnly.length > 15) return false;
  
  // Additional validation for specific cases:
  
  // If it starts with +, ensure it has at least 2 digits after +
  if (cleaned.startsWith('+') && digitsOnly.length < 2) return false;
  
  // Country code should be 1-3 digits (most are 1-3, some are 4)
  // This is a more lenient check to avoid rejecting valid numbers
  if (cleaned.startsWith('+')) {
    // Extract country code (first 1-4 digits after +)
    const countryCode = digitsOnly.match(/^\d{1,4}/)[0];
    // Check if remaining digits are reasonable (at least 3)
    const remaining = digitsOnly.substring(countryCode.length);
    if (remaining.length < 3) return false;
  }
  
  // Check for obviously invalid patterns (all same digit)
  if (/^(\d)\1+$/.test(digitsOnly)) return false;
  
  return true;
}
