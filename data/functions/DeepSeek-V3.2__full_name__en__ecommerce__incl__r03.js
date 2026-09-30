function validate(name) {
  // Trim whitespace and check basic constraints
  const trimmedName = name.trim();
  
  // 1. Name cannot be empty
  if (!trimmedName) return false;
  
  // 2. Name must contain at least two parts (for most cultures)
  // but some cultures might use single names - we'll be more flexible
  const nameParts = trimmedName.split(/\s+/);
  
  // 3. Check for minimum and maximum reasonable length
  // Allow single names but with minimum length requirement
  if (nameParts.length === 1) {
    return nameParts[0].length >= 2 && nameParts[0].length <= 70;
  }
  
  // 4. Validate each part
  for (const part of nameParts) {
    // Each part should have reasonable length
    if (part.length < 1 || part.length > 50) return false;
    
    // Check for valid characters
    // Allow letters (including accented characters), apostrophes, hyphens, and periods
    const validCharRegex = /^[\p{L}\p{M}'\-\.\s]+$/u;
    if (!validCharRegex.test(part)) return false;
    
    // Check for consecutive special characters
    if (/['\-\.]{2,}/.test(part)) return false;
    
    // Check for special characters at start/end (with some exceptions)
    if (/^['\-\.]|['\-\.]$/.test(part)) {
      // Allow starting with apostrophe (like O'Connor)
      if (part.startsWith("'")) {
        // But the apostrophe shouldn't be the only character
        if (part.length < 2) return false;
      } else {
        return false;
      }
    }
  }
  
  // 5. Check overall length
  if (trimmedName.length > 100) return false;
  
  // 6. Check for excessive repeating characters
  if (/(.)\1{4,}/.test(trimmedName)) return false;
  
  // 7. Check for common invalid patterns
  // No names consisting only of special characters
  if (/^[\s'\-\.]+$/.test(trimmedName)) return false;
  
  // No email addresses
  if (/@/.test(trimmedName)) return false;
  
  // No URLs
  if (/https?:\/\//i.test(trimmedName)) return false;
  
  // No numbers
  if (/\d/.test(trimmedName)) return false;
  
  // No control characters
  if (/[\x00-\x1F\x7F]/.test(trimmedName)) return false;
  
  // Must contain at least one letter
  if (!/\p{L}/u.test(trimmedName)) return false;
  
  return true;
}
