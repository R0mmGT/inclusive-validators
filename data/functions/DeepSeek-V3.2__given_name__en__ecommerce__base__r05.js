function validate(firstName) {
  // Check if input is a non-empty string
  if (typeof firstName !== 'string' || firstName.length === 0) {
    return false;
  }

  // Trim whitespace from both ends
  const trimmedName = firstName.trim();
  
  // Check length constraints (common first names are typically 1-30 characters)
  if (trimmedName.length < 1 || trimmedName.length > 30) {
    return false;
  }

  // Check for leading/trailing hyphens or spaces
  if (trimmedName.startsWith('-') || trimmedName.endsWith('-') ||
      trimmedName.startsWith(' ') || trimmedName.endsWith(' ')) {
    return false;
  }

  // Allow letters (including accented characters), hyphens, apostrophes, and spaces
  // Unicode property escapes to match letters from any language
  const validNamePattern = /^[\p{L}'’\-\s]+$/u;
  
  if (!validNamePattern.test(trimmedName)) {
    return false;
  }

  // Ensure at least one letter is present
  const hasLetter = /[\p{L}]/u.test(trimmedName);
  if (!hasLetter) {
    return false;
  }

  // Check for consecutive special characters
  const consecutiveSpecial = /['’\-]{2,}/.test(trimmedName) || /\s{2,}/.test(trimmedName);
  if (consecutiveSpecial) {
    return false;
  }

  // Ensure the name doesn't start or end with special characters (already checked, but double-check)
  const startsOrEndsWithSpecial = /^['’\-]|['’\-]$/.test(trimmedName);
  if (startsOrEndsWithSpecial) {
    return false;
  }

  return true;
}
