function validate(address) {
    // Basic validation: must be a non-empty string
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmed = address.trim();
    
    // Length constraints (reasonable for street addresses)
    if (trimmed.length < 5 || trimmed.length > 100) {
        return false;
    }
    
    // Must contain at least one digit (for house/building number)
    if (!/\d/.test(trimmed)) {
        return false;
    }
    
    // Must contain at least one letter (for street name)
    if (!/[a-zA-Z]/.test(trimmed)) {
        return false;
    }
    
    // Should not contain obviously invalid patterns
    const invalidPatterns = [
        /^[0-9\s\W]+$/, // Only numbers and symbols
        /^[a-zA-Z\s\W]+$/, // Only letters and symbols (no numbers)
        /test\s+address/i,
        /example\s+address/i,
        /\bnull\b/i,
        /\bundefined\b/i,
        /^\s*\d+\s*$/, // Only numbers with optional whitespace
        /[<>{}[\]]/, // Dangerous characters that could indicate injection attempts
        /\.{4,}/, // Four or more consecutive dots
        /^\W+$/, // Only non-word characters
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) {
            return false;
        }
    }
    
    // Basic format validation: should start with a number or have a number in first few words
    const words = trimmed.split(/\s+/);
    const firstThreeWords = words.slice(0, 3);
    const hasNumberInBeginning = firstThreeWords.some(word => /\d/.test(word));
    
    if (!hasNumberInBeginning) {
        // Check if it has common address patterns
        const commonPatterns = [
            /^\d+\s+[a-zA-Z]/, // Starts with number then letter (e.g., "123 Main")
            /^[a-zA-Z]+\s+\d+/, // Starts with letter then number (e.g., "PO Box 123")
            /^\d+\s*[-#]?\s*\d*[a-zA-Z]?/, // Number with optional unit/suite
            /^\d+[a-zA-Z]?\s+[a-zA-Z]/, // Number with optional letter suffix (e.g., "123A Main")
        ];
        
        if (!commonPatterns.some(pattern => pattern.test(trimmed))) {
            return false;
        }
    }
    
    // Check for reasonable word count (between 2 and 10 words)
    if (words.length < 2 || words.length > 10) {
        return false;
    }
    
    // Check each word length is reasonable
    for (const word of words) {
        if (word.length > 25) {
            return false;
        }
    }
    
    return true;
}
