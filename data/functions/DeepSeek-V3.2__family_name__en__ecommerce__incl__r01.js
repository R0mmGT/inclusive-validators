function validate(lastName) {
  // Handle edge cases
  if (typeof lastName !== 'string') {
    return false;
  }
  
  const trimmedName = lastName.trim();
  
  // Check for empty string or whitespace only
  if (trimmedName.length === 0) {
    return false;
  }
  
  // Check minimum and reasonable maximum length
  if (trimmedName.length < 1 || trimmedName.length > 100) {
    return false;
  }
  
  // Check for control characters or dangerous patterns
  if (/[\x00-\x1F\x7F]/.test(trimmedName)) {
    return false;
  }
  
  // Check for excessive repetition which could be spam/attack
  if (/(.)\1{10,}/.test(trimmedName)) {
    return false;
  }
  
  // Base validation: Allow letters from multiple scripts, spaces, hyphens, apostrophes
  // This covers most international names while being restrictive enough
  const validPattern = /^[\p{L}\p{M}\s.'\-]+$/u;
  
  if (!validPattern.test(trimmedName)) {
    return false;
  }
  
  // Additional sanity checks
  // Should contain at least one letter character (not just symbols/spaces)
  if (!/[\p{L}\p{M}]/u.test(trimmedName)) {
    return false;
  }
  
  // Check for balanced quotes if present
  const apostropheCount = (trimmedName.match(/'/g) || []).length;
  const quoteCount = (trimmedName.match(/"/g) || []).length;
  
  if (quoteCount > 0) {
    return false; // Disallow straight quotes in last names
  }
  
  // Check for valid use of hyphens and apostrophes (not at start/end/adjacent)
  if (/^[-.']|[-.']$|[-.]{2,}|[']{2,}/.test(trimmedName)) {
    return false;
  }
  
  // Check for mixed script usage that might indicate gibberish
  // This is more permissive but flags obvious gibberish
  const scripts = new Set();
  const scriptRegex = /\p{Script=(\w+)}/gu;
  let match;
  
  while ((match = scriptRegex.exec(trimmedName)) !== null) {
    scripts.add(match[1]);
  }
  
  // If we detect more than 3 different scripts, it's likely invalid
  if (scripts.size > 3) {
    return false;
  }
  
  return true;
}
