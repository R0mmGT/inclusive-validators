function validate(name) {
    // Must be a non-empty string
    if (typeof name !== 'string' || name.trim() === '') {
        return false;
    }
    
    const trimmed = name.trim();
    
    // Reasonable length check for a first name (1-50 characters)
    if (trimmed.length < 1 || trimmed.length > 50) {
        return false;
    }
    
    // Common patterns found in names worldwide:
    // 1. Letters from various scripts (Latin, Cyrillic, Greek, Arabic, Hebrew, CJK, Devanagari, etc.)
    // 2. Hyphens, spaces, apostrophes used in many naming conventions
    // 3. Diacritics and combining marks
    
    // Unicode categories allowed:
    // L (Letters) - all letter categories
    // M (Marks) - combining marks/diacritics
    // Zs (Space separators) - specifically regular space and non-breaking space
    // Pd (Dash punctuation) - hyphens, en/em dashes
    // Po (Other punctuation) - apostrophes, middle dots
    
    const validPattern = /^[\p{L}\p{M}\p{Zs}\p{Pd}\p{Po}]+$/u;
    
    // Must contain at least one letter (excluding marks, spaces, punctuation)
    const hasLetter = /[\p{L}]/u.test(trimmed);
    
    // Check for multiple spaces or punctuation in sequence (likely invalid)
    const hasInvalidSequence = /[\p{Zs}\p{Pd}\p{Po}]{2,}/u.test(trimmed);
    
    // Check for starting/ending with punctuation or spaces (already trimmed)
    const invalidStartEnd = /^[\p{Pd}\p{Po}]|[\p{Pd}\p{Po}]$/u.test(trimmed);
    
    // Check for emoji or other symbols (not typically in names)
    const hasSymbols = /[\p{S}\p{N}\p{C}]/u.test(trimmed);
    
    // Check for control characters
    const hasControlChars = /[\x00-\x1F\x7F]/.test(trimmed);
    
    return validPattern.test(trimmed) && 
           hasLetter && 
           !hasInvalidSequence && 
           !invalidStartEnd && 
           !hasSymbols && 
           !hasControlChars;
}
