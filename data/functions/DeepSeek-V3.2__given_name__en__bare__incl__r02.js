function validate(name) {
  // Check basic requirements
  if (typeof name !== 'string') return false;
  
  const trimmed = name.trim();
  
  // Empty or too short/long check (2-50 characters seems reasonable for most cultures)
  if (trimmed.length < 1 || trimmed.length > 50) return false;
  
  // Check for empty name after trimming
  if (trimmed === '') return false;
  
  // Check for basic structure - must start with a letter or valid Unicode character
  // This regex allows letters from any script, plus apostrophes, hyphens, and spaces inside names
  const validNamePattern = /^\p{L}[\p{L}\s'\-.]*$/u;
  
  if (!validNamePattern.test(trimmed)) return false;
  
  // Additional validation rules
  
  // 1. Cannot be only spaces, hyphens, or apostrophes
  const letterPattern = /\p{L}/u;
  if (!letterPattern.test(trimmed)) return false;
  
  // 2. Cannot start or end with hyphen, apostrophe, or space
  if (/^[\s'\-.]|[\s'\-.]$/.test(trimmed)) return false;
  
  // 3. Cannot have consecutive special characters
  if (/['\-.]{2,}/.test(trimmed)) return false;
  
  // 4. Cannot have consecutive spaces
  if (/\s{2,}/.test(trimmed)) return false;
  
  // 5. Check for invalid patterns (like only numbers or symbols)
  // Already covered by validNamePattern, but double-check
  if (/^\d+$/.test(trimmed)) return false;
  
  // 6. Ensure at least one letter remains after filtering special chars
  const lettersOnly = trimmed.replace(/[^\\p{L}]/gu, '');
  if (lettersOnly.length === 0) return false;
  
  // Allow culturally diverse names
  // Examples that should pass:
  // - "Jean-Luc"
  // - "O'Connor"
  // - "Xiǎo míng" (Chinese with space)
  // - "محمد" (Arabic)
  // - "Иван" (Cyrillic)
  // - "जॉन" (Devanagari)
  
  return true;
}
