function validate(firstName) {
    // Check if input is a non-empty string
    if (typeof firstName !== 'string' || firstName.trim().length === 0) {
        return false;
    }
    
    const trimmedName = firstName.trim();
    
    // Check for reasonable length (1-50 characters)
    // Real-world names can be long (e.g., Hawaiian names), but we need practical limits
    if (trimmedName.length > 50) {
        return false;
    }
    
    // Check for minimum length (at least 1 character after trimming)
    if (trimmedName.length < 1) {
        return false;
    }
    
    // Names can contain letters from any language, apostrophes, hyphens, spaces, and dots
    // Examples: "O'Connor", "Jean-Luc", "María José", "St. John", "Nguyễn", "Björk", "Σωκράτης"
    
    // This regex allows:
    // - Unicode letters (including accented characters and non-Latin scripts)
    // - Common name punctuation: apostrophes, hyphens, spaces, periods
    // - Must start and end with a letter (not punctuation)
    const namePattern = /^[\p{L}]([\p{L}\s'\-.]*[\p{L}])?$/u;
    
    // Check against the pattern
    if (!namePattern.test(trimmedName)) {
        return false;
    }
    
    // Additional sanity checks
    // Prevent names that are only punctuation or spaces
    if (!/\p{L}/u.test(trimmedName)) {
        return false;
    }
    
    // Prevent excessive repeated characters (e.g., "Aaaaaaaa")
    if (/(.)\1{5,}/.test(trimmedName)) {
        return false;
    }
    
    // Prevent names that look like email addresses or URLs
    if (trimmedName.includes('@') || trimmedName.includes('://') || trimmedName.includes('www.')) {
        return false;
    }
    
    // Prevent names with numbers (some cultures do use numbers, but extremely rare)
    // We'll be conservative and disallow them
    if (/\d/.test(trimmedName)) {
        return false;
    }
    
    // Check for balanced quotes/apostrophes if present
    const apostropheCount = (trimmedName.match(/'/g) || []).length;
    const quoteCount = (trimmedName.match(/"/g) || []).length;
    
    // Allow up to 2 apostrophes (reasonable for names like O'Connor or D'Angelo)
    if (apostropheCount > 2) {
        return false;
    }
    
    // Disallow straight quotes in names (use apostrophes instead)
    if (quoteCount > 0) {
        return false;
    }
    
    // Allow multiple spaces for names like "María José" but prevent excessive spaces
    if (/\s{3,}/.test(trimmedName)) {
        return false;
    }
    
    // Allow multiple hyphens for names like "Jean-Luc-Pierre" but prevent excessive
    if (/\-{3,}/.test(trimmedName)) {
        return false;
    }
    
    // Prevent names that are all uppercase or all lowercase
    // Some names might legitimately be all caps in certain scripts, but for Latin script:
    if (/^[A-Z]+$/.test(trimmedName) || /^[a-z]+$/.test(trimmedName)) {
        // Allow single-letter names (like "E" or "I" in some cultures)
        if (trimmedName.length === 1) {
            return true;
        }
        // For longer names, mixed case is more natural
        // But we'll be permissive since some cultures/circumstances differ
    }
    
    // Names should not start or end with certain punctuation
    if (/^[\s'\-.]|[\s'\-.]$/.test(trimmedName)) {
        return false;
    }
    
    // Final check: ensure there's at least one letter character
    return /\p{L}/u.test(trimmedName);
}
