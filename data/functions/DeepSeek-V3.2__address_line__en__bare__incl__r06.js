function validate(address) {
  // Basic sanity checks
  if (typeof address !== 'string') return false;
  
  const trimmed = address.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.length > 200) return false; // Reasonable length limit
  
  // Check for common invalid patterns
  // Address shouldn't be just numbers or special characters
  if (/^[0-9\s\W]+$/.test(trimmed)) return false;
  
  // Address should contain at least one letter or number
  if (!/[a-zA-Z0-9]/.test(trimmed)) return false;
  
  // Check for reasonable structure
  // Should have at least 2 parts (e.g., "123 Main" not just "Main")
  const parts = trimmed.split(/\s+/).filter(part => part.length > 0);
  if (parts.length < 2) return false;
  
  // Check for common address components globally
  // At least one component should be more than just 1 character
  const hasSubstantialComponent = parts.some(part => part.length > 1);
  if (!hasSubstantialComponent) return false;
  
  // Check against obviously invalid patterns
  const invalidPatterns = [
    /^test\b/i,
    /^\d+$/, // Just numbers
    /^[^a-zA-Z0-9]*$/, // No alphanumeric
    /^(?:undefined|null|NaN)$/i,
    /^https?:\/\//i, // URLs
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, // Email addresses
  ];
  
  if (invalidPatterns.some(pattern => pattern.test(trimmed))) return false;
  
  // Allow international characters for global support
  // Address should contain at least one alphanumeric or international character
  const hasValidCharacter = /[\p{L}\p{N}]/u.test(trimmed);
  if (!hasValidCharacter) return false;
  
  // Check for minimum viable information
  // Should have either:
  // 1. A number followed by some text (common in Western addresses)
  // 2. Text that includes common address indicators globally
  const hasNumberAndText = /\d/.test(trimmed) && /[\p{L}]/u.test(trimmed);
  const hasCommonAddressTerms = /(?:strasse|straße|straat|strada|calle|rue|road|street|avenue|ave|boulevard|blvd|lane|ln|drive|dr|way|plaza|plz|square|sq|аллея|улица|通り|街|路|대로|길)/i.test(trimmed);
  const hasDirectional = /(?:north|south|east|west|n|s|e|w|север|юг|восток|запад|北|南|東|西)/i.test(trimmed);
  const hasBuildingType = /(?:building|bldg|house|apartment|apt|suite|ste|room|rm|floor|fl|楼|棟|빌딩|건물)/i.test(trimmed);
  
  if (!hasNumberAndText && !hasCommonAddressTerms && !hasDirectional && !hasBuildingType) {
    // Some addresses might just be "Main Street" or equivalent in local language
    // Check if it looks like a valid descriptive address
    const descriptivePattern = /^[\p{L}\p{N}][\p{L}\p{N}\s\-,.']{3,}$/iu;
    if (!descriptivePattern.test(trimmed)) return false;
  }
  
  // Final sanity: address shouldn't be just repeating characters
  const uniqueChars = new Set(trimmed.toLowerCase().replace(/\s/g, ''));
  if (uniqueChars.size < 3 && trimmed.length > 10) return false;
  
  return true;
}
