function validate(name) {
  // Basic type and presence check
  if (typeof name !== 'string') return false;
  
  // Trim and check if empty or just whitespace
  const trimmed = name.trim();
  if (trimmed.length === 0) return false;
  
  // Check length boundaries (reasonably long for any name)
  if (trimmed.length > 150) return false;
  
  // Check for minimum of 2 characters (like "Li" or "Al")
  if (trimmed.length < 2) return false;
  
  // Check for at least one space (or hyphen/other valid separators) 
  // to ensure multiple name parts, with some exceptions for mononyms
  const nameParts = trimmed.split(/\s+/);
  
  // Allow mononyms (single names) for cultures where that's common
  // but require at least two characters
  if (nameParts.length === 1) {
    return /^[\p{L}\p{M}\-'’.]+$/u.test(trimmed) && trimmed.length >= 2;
  }
  
  // For multi-part names: validate each part
  for (let part of nameParts) {
    // Allow letters from any alphabet, diacritical marks, hyphens, apostrophes
    if (!/^[\p{L}\p{M}\-'’.]+$/u.test(part)) {
      return false;
    }
    
    // Each part should have at least one letter
    if (!/[\p{L}\p{M}]/u.test(part)) {
      return false;
    }
    
    // Check part length (between 1 and 50 characters)
    if (part.length < 1 || part.length > 50) {
      return false;
    }
    
    // Prevent consecutive special characters
    if (/[\-'’.]{2,}/.test(part)) {
      return false;
    }
    
    // Prevent starting or ending with most special characters
    // Allow apostrophe at start for names like 'O'Connor
    // Allow hyphen at start/end for some cultural names
    if (/^[-\’.]|[-\’.]$/.test(part) && !/^['‘’]/u.test(part)) {
      // Special case: allow hyphen at start/end for names like -San (in some cultures)
      // but generally restrict
      if (!/^[-]|[-]$/.test(part)) {
        return false;
      }
    }
  }
  
  // Additional validation for the full name
  const fullNameRegex = /^[\p{L}\p{M}\s\'‘’\-\.]+$/u;
  if (!fullNameRegex.test(trimmed)) {
    return false;
  }
  
  // Check for excessive spaces or weird spacing
  if (/\s{2,}/.test(name) || /^\s|\s$/.test(name)) {
    // Already handled by trim, but check for leading/trailing spaces in original
    return false;
  }
  
  // Prevent obviously fake or problematic patterns
  const problematicPatterns = [
    /^\d+$/, // Only numbers
    /test/i, // Test names
    /admin/i, // Admin names
    /<script|javascript:/i, // Basic XSS attempts
    /[{}[\]()<>]/ // Curly braces and brackets
  ];
  
  for (const pattern of problematicPatterns) {
    if (pattern.test(trimmed)) {
      return false;
    }
  }
  
  return true;
}
