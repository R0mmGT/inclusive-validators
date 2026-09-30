function validate(name) {
    // Rule 1: Non-empty and at most 2 consecutive spaces allowed
    if (typeof name !== 'string' || name.trim() === '' || name.includes('   ')) {
        return false;
    }
    
    // Rule 2: At least two parts separated by spaces
    const parts = name.trim().split(/\s+/);
    if (parts.length < 2) {
        return false;
    }
    
    // Rule 3: Each part must be at least 2 characters and start with uppercase letter
    for (let part of parts) {
        if (part.length < 2) {
            return false;
        }
        
        // First character must be uppercase letter (A-Z with possible accents)
        if (!/^[A-ZÀ-ÖØ-Þ]/.test(part)) {
            return false;
        }
        
        // Remaining characters must be letters, hyphens, or apostrophes
        // Also allow accented characters in remaining positions
        if (!/^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ'\-]*$/.test(part)) {
            return false;
        }
        
        // No consecutive hyphens or apostrophes
        if (/'{2,}|-{2,}/.test(part)) {
            return false;
        }
        
        // Cannot end with hyphen or apostrophe
        if (part.endsWith('-') || part.endsWith("'")) {
            return false;
        }
    }
    
    // Rule 4: No digits or special symbols besides hyphen and apostrophe
    if (/[0-9_!@#$%^&*()+=<>?/\\[\]{}|;:"`,.]/.test(name)) {
        return false;
    }
    
    // Rule 5: At least one part must be at least 3 characters (typically the last name)
    const hasLongPart = parts.some(part => part.length >= 3);
    if (!hasLongPart) {
        return false;
    }
    
    return true;
}
