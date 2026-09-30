function validate(name) {
    // Basic validation criteria
    if (typeof name !== 'string') {
        return false;
    }
    
    // Trim whitespace and check for empty string
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Length constraints (reasonable bounds for a first name)
    if (trimmedName.length < 2 || trimmedName.length > 50) {
        return false;
    }
    
    // Should start with a letter
    if (!/^[A-Za-z]/.test(trimmedName)) {
        return false;
    }
    
    // Allow letters, spaces, hyphens, and apostrophes in the middle
    // but not as consecutive special characters
    if (!/^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/.test(trimmedName)) {
        return false;
    }
    
    // No consecutive special characters (spaces, hyphens, apostrophes)
    if (/[ '\-]{2,}/.test(trimmedName)) {
        return false;
    }
    
    // Should not end with a special character
    if (/[ '\-]$/.test(trimmedName)) {
        return false;
    }
    
    // Should contain at least one vowel (to avoid "xqwr" type inputs)
    // This is a soft check since some valid names might not have vowels
    // Commented out as it could exclude legitimate names
    // if (!/[aeiouAEIOU]/.test(trimmedName)) {
    //     return false;
    // }
    
    // Check for common invalid patterns
    const invalidPatterns = [
        /^\d+$/,  // All digits
        /^test$/i,  // Test names
        /^admin$/i,  // Admin
        /^user$/i,  // User
        /^name$/i,  // Name
        /^first$/i,  // First
        /^last$/i,  // Last
        /^guest$/i,  // Guest
        /^unknown$/i,  // Unknown
        /^anonymous$/i  // Anonymous
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedName)) {
            return false;
        }
    }
    
    // Capitalization check: Typically, first names should be properly capitalized
    // But we'll be lenient since users might enter in lowercase/uppercase
    
    // Successfully passed all validation checks
    return true;
}
