function validate(name) {
    // Basic existence check
    if (typeof name !== 'string') return false;
    
    const trimmedName = name.trim();
    
    // Must have at least one character after trimming
    if (trimmedName.length === 0) return false;
    
    // Length constraints (reasonable bounds for first names globally)
    if (trimmedName.length > 128) return false;
    
    // Check for invalid character patterns
    // Allow letters (including Unicode), spaces, hyphens, apostrophes, and dots
    // but prevent sequences that are clearly not name-like
    const invalidPatterns = [
        /^\d+$/,                         // Only numbers
        /[<>{}[\]\\|~^%$#@*_=+]/,        // Technical/special symbols
        /\.{2,}/,                        // Multiple consecutive dots
        /-{2,}/,                         // Multiple consecutive hyphens
        /'{2,}/,                         // Multiple consecutive apostrophes
        /\s{2,}/,                        // Multiple consecutive spaces
        /^[\.\-\s']+$/,                  // Only punctuation/spaces
        /[\.\-\s']$/,                    // Ends with punctuation/space
        /^[\.\-\s']/,                    // Starts with punctuation/space
        /^\d/,                           // Starts with digit
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedName)) return false;
    }
    
    // Allow Unicode letters, spaces, hyphens, apostrophes, and dots
    // Using Unicode property escapes to match letters from all scripts
    const validNameRegex = /^[\p{L}\p{M}\s\.\'\-]+$/u;
    
    if (!validNameRegex.test(trimmedName)) return false;
    
    // Must contain at least one letter character
    const hasLetter = /[\p{L}\p{M}]/u.test(trimmedName);
    if (!hasLetter) return false;
    
    return true;
}
