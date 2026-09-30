function validate(address) {
  // Input type check
  if (typeof address !== 'string') return false;
  
  // Remove leading/trailing whitespace
  const trimmed = address.trim();
  
  // Basic sanity checks
  if (trimmed.length === 0) return false;
  if (trimmed.length > 200) return false; // Reasonable upper limit
  
  // Check for common invalid patterns
  const invalidPatterns = [
    /^\s*test\s*$/i, // Just "test"
    /^\s*[0-9\s\-\.]+\s*$/, // Only numbers and separators
    /^\s*[^a-z0-9]+$/i, // Only non-alphanumeric characters
    /^[,\-\s\.]+$/, // Only separators
    /^x+$/i, // Just "x" repeated
    /^\.+$/, // Just dots
    /^\-+$/, // Just dashes
  ];
  
  if (invalidPatterns.some(pattern => pattern.test(trimmed))) {
    return false;
  }
  
  // Check character diversity - ensure there's meaningful content
  const alphanumericCount = (trimmed.match(/[a-z0-9]/gi) || []).length;
  if (alphanumericCount < 2) return false; // Need at least 2 alphanumeric chars
  
  // Check for at least some letters or numbers with context
  // Addresses should have either building number or street name elements
  const hasLetters = /[a-z]/i.test(trimmed);
  const hasNumbers = /[0-9]/.test(trimmed);
  
  // Valid addresses typically have either:
  // 1. Numbers + letters (e.g., "123 Main St")
  // 2. Only letters but with multiple words (e.g., "Main Street" in some locales)
  // 3. Only numbers but with separators and context (e.g., "123-456" in some Asian addresses)
  
  if (!hasLetters && !hasNumbers) return false;
  
  if (!hasLetters && hasNumbers) {
    // Numbers-only addresses should have separators or multiple number groups
    const numberGroups = trimmed.match(/[0-9]+/g) || [];
    if (numberGroups.length < 2 && !/[\/\-\.,\s]/.test(trimmed)) {
      return false;
    }
  }
  
  if (!hasNumbers && hasLetters) {
    // Letters-only addresses should have multiple words
    const words = trimmed.split(/[\s\-\.,]+/).filter(w => w.length > 0);
    if (words.length < 2) {
      // Single word addresses are rarely valid except for very specific cases
      // Check if it's a common single-word street type (unlikely to be valid alone)
      const singleWordExceptions = [
        'avenue', 'street', 'road', 'boulevard', 'lane', 'drive',
        'platz', 'straße', 'rue', 'calle', 'ulica', 'chuo'
      ];
      const lowerTrimmed = trimmed.toLowerCase();
      if (!singleWordExceptions.some(word => lowerTrimmed.includes(word))) {
        return false;
      }
    }
  }
  
  // Check for reasonable structure - should contain spaces or common separators
  // unless it's a very short address (which we already filtered)
  if (trimmed.length > 10) {
    const hasSeparators = /[\s\-\.,\/]/.test(trimmed);
    if (!hasSeparators) {
      // Long strings without separators are suspicious
      return false;
    }
  }
  
  // Check for excessive repetition
  const repeatedCharRegex = /(.)\1{10,}/; // Same character repeated 10+ times
  if (repeatedCharRegex.test(trimmed)) return false;
  
  // Check for reasonable word lengths
  const words = trimmed.split(/[\s\-\.,]+/).filter(w => w.length > 0);
  for (const word of words) {
    if (word.length > 30) return false; // Unreasonably long word
  }
  
  // Passed all validation checks
  return true;
}
