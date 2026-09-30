function validate(name) {
    // Basic validation: must be a non-empty string
    if (typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Remove extra spaces between words and validate length
    const normalizedName = trimmedName.replace(/\s+/g, ' ');
    
    // Must contain at least 2 words (first and last name)
    const nameParts = normalizedName.split(' ');
    if (nameParts.length < 2) {
        return false;
    }
    
    // Check for each part
    for (let part of nameParts) {
        // Each part must contain only letters and common name characters
        // Allow letters (including international), hyphens, apostrophes, and dots
        if (!/^[A-Za-zÀ-ÿ\u00C0-\u017F\-'.]+$/.test(part)) {
            return false;
        }
        
        // Each part must start with a capital letter
        if (!/^[A-ZÀ-Ý\u00C0-\u00DD]/.test(part)) {
            return false;
        }
        
        // Length constraints: each part should be reasonable
        if (part.length < 2) {
            // Allow single letter middle initials like "J." or "J"
            if (part.length === 1 && /^[A-ZÀ-Ý\u00C0-\u00DD]\.?$/.test(part)) {
                continue;
            }
            return false;
        }
        
        // No consecutive special characters
        if (/[\-\.']{2,}/.test(part)) {
            return false;
        }
        
        // Apostrophes, hyphens, and dots must be followed by letters
        if (/[\-\.'][^A-Za-zÀ-ÿ]/.test(part)) {
            return false;
        }
        
        // Maximum reasonable length for a name part
        if (part.length > 30) {
            return false;
        }
    }
    
    // Overall name length constraint
    if (normalizedName.length > 100) {
        return false;
    }
    
    // Common invalid patterns
    const invalidPatterns = [
        /^\d/,  // Starting with numbers
        /\d/,   // Contains numbers
        /test/i,
        /admin/i,
        /user/i,
        /^[^A-Za-zÀ-ÿ]/  // Starting with non-letter
    ];
    
    for (let pattern of invalidPatterns) {
        if (pattern.test(normalizedName)) {
            return false;
        }
    }
    
    // Check for reasonable structure (not all initials, not all same character)
    const meaningfulParts = nameParts.filter(part => part.length > 1 || !part.includes('.'));
    if (meaningfulParts.length < 2) {
        return false;
    }
    
    // Check for repeated parts or suspicious patterns
    if (nameParts.length > 2) {
        // Allow patterns like "Mary Jane Smith" but not "Test Test Test"
        const uniqueParts = [...new Set(nameParts.map(p => p.toLowerCase()))];
        if (uniqueParts.length < 2 && nameParts.length >= 3) {
            return false;
        }
    }
    
    return true;
}
