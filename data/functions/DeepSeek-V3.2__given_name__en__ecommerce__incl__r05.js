function validate(name) {
    // Check for basic requirements
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    
    // Empty or whitespace-only names are invalid
    if (trimmed.length === 0) return false;
    
    // Reasonable length check (most names are 1-70 characters)
    // Some cultures have compound names with spaces/hyphens
    if (trimmed.length > 70) return false;
    
    // Check for minimum character requirement after trimming
    // Some cultures have single-character names
    if (trimmed.length < 1) return false;
    
    // Basic character validation allowing:
    // - Letters from any alphabet (Unicode letter categories)
    // - Spaces, hyphens, apostrophes (common in names)
    // - Digits (some cultures use numbers in names)
    // - Accents and diacritical marks
    const validNamePattern = /^[\p{L}\p{M}\s'\-.\d]+$/u;
    
    if (!validNamePattern.test(trimmed)) return false;
    
    // Additional sanity checks
    
    // Should contain at least one letter (not just numbers/symbols)
    const hasLetter = /[\p{L}\p{M}]/u.test(trimmed);
    if (!hasLetter) return false;
    
    // Should not be only spaces, hyphens, or apostrophes
    const meaningfulChars = trimmed.replace(/[\s'\-.\d]/g, '');
    if (meaningfulChars.length === 0) return false;
    
    // Should not start or end with forbidden characters
    if (/^[\s'\-.\d]/.test(trimmed) || /[\s'\-.\d]$/.test(trimmed)) return false;
    
    // Should not have consecutive special characters (like "--" or "''")
    if (/['\-.\s]{2,}/.test(trimmed)) return false;
    
    // Should not contain certain problematic patterns
    // (like only numbers or common placeholder text)
    const numericOnly = /^\d+$/.test(trimmed.replace(/\s/g, ''));
    if (numericOnly) return false;
    
    // Common invalid patterns
    const invalidPatterns = [
        /^(test|admin|root|user)$/i,
        /^[.\s]+$/,
        /^xxx/i,
        /^na+$/i
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) return false;
    }
    
    // Allow for names from various writing systems
    // The Unicode property escapes already handle this
    
    return true;
}
