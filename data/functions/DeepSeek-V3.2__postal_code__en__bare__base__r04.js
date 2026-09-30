function validate(postalCode) {
  // Check if input is a string
  if (typeof postalCode !== 'string') {
    return false;
  }
  
  // Trim whitespace
  const trimmedCode = postalCode.trim();
  
  // US/Canadian pattern: 5 digits optionally followed by dash and 4 digits
  const usCanadaPattern = /^\d{5}(-\d{4})?$/;
  
  // UK pattern: Various formats like A9 9AA, A99 9AA, AA9 9AA, etc.
  const ukPattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
  
  // Australian pattern: 4 digits
  const australianPattern = /^\d{4}$/;
  
  // Common international pattern: 5-6 digits
  const internationalPattern = /^\d{5,6}$/;
  
  return usCanadaPattern.test(trimmedCode) || 
         ukPattern.test(trimmedCode) || 
         australianPattern.test(trimmedCode) || 
         internationalPattern.test(trimmedCode);
}
