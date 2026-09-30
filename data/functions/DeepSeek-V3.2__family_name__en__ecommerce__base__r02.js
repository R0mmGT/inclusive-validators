function validate(lastName) {
    // Check if input is a string
    if (typeof lastName !== 'string') {
        return false;
    }
    
    // Trim whitespace and check length
    const trimmed = lastName.trim();
    if (trimmed.length < 1 || trimmed.length > 100) {
        return false;
    }
    
    // Check for empty string after trimming
    if (trimmed === '') {
        return false;
    }
    
    // Basic validation: allow letters, spaces, hyphens, apostrophes, and some special characters
    // Common last name patterns from various cultures
    const lastNamePattern = /^[A-Za-zÀ-ÿ'\-.\s]+$/;
    
    // Additional check: must contain at least one letter
    const hasLetter = /[A-Za-zÀ-ÿ]/;
    
    // Check against patterns
    if (!lastNamePattern.test(trimmed) || !hasLetter.test(trimmed)) {
        return false;
    }
    
    // Prevent consecutive special characters or spaces
    const consecutiveSpecials = /['\-.\s]{2,}/;
    if (consecutiveSpecials.test(trimmed)) {
        return false;
    }
    
    // Prevent starting or ending with special characters (except apostrophe for names like O'Connor)
    // Allow apostrophe at start/end for edge cases
    const invalidStartEnd = /^['\-.\s]|['\-.\s]$/;
    if (invalidStartEnd.test(trimmed) && !/^'.*'$/.test(trimmed)) {
        return false;
    }
    
    return true;
}
