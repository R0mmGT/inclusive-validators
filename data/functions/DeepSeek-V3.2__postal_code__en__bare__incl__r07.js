function validate(postalCode) {
  if (typeof postalCode !== 'string') return false;
  
  // Remove all whitespace from the input
  const code = postalCode.replace(/\s/g, '');
  
  // Empty string is not valid
  if (code.length === 0) return false;
  
  // Generic validation patterns for different regions
  const patterns = [
    // North America: US (5 digits or 5+4) and Canada (A#A #A# or A#A#A#)
    /^\d{5}(-\d{4})?$/, // US
    /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z][-\s]?\d[A-CEGHJ-NPR-TV-Z]\d$/i, // Canada
    
    // Europe: UK (various formats), Germany (5 digits), France (5 digits), etc.
    /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i, // UK
    /^\d{5}$/, // Germany, France, Austria, etc.
    /^\d{4}$/, // Norway, Denmark
    /^\d{3}\s?\d{2}$/, // Sweden
    /^\d{4}[A-Z]{2}$/i, // Netherlands
    /^\d{4}-\d{3}$/, // Portugal
    
    // Asia
    /^\d{6}$/, // China, India
    /^\d{3}-\d{4}$/, // Japan
    /^\d{5}$/, // South Korea, Taiwan
    /^\d{4}$/, // Singapore
    
    // Oceania
    /^\d{4}$/, // Australia
    
    // Latin America
    /^\d{5}$/, // Mexico, Brazil
    /^\d{4}$/, // Argentina
    
    // Special cases for small countries with letters
    /^[A-Z]{3}\s?\d{4}$/i, // Bermuda
    /^[A-Z]{2}\d{5}$/i, // Malta
  ];
  
  // Check if code matches any known pattern
  for (const pattern of patterns) {
    if (pattern.test(code)) {
      return true;
    }
  }
  
  // Additional logic for edge cases
  // Some countries have postal codes that are just numeric
  if (/^\d+$/.test(code)) {
    const len = code.length;
    // Accept numeric codes between 3-7 digits (common range worldwide)
    if (len >= 3 && len <= 7) {
      return true;
    }
  }
  
  // Some countries have alphanumeric codes
  if (/^[A-Z0-9]+$/i.test(code)) {
    const len = code.length;
    // Accept alphanumeric codes between 3-10 characters
    if (len >= 3 && len <= 10) {
      // Ensure it's not just letters (must contain at least one digit)
      if (/\d/.test(code)) {
        return true;
      }
    }
  }
  
  return false;
}
