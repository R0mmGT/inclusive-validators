function validate(name) {
    // Basic sanity checks
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    if (trimmed.length === 0) return false;
    
    // Length constraints - reasonable for given names worldwide
    // Some cultures have very short names (e.g., "Ed", "Jo"), some have longer compound names
    if (trimmed.length < 1 || trimmed.length > 70) return false;
    
    // Check for problematic patterns
    // Reject names containing numbers
    if (/\d/.test(trimmed)) return false;
    
    // Reject names that are only symbols/repeated characters
    if (/^[\s\-'_\.]+$/.test(trimmed)) return false;
    
    // Reject names with inappropriate consecutive special characters
    if (/[\s\-'_\.]{2,}/.test(trimmed)) return false;
    
    // Allow letters from any alphabet, spaces, hyphens, apostrophes, and dots
    // Unicode property escapes cover letters from all scripts (requires ES2018)
    // Fallback pattern for broader compatibility
    const validPattern = /^[\p{L}\s\-'\.]+$/u;
    
    // Alternative pattern for environments without Unicode property support
    const fallbackPattern = /^[^\p{C}\p{M}\p{Z}\p{S}\p{N}\p{P}&&[^\-'\.]]+$/u;
    
    // Check against primary pattern
    if (!validPattern.test(trimmed)) {
        // If primary fails, try to verify it's not clearly invalid
        // Allow any character except control chars, marks, symbols (except allowed), numbers, most punctuation
        const basicValid = /^[^\p{C}\p{M}\p{Z}\p{S}\p{N}]+$/u;
        if (!basicValid.test(trimmed.replace(/[\-'\.]/g, ''))) {
            return false;
        }
    }
    
    // Additional cultural considerations
    // Some cultures use only one character (e.g., "E" in Indonesia, "吴" in China)
    // We already allow single characters above
    
    // Reject names that start or end with separators (except where culturally valid like O'Connor)
    // But we'll be more permissive for cultural variations
    
    // Ensure there's at least one letter character (not just separators)
    const hasLetter = /[\p{L}]/u.test(trimmed);
    if (!hasLetter) return false;
    
    return true;
}
