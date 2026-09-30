function validate(lastName) {
    // Basic validation
    if (typeof lastName !== 'string') {
        return false;
    }
    
    // Remove leading/trailing whitespace for validation
    const trimmed = lastName.trim();
    
    // Check for empty string or only whitespace
    if (trimmed.length === 0) {
        return false;
    }
    
    // Common minimum and maximum length for last names
    if (trimmed.length < 1 || trimmed.length > 50) {
        return false;
    }
    
    // Basic valid character pattern:
    // - Letters (including accented characters and international scripts)
    // - Hyphens, apostrophes, and spaces (common in last names)
    // - Periods (for abbreviations like "St. James")
    // - Many international last names contain these characters
    const validCharPattern = /^[\p{L}\s.'’-]+$/u;
    
    if (!validCharPattern.test(trimmed)) {
        return false;
    }
    
    // Additional specific validations:
    
    // Check for consecutive special characters (like '--', "''", etc.)
    const consecutiveSpecialChars = /[.'’-]{2,}/;
    if (consecutiveSpecialChars.test(trimmed)) {
        return false;
    }
    
    // Check for special characters at start or end (with some exceptions)
    // Allow apostrophe at start for names like "O'Brien"
    // Allow hyphen at end for some cultural names
    const invalidStart = /^[.'’-]/;
    const invalidEnd = /[.'’]$/;
    
    if (invalidStart.test(trimmed) && !/^['’]/.test(trimmed)) {
        return false;
    }
    
    if (invalidEnd.test(trimmed)) {
        return false;
    }
    
    // Ensure there's at least one letter character
    const hasLetter = /\p{L}/u.test(trimmed);
    if (!hasLetter) {
        return false;
    }
    
    // Check for reasonable number of words/parts (most last names have 1-3 parts)
    const parts = trimmed.split(/[\s-]+/).filter(part => part.length > 0);
    if (parts.length > 4) {
        return false;
    }
    
    // Check each part has at least one letter
    for (const part of parts) {
        if (!/\p{L}/u.test(part.replace(/['’.]/g, ''))) {
            return false;
        }
    }
    
    return true;
}
