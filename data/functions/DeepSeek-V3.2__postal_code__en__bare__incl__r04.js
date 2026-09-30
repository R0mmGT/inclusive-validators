function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }
  
  const code = postalCode.trim();
  
  if (code.length < 2 || code.length > 10) {
    return false;
  }
  
  // Basic universal patterns
  const universalPatterns = [
    /^\d{5}$/,                       // US, China (simple), many others
    /^\d{6}$/,                       // India, Russia, many others
    /^\d{4}$/,                       // Norway, Denmark, etc.
    /^\d{7}$/,                       // Iran, etc.
    /^\d{3}\s?\d{2}$/,               // Sweden, Iceland (NNN NN)
    /^\d{3}-\d{2}$/,                 // Sweden with dash
    /^\d{2}\s?\d{3}$/,               // Poland (NN NNN)
    /^\d{2}-\d{3}$/,                 // Poland with dash
    /^\d{4}\s?\d{3}$/,               // South Africa (NNNN NNN)
    /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/,    // Canada (ANA NAN)
    /^[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}$/, // UK (various formats)
    /^\d{5}-\d{3}$/,                 // Brazil (NNNNN-NNN)
    /^\d{3}\s?\d{4}$/,               // Thailand, Taiwan
    /^[A-Z]{2}\d{4}$/,               // Netherlands (NNNN LL)
    /^\d{3}-\d{4}$/,                 // Japan (NNN-NNNN)
    /^\d{4}$/,                       // Australia (for PO boxes)
    /^\d{4}\s?\d{3}$/,               // Portugal
    /^[A-Z]{3}\s?\d{2}[A-Z]$/,       // Argentina
    /^\d{5} \d{3}$/,                 // France (additional codes)
  ];
  
  // Allow alphanumeric with common separators (space, dash)
  const normalized = code.toUpperCase();
  
  // Check if matches any known pattern
  for (const pattern of universalPatterns) {
    if (pattern.test(normalized)) {
      return true;
    }
  }
  
  // Generic validation for remaining cases
  // Must contain at least one digit
  if (!/\d/.test(normalized)) {
    return false;
  }
  
  // Allow only alphanumeric characters and common separators
  if (!/^[A-Z0-9\s\-]+$/.test(normalized)) {
    return false;
  }
  
  // At least 2 characters, at most 10, with reasonable digit count
  const digitCount = (normalized.match(/\d/g) || []).length;
  const letterCount = (normalized.match(/[A-Z]/g) || []).length;
  
  return digitCount >= 2 && digitCount <= 8 && 
         letterCount <= 4 && 
         (digitCount + letterCount) >= 3;
}
