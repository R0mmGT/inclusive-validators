function validate(address) {
  if (typeof address !== 'string') return false;
  
  const trimmedAddress = address.trim();
  
  // Basic validation
  if (trimmedAddress.length < 3 || trimmedAddress.length > 200) return false;
  
  // Check for empty address (only whitespace or too short)
  if (trimmedAddress.split(/\s+/).length < 2) return false;
  
  // Common patterns found in addresses worldwide
  const patterns = [
    // House number pattern (number followed by optional letter/symbol, or number at end)
    /\d+[A-Za-z]?(\s+|$)/,
    /\b\d+\s*[-/#]?\s*\d*[A-Za-z]?\b/,
    
    // Common address components
    /\b(?:street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln|way|plaza|plz|square|sq|circle|cir|court|ct)\b/i,
    /\b(?:apartment|apt|suite|ste|unit|building|bldg|floor|fl|room|rm|block|blk)\b/i,
    
    // PO Box pattern
    /P\.?O\.?\s*Box\s+\d+/i,
    
    // Common in many countries: number then street name or vice versa
    /^\d+\s+[A-Za-z]/,
    /[A-Za-z]+\s+\d+$/,
    
    // Postal code patterns (various countries)
    /\b\d{3,10}\b/,
    /\b[A-Za-z]{1,3}\d{1,4}[A-Za-z]?\b/,
    
    // Directional indicators (common in many addressing systems)
    /\b(?:north|south|east|west|n|s|e|w)(?:\.|\b)/i,
    
    // Common address formats with special characters
    /№\s*\d+/i,  // Cyrillic/European number indicator
    /#\s*\d+/,   // Number sign common in Americas
    
    // Intersection pattern (common in some regions)
    /\s+&\s+/,
    /\s+and\s+/i,
    
    // Kilometer markers (common in rural areas)
    /km\s*\d+/i,
  ];
  
  // Check for at least one address-like pattern
  const hasPattern = patterns.some(pattern => pattern.test(trimmedAddress));
  
  // Additional heuristic: check for common address structure
  const words = trimmedAddress.split(/\s+/);
  const hasNumber = words.some(word => /\d/.test(word));
  const hasLetter = words.some(word => /[A-Za-z]/.test(word));
  
  // Valid if it has a pattern OR has both numbers and letters (common in addresses)
  const hasValidStructure = hasPattern || (hasNumber && hasLetter);
  
  // Check for obviously invalid content (email, URL, etc.)
  const invalidPatterns = [
    /@/,                         // Email addresses
    /https?:\/\//,              // URLs
    /\.(com|org|net|edu|gov)\b/i, // Website domains
    /^\d+$/,                     // Only numbers
    /^[A-Za-z]+$/,               // Only letters
    /[<>\[\]{}|\\^~]/           // Unusual characters for addresses
  ];
  
  const hasInvalidContent = invalidPatterns.some(pattern => pattern.test(trimmedAddress));
  
  // Final validation: reasonable length, valid structure, no invalid content
  return hasValidStructure && !hasInvalidContent;
}
