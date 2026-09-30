function validate(lastName) {
    // Check input type
    if (typeof lastName !== 'string') {
        return false;
    }
    
    // Trim whitespace and check if empty
    const trimmed = lastName.trim();
    if (trimmed.length === 0) {
        return false;
    }
    
    // Check length constraints (common practical limits)
    if (trimmed.length > 64) {
        return false;
    }
    
    // Allow letters from various scripts, hyphens, apostrophes, spaces, and some special characters
    // This regex covers: Latin, Greek, Cyrillic, CJK scripts, Arabic, Hebrew, Devanagari, etc.
    // Also allows hyphens, apostrophes, spaces (but not at start/end)
    const lastNameRegex = /^[\p{L}\p{M}\-'’.][\p{L}\p{M}\-\'’. ]*[\p{L}\p{M}\-'’.]$/u;
    
    // Check against the regex
    if (!lastNameRegex.test(trimmed)) {
        return false;
    }
    
    // Additional common-sense checks
    // No consecutive special characters
    if (/[-'’.]{2,}/.test(trimmed)) {
        return false;
    }
    
    // No invalid character combinations
    if (/[-'’.] [\-'’.]/.test(trimmed)) {
        return false;
    }
    
    // Check for reasonable structure (not all special characters)
    const letterCount = (trimmed.match(/[\p{L}\p{M}]/gu) || []).length;
    if (letterCount === 0) {
        return false;
    }
    
    // Ensure at least half the characters are letters (adjustable threshold)
    if (letterCount < Math.ceil(trimmed.length / 2)) {
        return false;
    }
    
    return true;
}
