function validate(lastName) {
    // Basic validation: must be a non-empty string
    if (typeof lastName !== 'string' || lastName.trim().length === 0) {
        return false;
    }
    
    const trimmedName = lastName.trim();
    
    // Check length constraints (common global surname patterns)
    // Too short or too long could indicate invalid input
    if (trimmedName.length < 1 || trimmedName.length > 100) {
        return false;
    }
    
    // Common patterns for valid surnames across different cultures:
    // 1. Standard Latin alphabet names (English, French, Spanish, etc.)
    // 2. Names with apostrophes (O'Connor, D'Angelo)
    // 3. Names with hyphens (Smith-Jones, García-López)
    // 4. Names with spaces (some cultures have multi-word surnames)
    // 5. Names with diacritics/accents (Müller, García, Žižek)
    // 6. Non-Latin scripts (though these are less common in many systems)
    
    // Basic character validation pattern
    const validSurnamePattern = /^[\p{L}\p{M}'’\-\s.]+$/u;
    
    // Additional common-sense checks
    const invalidPatterns = [
        // Should not start or end with punctuation (except apostrophe in some cases like O'Connor)
        /^[\-\s.'’]|[\-\s.'’]$/,
        // Should not have consecutive special characters (except spaces between words)
        /['’\-.]{2,}/,
        // Should not have multiple consecutive spaces
        /\s{2,}/,
        // Should not contain numbers (some legitimate surnames do, but very rare)
        /\d/,
        // Should not contain most special characters
        /[!@#$%^&*()_+=<>?\\/[\]{}|~`":;]/,
        // Should contain at least one letter character
        /^\s*$/
    ];
    
    // Check the main valid pattern
    if (!validSurnamePattern.test(trimmedName)) {
        return false;
    }
    
    // Check for invalid patterns
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedName)) {
            return false;
        }
    }
    
    // Check for minimum number of letters (at least 1)
    const letterCount = (trimmedName.match(/[\p{L}\p{M}]/gu) || []).length;
    if (letterCount < 1) {
        return false;
    }
    
    // Special handling for apostrophe at start (like O'Connor)
    // The apostrophe should be preceded by a letter
    if (trimmedName.includes("'") || trimmedName.includes("’")) {
        const apostrophePattern = /[\p{L}\p{M}]['’]/g;
        const matches = trimmedName.match(apostrophePattern);
        // If there are apostrophes, at least one should follow a letter
        if (!matches || matches.length === 0) {
            return false;
        }
    }
    
    return true;
}
