function validate(address) {
    // Type check - must be a string
    if (typeof address !== 'string') return false;
    
    // Remove leading/trailing whitespace for validation
    const trimmed = address.trim();
    
    // Empty or whitespace-only strings are invalid
    if (trimmed.length === 0) return false;
    
    // Minimum and maximum length constraints
    if (trimmed.length < 3) return false;  // Too short to be meaningful (e.g., "A 1")
    if (trimmed.length > 200) return false; // Practical upper limit
    
    // Basic pattern validation - must contain at least one letter and one number
    // This catches completely invalid patterns like "123" or "Street" alone
    // But allows addresses like "123 Main St" or "Main Street 123"
    const hasLetter = /[a-zA-Z\u00C0-\u017F]/.test(trimmed); // Includes basic Latin letters and common accented European letters
    const hasNumberOrBuildingIdentifier = /\d|[a-zA-Z]-\d|\d+[a-zA-Z]|[a-zA-Z]\d+/.test(trimmed); // Number or common building patterns like "12-A" or "A12"
    
    if (!hasLetter || !hasNumberOrBuildingIdentifier) return false;
    
    // Check for reasonable structure - at least two distinct parts separated by space
    const parts = trimmed.split(/\s+/).filter(part => part.length > 0);
    if (parts.length < 2) return false;
    
    // Check for obviously invalid patterns
    const invalidPatterns = [
        /^\d+$/,                          // Only numbers
        /^[a-zA-Z\s]+$/,                  // Only letters (already caught by hasNumber check, but being explicit)
        /^[^a-zA-Z0-9]*$/,                // No alphanumeric characters
        /test|example|demo|foo|bar/i,     // Common test words
        /[<>{}[\]]/,                      // HTML/script tags or brackets
        /\b\d{10,}\b/,                    // Very long number sequences (likely not an address)
        /@\w+\.\w+/,                      // Email addresses
        /https?:\/\//,                    // URLs
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) return false;
    }
    
    // Check for consecutive special characters (more than 2 in a row)
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,}/.test(trimmed)) return false;
    
    // Allow a wide range of valid address characters:
    // - Alphanumeric in multiple scripts (handled by Unicode ranges)
    // - Common punctuation: . , - / # &
    // - Spaces
    // - Parentheses for apartment/unit numbers
    // Extended Unicode for international support (covers most Latin-based scripts)
    const validCharPattern = /^[\p{L}\p{N}\s\.,\-/#&()'"°ªº]+$/u;
    if (!validCharPattern.test(trimmed)) return false;
    
    // Check for reasonable word lengths (prevent garbage data)
    for (const part of parts) {
        // Allow long words for street names but prevent extremely long "words"
        if (part.length > 25 && !part.includes('-') && !part.includes('/')) return false;
    }
    
    return true;
}
