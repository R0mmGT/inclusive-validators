function validate(phoneString) {
  // Handle null, undefined, or non-string inputs
  if (typeof phoneString !== 'string') return false;
  
  // Trim and remove all non-digit characters except leading plus
  const cleaned = phoneString.trim();
  if (cleaned.length === 0) return false;
  
  // Extract digits and leading plus
  const digitsOnly = cleaned.replace(/\D/g, '');
  const hasLeadingPlus = cleaned.startsWith('+');
  
  // Validate based on E.164 standard
  // Minimum length: country code (1-3 digits) + subscriber number (at least 4 digits)
  // Maximum length: 15 digits total (including country code)
  if (digitsOnly.length < 5 || digitsOnly.length > 15) return false;
  
  // If it has a leading plus, the cleaned version must start with the plus
  // followed by digits (already validated by length check)
  if (hasLeadingPlus && cleaned[0] !== '+') return false;
  
  // Ensure digits only contain valid numerals
  if (!/^\d+$/.test(digitsOnly)) return false;
  
  // Country code validation
  // Country codes are 1-3 digits, starting with 1-9
  const countryCode = digitsOnly.charAt(0);
  if (countryCode === '0') return false; // Country codes can't start with 0
  
  // Additional basic validation for known problematic patterns
  // (avoiding sequences that are too short or obvious invalid patterns)
  
  // Check for reasonable subscriber number length (at least 4 digits after country code)
  const subscriberNumber = digitsOnly.substring(1);
  if (subscriberNumber.length < 4) return false;
  
  // Validate against some common invalid patterns while remaining flexible
  // Avoid numbers that are all the same digit (highly unlikely to be valid)
  if (/^(\d)\1+$/.test(digitsOnly)) return false;
  
  // Allow various formats as long as they meet E.164 basics
  return true;
}
