function validate(firstName) {
    // Input must be a non-empty string
    if (typeof firstName !== 'string' || firstName.trim() === '') {
        return false;
    }
    
    const trimmed = firstName.trim();
    
    // Check length constraints (typically 1-50 characters)
    if (trimmed.length < 1 || trimmed.length > 50) {
        return false;
    }
    
    // Check for valid characters:
    // - Letters (including accented characters from various languages)
    // - Apostrophes, hyphens, and spaces (common in names)
    // - Unicode property escapes allow support for international names
    const validNamePattern = /^[\p{L}'\- ]+$/u;
    
    if (!validNamePattern.test(trimmed)) {
        return false;
    }
    
    // Additional sanity checks
    // Name shouldn't start or end with punctuation/spaces (already trimmed)
    if (trimmed.startsWith('-') || trimmed.startsWith('\'') || 
        trimmed.endsWith('-') || trimmed.endsWith('\'')) {
        return false;
    }
    
    // Name shouldn't have consecutive punctuation/spaces
    if (/['\-]{2,}/.test(trimmed) || /\s{2,}/.test(trimmed)) {
        return false;
    }
    
    // Name should have at least one letter character
    if (!/\p{L}/u.test(trimmed)) {
        return false;
    }
    
    return true;
}
