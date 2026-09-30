function validate(lastName) {
  // Check if input is a non-empty string
  if (typeof lastName !== 'string' || lastName.length === 0) {
    return false;
  }
  
  // Check for reasonable length (2 to 100 characters)
  // Some cultures have multi-word last names with spaces/hyphens
  if (lastName.length < 2 || lastName.length > 100) {
    return false;
  }
  
  // Trim whitespace and check if result is non-empty
  const trimmed = lastName.trim();
  if (trimmed.length === 0) {
    return false;
  }
  
  // Validate characters - allow letters from any language, spaces, hyphens, apostrophes
  // Unicode categories included:
  // \p{L} - any kind of letter from any language
  // \p{M} - marks (accents, diacritics)
  // \p{Zs} - space separators
  // Also allow hyphens, apostrophes, and single quotes
  const lastNameRegex = /^[\p{L}\p{M}\-'\u2019\u0020]+$/u;
  
  if (!lastNameRegex.test(trimmed)) {
    return false;
  }
  
  // Additional sanity checks
  // Should not consist only of whitespace characters
  if (/^[\p{Zs}]+$/u.test(trimmed)) {
    return false;
  }
  
  // Should not have leading/trailing hyphens or apostrophes
  if (/^[-'\u2019]|[-'\u2019]$/.test(trimmed)) {
    return false;
  }
  
  // Should not have consecutive hyphens or apostrophes
  if (/[-'\u2019]{2,}/.test(trimmed)) {
    return false;
  }
  
  // Should contain at least one letter character
  if (!/[\p{L}\p{M}]/u.test(trimmed)) {
    return false;
  }
  
  // Check for reasonable number of parts (words) in the last name
  // Allow multi-word last names (e.g., "De la Cruz", "Van der Meer")
  const parts = trimmed.split(/[\p{Zs}\-]+/u);
  if (parts.length > 5) { // Arbitrary but reasonable limit
    return false;
  }
  
  // Each part should have at least one letter character
  for (const part of parts) {
    if (!/[\p{L}\p{M}]/u.test(part)) {
      return false;
    }
    // Each part should be at least 1 character (after removing apostrophes)
    const partWithoutApostrophes = part.replace(/['\u2019]/g, '');
    if (partWithoutApostrophes.length === 0) {
      return false;
    }
  }
  
  return true;
}
