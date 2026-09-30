function validate(lastName) {
    // Input must be a non-empty string
    if (typeof lastName !== 'string' || lastName.length === 0) {
        return false;
    }
    
    // Trim whitespace from both ends
    const trimmed = lastName.trim();
    if (trimmed.length === 0) {
        return false;
    }
    
    // Length check: allow reasonable length for all cultures
    // Some cultures have long compound surnames, while others have short ones
    if (trimmed.length > 100) {
        return false;
    }
    
    // Basic character validation for global surnames
    // Allow letters (including accented/Unicode), apostrophes, hyphens, spaces, and dots
    // This covers most naming conventions globally
    const validNamePattern = /^[\p{L}\s'\-.]*$/u;
    
    if (!validNamePattern.test(trimmed)) {
        return false;
    }
    
    // Additional sanity checks
    // 1. Should contain at least one letter
    const hasLetter = /[\p{L}]/u.test(trimmed);
    if (!hasLetter) {
        return false;
    }
    
    // 2. Should not start or end with punctuation (except for cultural exceptions)
    const startsWithInvalid = /^[\s'\-.]/.test(trimmed);
    const endsWithInvalid = /[\s'\-.]$/.test(trimmed);
    
    // Some names might start/end with apostrophe (O'Connor, D'Angelo) or hyphen
    // Allow them but ensure they're not just punctuation
    if (startsWithInvalid && trimmed.length === 1) {
        return false;
    }
    
    // 3. Should not have consecutive punctuation (e.g., '--', "''")
    const consecutivePunctuation = /['\-.]{2,}/.test(trimmed);
    if (consecutivePunctuation) {
        return false;
    }
    
    // 4. Should not contain only whitespace characters after trimming
    if (!trimmed.replace(/\s/g, '').length) {
        return false;
    }
    
    // 5. Check for extreme cases (e.g., all the same character)
    const uniqueChars = new Set(trimmed.toLowerCase().replace(/\s/g, ''));
    if (uniqueChars.size === 1 && trimmed.length > 2) {
        // Allow single letters but not long strings of same character
        return false;
    }
    
    // If all checks pass
    return true;
}
