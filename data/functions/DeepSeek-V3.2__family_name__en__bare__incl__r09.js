const validate = (lastName) => {
  // Basic sanity checks
  if (typeof lastName !== 'string') return false;
  
  // Remove surrounding whitespace
  const trimmed = lastName.trim();
  
  // Length validation (1-100 characters allows for most cultural naming conventions)
  if (trimmed.length === 0 || trimmed.length > 100) return false;
  
  // Check for empty strings after trimming
  if (trimmed === '') return false;
  
  // Disallow strings that consist only of whitespace, digits, or special characters
  if (/^[\s\d\p{P}\p{S}]+$/u.test(trimmed)) return false;
  
  // Allow letters (including extended Unicode), spaces, hyphens, apostrophes
  // and common surname connectors from various cultures
  const validPattern = /^[\p{L}\s\-\'\.\u00B7\u0387\u05F3\u2022\u2027](?:[\p{L}\s\-\'\.\u00B7\u0387\u05F3\u2022\u2027]|\(.*\))*$/u;
  
  if (!validPattern.test(trimmed)) return false;
  
  // Disallow patterns that look like HTML tags or scripts
  const dangerousPatterns = [
    /<[^>]*>/,
    /javascript:/i,
    /on\w+\s*=/i,
    /&#?[xX]?[0-9a-fA-F]+;/
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(trimmed)) return false;
  }
  
  // Must contain at least one letter character
  if (!/\p{L}/u.test(trimmed)) return false;
  
  // Check for excessive repeating characters (like "aaaaaaa")
  if (/(.)\1{10,}/.test(trimmed)) return false;
  
  // Check for balanced parentheses if they exist
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens) return false;
  
  // Allow names with multiple parts (like "van der Berg" or "de la Cruz")
  // but ensure they don't start or end with connectors in a problematic way
  const parts = trimmed.split(/[\s\-]+/);
  
  // Each part should contain at least one letter
  for (const part of parts) {
    const cleanedPart = part.replace(/[\.\'\(\)]/g, '');
    if (cleanedPart.length > 0 && !/\p{L}/u.test(cleanedPart)) {
      return false;
    }
  }
  
  // Additional cultural validations
  // Allow Irish names with "O'", Scottish with "Mc", "Mac", etc.
  // Allow names with particles like "van", "de", "di", "bin", "al-"
  // These are already covered by the Unicode letter pattern
  
  return true;
};
