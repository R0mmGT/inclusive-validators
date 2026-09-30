function validate(name) {
    if (typeof name !== 'string') return false;
    
    // Trim and check basic requirements
    const trimmed = name.trim();
    if (trimmed.length < 1 || trimmed.length > 100) return false;
    
    // Check for empty string after trimming
    if (trimmed.length === 0) return false;
    
    // Check for invalid character combinations
    // Should not start or end with certain punctuation (except apostrophe/hyphen in specific contexts)
    if (/^[-.,' ]|[-.,' ]$/.test(trimmed)) return false;
    
    // Multiple consecutive punctuation marks are invalid
    if (/[-.,' ]{2,}/.test(trimmed)) return false;
    
    // Should not contain digits or most special characters
    // Allow letters, spaces, hyphens, apostrophes, and periods (for abbreviations like "St. John")
    if (!/^[\p{L}\p{M} .'-]+$/u.test(trimmed)) return false;
    
    // Should contain at least one letter
    if (!/\p{L}/u.test(trimmed)) return false;
    
    // Additional cultural considerations:
    
    // 1. Prevent sequences that look like email addresses
    if (trimmed.includes('@')) return false;
    
    // 2. Prevent sequences that look like URLs
    if (trimmed.includes('://') || trimmed.includes('www.')) return false;
    
    // 3. Check for reasonable structure
    // Split by allowed separators
    const parts = trimmed.split(/[ .'-]+/).filter(part => part.length > 0);
    
    // Each part should be at least one character
    if (parts.some(part => part.length === 0)) return false;
    
    // Check for each part (to handle cases like "de la Cruz", "O'Connor", "St. John")
    for (const part of parts) {
        // Each part should contain at least one letter
        if (!/\p{L}/u.test(part)) return false;
        
        // Avoid parts that are just punctuation
        if (/^[-.,' ]+$/.test(part)) return false;
    }
    
    // Special handling for names with apostrophes:
    // Apostrophe should not be at start/end of entire name or part
    if (trimmed.includes("'")) {
        const apostropheParts = trimmed.split("'");
        for (let i = 0; i < apostropheParts.length; i++) {
            const part = apostropheParts[i];
            // If apostrophe is at beginning or end of entire name
            if (i === 0 && part.length === 0) return false;
            if (i === apostropheParts.length - 1 && part.length === 0) return false;
            
            // Parts around apostrophe should contain letters
            if (part.length > 0 && !/\p{L}/u.test(part)) return false;
        }
    }
    
    return true;
}
