function validate(lastName) {
  // Check if input is a non-empty string
  if (typeof lastName !== 'string' || lastName.trim().length === 0) {
    return false;
  }
  
  const trimmed = lastName.trim();
  
  // Common validation rules for international names:
  // 1. Minimum length is 1 character (some cultures have very short names)
  // 2. Maximum reasonable length is 100 characters
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }
  
  // Allow letters from various scripts, hyphens, apostrophes, and spaces
  // This pattern includes:
  // - Latin letters (with diacritics)
  // - Cyrillic letters
  // - Chinese characters
  // - Japanese characters (Hiragana, Katakana, Kanji)
  // - Korean Hangul
  // - Arabic/Persian script
  // - Hebrew
  // - Greek
  // - Armenian
  // - Georgian
  // - Thai
  // - Devanagari (Hindi, Sanskrit, etc.)
  // - And many other Unicode letter categories
  // Also allows:
  // - Hyphens (for compound names)
  // - Apostrophes (for names like O'Connor, D'Angelo)
  // - Spaces (for names like "De La Cruz", "Van Der Berg")
  // - Periods (for abbreviations like "St." if part of name)
  const namePattern = /^[\p{L}\p{M}\s'-\.]+$/u;
  
  // Check pattern matches
  if (!namePattern.test(trimmed)) {
    return false;
  }
  
  // Additional sanity checks
  // 1. Should not consist only of spaces, hyphens, or apostrophes
  const lettersOnly = trimmed.replace(/[^\p{L}\p{M}]/gu, '');
  if (lettersOnly.length === 0) {
    return false;
  }
  
  // 2. Should not start or end with hyphen, apostrophe, or period
  if (/^[-'\.]|[-'\.]$/.test(trimmed)) {
    return false;
  }
  
  // 3. Should not have consecutive special characters (like --, '', ..)
  if (/[-'\.]{2,}/.test(trimmed)) {
    return false;
  }
  
  // 4. Should not contain numbers (though some cultures may have them, 
  // they're extremely rare in actual family names)
  if (/\d/.test(trimmed)) {
    return false;
  }
  
  // 5. Should not contain most punctuation marks (except those already allowed)
  // Check for other common invalid characters
  const invalidChars = /[@#$%^&*()_+={}\[\]:;"<>?,~\\|0-9]/;
  if (invalidChars.test(trimmed)) {
    return false;
  }
  
  return true;
}
