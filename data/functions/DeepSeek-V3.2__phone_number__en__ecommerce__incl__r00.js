function validate(phoneNumber) {
  // Remove all whitespace and common separators
  const cleaned = phoneNumber.replace(/[\s\-\.\(\)\+]/g, '');
  
  // Empty string or non-digit characters after cleaning
  if (cleaned.length === 0 || /[^\d]/.test(cleaned)) {
    return false;
  }
  
  // Check for minimum length (at least 4 digits, e.g., Iceland's short numbers)
  // and maximum length (15 digits as per ITU E.164 standard)
  if (cleaned.length < 4 || cleaned.length > 15) {
    return false;
  }
  
  // Prevent numbers that start with 0 but don't have proper country code format
  // (this allows leading 0 for countries with trunk prefix if number length is reasonable)
  // However, international format starting with + should have been cleaned to start with country code
  
  // Check for repeated digits pattern that might be invalid
  if (/^(\d)\1{9,}$/.test(cleaned)) {
    return false;
  }
  
  // Country-specific validations could be added here, but for global validation
  // we stick to basic length and digit checks
  
  return true;
}
