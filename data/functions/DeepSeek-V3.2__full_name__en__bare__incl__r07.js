function validate(name) {
  // Trim and check for empty or whitespace-only strings
  const trimmed = name.trim();
  if (trimmed.length === 0) return false;
  
  // Check for reasonable length (1-100 characters)
  if (trimmed.length > 100) return false;
  
  // Split into parts by whitespace
  const parts = trimmed.split(/\s+/);
  
  // Must have at least two parts
  if (parts.length < 2) return false;
  
  // Check each part
  for (let part of parts) {
    // Each part must contain at least one letter
    if (!/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/.test(part)) return false;
    
    // Check for reasonable part length (1-30 characters)
    if (part.length > 30) return false;
    
    // Must not consist only of digits or special characters
    if (/^[\d\s\W_]+$/.test(part)) return false;
    
    // Should not contain consecutive non-letter characters
    if (/[^\p{L}\s'-]{2,}/u.test(part)) return false;
  }
  
  // Check for common invalid patterns
  const invalidPatterns = [
    /^\d/,  // Starting with digit
    /@/,    // Contains email character
    /\.com$|\.net$|\.org$/i,  // Looks like a domain
    /\b(test|example|dummy)\b/i,  // Common test names
    /[<>{}[\]|\\^~]/  // Dangerous characters
  ];
  
  for (let pattern of invalidPatterns) {
    if (pattern.test(trimmed)) return false;
  }
  
  // Allow for various naming conventions
  // This includes names with hyphens, apostrophes, multiple middle names, etc.
  return true;
}
