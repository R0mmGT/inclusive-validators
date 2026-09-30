function validate(lastName) {
  // Input must be a non-empty string
  if (typeof lastName !== 'string' || !lastName.trim()) {
    return false;
  }

  const trimmedName = lastName.trim();
  
  // Length check: most cultures have surnames between 1-70 characters
  // Some cultures use compound surnames or very long names
  if (trimmedName.length < 1 || trimmedName.length > 70) {
    return false;
  }

  // Check for only spacing characters
  if (!trimmedName.match(/\S/)) {
    return false;
  }

  // Common surname patterns across cultures:
  // 1. Letters (including accented characters and ligatures)
  // 2. Hyphens, apostrophes, spaces (for compound names)
  // 3. Periods (for abbreviations or initials, though rare in surnames)
  // 4. Digits (some cultures like Iceland use patronymics with numbers)
  // 5. Chinese/Japanese/Korean characters (CJK unified ideographs)
  // 6. Arabic script, Hebrew, Cyrillic, etc.
  
  // Build comprehensive validation pattern
  const patterns = [
    // Latin script with common diacritics and ligatures
    /^[\p{L}\p{M}\-.'\s]+$/u,
    // Chinese characters (common and uncommon)
    /^[\u4E00-\u9FFF\u3400-\u4DBF]+$/u,
    // Japanese (Kanji, Hiragana, Katakana)
    /^[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]+$/u,
    // Korean Hangul
    /^[\uAC00-\uD7AF\u1100-\u11FF]+$/u,
    // Arabic script (includes Persian, Urdu, etc.)
    /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/u,
    // Hebrew
    /^[\u0590-\u05FF\s]+$/u,
    // Cyrillic
    /^[\u0400-\u04FF\s]+$/u,
    // Greek
    /^[\u0370-\u03FF\s]+$/u,
    // Armenian
    /^[\u0530-\u058F\s]+$/u,
    // Georgian
    /^[\u10A0-\u10FF\s]+$/u,
    // Thai
    /^[\u0E00-\u0E7F\s]+$/u,
    // Devanagari (Hindi, Marathi, Nepali, etc.)
    /^[\u0900-\u097F\s]+$/u,
    // Tamil
    /^[\u0B80-\u0BFF\s]+$/u,
    // Bengali
    /^[\u0980-\u09FF\s]+$/u,
    // Gujarati
    /^[\u0A80-\u0AFF\s]+$/u,
    // Gurmukhi (Punjabi)
    /^[\u0A00-\u0A7F\s]+$/u,
    // Telugu
    /^[\u0C00-\u0C7F\s]+$/u,
    // Kannada
    /^[\u0C80-\u0CFF\s]+$/u,
    // Malayalam
    /^[\u0D00-\u0D7F\s]+$/u,
    // Sinhala
    /^[\u0D80-\u0DFF\s]+$/u
  ];

  // Special case: Icelandic surnames sometimes contain numbers (e.g., "10")
  // Also allow mixed letters/numbers for certain cultures
  const mixedPattern = /^[\p{L}\p{M}0-9\-.'\s]+$/u;
  
  // Check if the name matches any of the valid patterns
  const matchesPattern = patterns.some(pattern => pattern.test(trimmedName)) || 
                        mixedPattern.test(trimmedName);

  if (!matchesPattern) {
    return false;
  }

  // Additional sanity checks
  
  // Cannot start or end with certain characters
  if (trimmedName.match(/^[-.'\s]|[-.'\s]$/)) {
    return false;
  }

  // Cannot have consecutive special characters (except spaces in compound names)
  if (trimmedName.match(/[-.]{2,}/) || trimmedName.match(/[']{2,}/)) {
    return false;
  }

  // For Latin script names: must contain at least one letter
  if (trimmedName.match(/^[0-9\-.'\s]+$/)) {
    return false;
  }

  // Allow compound surnames with spaces but not multiple consecutive spaces
  if (trimmedName.match(/\s{2,}/)) {
    return false;
  }

  // Some cultures use apostrophes, but not at the beginning or consecutively
  const apostropheCount = (trimmedName.match(/'/g) || []).length;
  if (apostropheCount > 2) {
    return false;
  }

  return true;
}
