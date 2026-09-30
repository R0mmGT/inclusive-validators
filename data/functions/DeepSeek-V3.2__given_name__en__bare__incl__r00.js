function validate(name) {
    // Check basic requirements
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    
    // Name cannot be empty or too short/long
    if (trimmed.length < 1 || trimmed.length > 100) return false;
    
    // Name should not consist only of whitespace characters
    if (trimmed.length === 0) return false;
    
    // Common invalid patterns to reject
    const invalidPatterns = [
        /^\d+$/,                     // Only numbers
        /^[^a-zA-ZÀ-ÿ]+$/,          // No letters at all (includes Unicode letters)
        /[<>\[\]{}()\\|@#$%^*_=+`~]/, // Dangerous/invalid characters
        /\t/,                        // Tabs
        /\n/,                        // Newlines  
        /\r/,                        // Carriage returns
        /\v/,                        // Vertical tabs
        /\f/,                        // Form feeds
        /^\s+$/,                     // Only whitespace
        /^\.+$/,                     // Only dots
        /^-+$/,                      // Only hyphens
        /^'+$/                       // Only apostrophes
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) return false;
    }
    
    // Check for valid Unicode letter patterns
    // This regex matches strings that start with a Unicode letter and contain
    // letters, spaces, hyphens, apostrophes, or dots in between
    // Allows for multiple parts (like "Mary Ann", "Jean-Pierre", "O'Connor")
    const validNamePattern = /^[\p{L}\p{M}](?:[\p{L}\p{M}\s'\-.]*[\p{L}\p{M}])?$/u;
    
    if (!validNamePattern.test(trimmed)) return false;
    
    // Additional cultural validations
    // Allow for names with apostrophes, hyphens, and spaces in appropriate positions
    const invalidSequences = [
        /''/,       // Double apostrophe
        /--/,       // Double hyphen
        /\.\./,     // Double dot
        /^[-\s'.]/, // Starting with punctuation/space
        /[-\s'.]$/, // Ending with punctuation/space
        /\s\s/,     // Double space
        /\s[-\s'.]|[-\s']\s/ // Space next to punctuation or punctuation next to space
    ];
    
    for (const seq of invalidSequences) {
        if (seq.test(trimmed)) return false;
    }
    
    // Check for at least one Unicode letter (ensuring it's not just symbols/spaces)
    const hasLetter = /[\p{L}\p{M}]/u.test(trimmed);
    if (!hasLetter) return false;
    
    // Ensure reasonable character distribution (not too many special characters)
    const letters = (trimmed.match(/[\p{L}\p{M}]/gu) || []).length;
    const specialChars = (trimmed.match(/[-\s'.]/g) || []).length;
    
    // Allow reasonable special characters but not more than letters
    if (specialChars >= letters) return false;
    
    return true;
}
