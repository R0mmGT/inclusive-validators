function validate(name) {
    // Basic checks
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    if (trimmed.length === 0) return false;
    
    // Common patterns to reject
    const invalidPatterns = [
        /^\d+$/,  // Only numbers
        /^[^a-zA-ZÀ-ÿ\s'-]/,  // Starts with non-letter character
        /[<>{}[\]\\|`~]/,  // Contains technical characters
        /[@#$%^&*+=_]/  // Contains symbols not used in names
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) return false;
    }
    
    // Check for minimum structure (at least one space or hyphen, but allow single names for cultures with single names)
    const words = trimmed.split(/\s+/);
    if (words.length === 0) return false;
    
    // Check each word
    for (const word of words) {
        if (word.length === 0) return false;
        
        // Word must contain at least one letter
        if (!/[a-zA-ZÀ-ÿ]/.test(word)) return false;
        
        // Allow apostrophes, hyphens, and dots within words (for names like O'Connor, Mary-Jane, St. John)
        if (!/^[a-zA-ZÀ-ÿ]+(?:['-\.][a-zA-ZÀ-ÿ]+)*$/.test(word)) {
            return false;
        }
    }
    
    // Additional validations
    // 1. Should not contain consecutive special characters
    if (/['-\.]{2,}/.test(trimmed)) return false;
    
    // 2. Should not start or end with special character (except allowed internal ones)
    if (/^['-\.]|['-\.]$/.test(trimmed)) return false;
    
    // 3. Should not contain numbers mixed with letters (like "John123")
    if (/\d/.test(trimmed)) return false;
    
    // 4. Reasonable length check (2-100 characters)
    if (trimmed.length < 2 || trimmed.length > 100) return false;
    
    // 5. Should not be common placeholder/invalid values
    const invalidValues = [
        'test', 'example', 'user', 'admin', 'root', 
        'first name', 'last name', 'full name', 'name',
        'asdf', 'qwerty', '123', 'abc'
    ];
    
    const lowerTrimmed = trimmed.toLowerCase();
    for (const invalid of invalidValues) {
        if (lowerTrimmed === invalid || lowerTrimmed.includes(` ${invalid} `)) {
            return false;
        }
    }
    
    // Final check: must contain at least one non-whitespace, non-special character
    return /[a-zA-ZÀ-ÿ]/.test(trimmed.replace(/['-\.]/g, ''));
}
