function validate(name) {
  // Basic validation rules for a person's first name
  if (typeof name !== 'string') {
    return false;
  }

  const trimmedName = name.trim();
  
  // Check minimum and maximum reasonable length
  if (trimmedName.length < 1 || trimmedName.length > 50) {
    return false;
  }

  // Must start with a letter (including international characters)
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]/.test(trimmedName)) {
    return false;
  }

  // Allow letters, spaces, hyphens, and apostrophes (for names like "Mary-Jane" or "O'Connor")
  // Includes Unicode letters for international names
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'.-]+$/.test(trimmedName)) {
    return false;
  }

  // Cannot start or end with punctuation or spaces
  if (/^[\s'.-]|[\s'.-]$/.test(trimmedName)) {
    return false;
  }

  // Cannot have consecutive punctuation or spaces
  if (/[\s'.-]{2,}/.test(trimmedName)) {
    return false;
  }

  // Must contain at least one letter
  if (!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(trimmedName)) {
    return false;
  }

  // Cannot be only spaces or punctuation
  if (!trimmedName.replace(/[\s'.-]/g, '').length) {
    return false;
  }

  // Additional validation: Some common invalid patterns
  const invalidPatterns = [
    /^\d+$/, // Only numbers
    /^test$/i, // "test" (case insensitive)
    /^admin$/i, // "admin" (case insensitive)
    /^null$/i, // "null" (case insensitive)
    /^undefined$/i, // "undefined" (case insensitive)
    /^[^A-Za-zÀ-ÖØ-öø-ÿ]+$/, // No letters at all
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmedName)) {
      return false;
    }
  }

  return true;
}
