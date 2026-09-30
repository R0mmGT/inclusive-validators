function validate(name) {
    // Check if input is a non-empty string
    if (typeof name !== 'string' || name.trim() === '') {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Check length constraints (1-50 characters is reasonable for first names)
    if (trimmedName.length < 1 || trimmedName.length > 50) {
        return false;
    }
    
    // Check for valid characters:
    // - Allow letters (including accented/Unicode letters)
    // - Allow hyphens, apostrophes, and spaces (for multi-word first names like "Mary Anne")
    // - Must start with a letter
    const validNamePattern = /^[\p{L}]([\p{L}\s'\-]*[\p{L}])?$/u;
    
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }
    
    // Check for consecutive special characters or invalid positions
    const invalidPatterns = [
        /''/,   // consecutive apostrophes
        /--/,   // consecutive hyphens
        /\s\s/, // consecutive spaces
        /'\s/,  // apostrophe followed by space
        /\s'/,  // space followed by apostrophe
        /-\s/,  // hyphen followed by space
        /\s-/,  // space followed by hyphen
        /'$/,   // ends with apostrophe
        /^-/,   // starts with hyphen
        /-$/,   // ends with hyphen
        /^\s/,  // starts with space (should be caught by trim, but just in case)
        /\s$/,  // ends with space (should be caught by trim)
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedName)) {
            return false;
        }
    }
    
    // Additional sanity checks
    // Check if name is only one character (allow single-letter names like "J" or "É")
    if (trimmedName.length === 1) {
        return /^\p{L}$/u.test(trimmedName);
    }
    
    // Check for reasonable structure (should contain at least one letter after special chars)
    // The main regex already handles this, but adding extra validation
    const lettersOnly = trimmedName.replace(/[^\\p{L}]/gu, '');
    if (lettersOnly.length < 1) {
        return false;
    }
    
    // Check for capitalization - while not strictly required, most first names are capitalized
    // This is a soft check and won't fail validation, but could be adjusted based on requirements
    // For now, we'll accept both "John" and "john" as valid
    
    return true;
}
