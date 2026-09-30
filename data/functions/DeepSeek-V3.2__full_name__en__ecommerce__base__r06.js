function validate(name) {
    // Early return for non-string or empty inputs
    if (typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Check length constraints (typical realistic limits)
    if (trimmedName.length > 100 || trimmedName.length < 2) {
        return false;
    }
    
    // Check for multiple names (at least first and last name)
    const nameParts = trimmedName.split(/\s+/);
    if (nameParts.length < 2) {
        return false;
    }
    
    // Each name part must be valid
    for (const part of nameParts) {
        // Check for valid characters (letters, hyphens, apostrophes)
        if (!/^[A-Za-zÀ-ÿ'\-]+$/.test(part)) {
            return false;
        }
        
        // Check for consecutive special characters
        if (/['\-]{2,}/.test(part)) {
            return false;
        }
        
        // Check for starting or ending with special characters
        if (part.startsWith("'") || part.startsWith("-") || 
            part.endsWith("'") || part.endsWith("-")) {
            return false;
        }
        
        // Check length of each part
        if (part.length < 1 || part.length > 30) {
            return false;
        }
        
        // Should contain at least one letter
        if (!/[A-Za-zÀ-ÿ]/.test(part)) {
            return false;
        }
    }
    
    // Additional validation: consecutive spaces were already handled by split(/\s+/)
    // Check for realistic capitalization pattern (optional but helpful)
    // This is less strict to accommodate various naming conventions
    const firstLetterOfEachPart = nameParts.map(part => part[0]);
    if (!firstLetterOfEachPart.every(char => /[A-Za-zÀ-ÿ]/.test(char))) {
        return false;
    }
    
    return true;
}
