function validate(lastName) {
  // Check if input is a non-empty string
  if (typeof lastName !== 'string' || lastName.trim().length === 0) {
    return false;
  }
  
  const trimmedName = lastName.trim();
  const length = trimmedName.length;
  
  // Reasonable length constraints for a last name
  if (length < 1 || length > 50) {
    return false;
  }
  
  // Common patterns for valid last names across various cultures:
  // 1. Standard alphabetic names (Smith, Johnson)
  // 2. Names with apostrophes (O'Connor, d'Angelo)
  // 3. Names with hyphens (Smith-Jones, García-López)
  // 4. Names with spaces (van der Berg, de la Cruz)
  // 5. Names with diacritics (Müller, Nuñez, Françoise)
  // 6. Names starting with "Mc", "Mac", "O'", "De", etc.
  
  // Allow letters (including accented characters), apostrophes, hyphens, and spaces
  // Unicode property escapes to match letters from various scripts
  const validNamePattern = /^[\p{L}'\- ]+$/u;
  
  if (!validNamePattern.test(trimmedName)) {
    return false;
  }
  
  // Additional validation rules
  
  // No consecutive special characters (like -- or '' or '  ')
  if (/['\- ]{2,}/.test(trimmedName)) {
    return false;
  }
  
  // Cannot start or end with a special character (except some cultures allow names starting with apostrophe)
  // We'll allow starting with apostrophe (like 's Gravesande) but not hyphen or space
  if (/^[\- ]|[\- ]$/.test(trimmedName)) {
    return false;
  }
  
  // Must contain at least one letter
  if (!/\p{L}/u.test(trimmedName)) {
    return false;
  }
  
  return true;
}
