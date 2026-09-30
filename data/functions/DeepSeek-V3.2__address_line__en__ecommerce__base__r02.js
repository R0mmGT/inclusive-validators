function validate(address) {
    // Basic validation: not empty, within reasonable length, and contains expected patterns
    if (typeof address !== 'string') return false;
    
    const trimmed = address.trim();
    if (trimmed.length === 0) return false;
    if (trimmed.length > 100) return false; // Reasonable length limit
    
    // Must contain at least one digit (for house/building number)
    if (!/\d/.test(trimmed)) return false;
    
    // Must contain at least two letter characters (for street name/city/etc.)
    // Using regex to count letter characters (including international characters)
    const letterMatches = trimmed.match(/[a-zA-ZÀ-ÿ]/g);
    if (!letterMatches || letterMatches.length < 2) return false;
    
    // Basic pattern validation: should have number followed by text (or text followed by number)
    // Common patterns: "123 Main St", "Main St 123", "Apt 4B, 123 Main St"
    const validPatterns = [
        /^\d+\s+[a-zA-ZÀ-ÿ]/,          // Number then text (most common)
        /[a-zA-ZÀ-ÿ].*\d+$/,           // Text then number at end
        /[a-zA-ZÀ-ÿ].*\d+.*[a-zA-ZÀ-ÿ]/ // Text, number, text
    ];
    
    const hasValidPattern = validPatterns.some(pattern => pattern.test(trimmed));
    if (!hasValidPattern) return false;
    
    // Should not contain obviously invalid characters or patterns
    const invalidPatterns = [
        /^[^a-zA-Z0-9]/,              // Starting with non-alphanumeric
        /[<>{}[\]|\\^~`]/,            // Dangerous/technical characters
        /@/,                          // Email-like
        /https?:\/\//,                // URL
        /^\d+$/,                      // Only numbers
        /^[a-zA-Z\s]+$/,              // Only letters (no numbers)
        /\.com$|\.net$|\.org$/i       // Website-like endings
    ];
    
    const hasInvalidPattern = invalidPatterns.some(pattern => pattern.test(trimmed));
    if (hasInvalidPattern) return false;
    
    // Additional check: should contain street-related terms (optional but helpful)
    const streetTerms = [
        'street', 'st', 'avenue', 'ave', 'road', 'rd', 'boulevard', 'blvd',
        'drive', 'dr', 'lane', 'ln', 'court', 'ct', 'way', 'place', 'pl',
        'highway', 'hwy', 'route', 'rt', 'apartment', 'apt', 'suite', 'ste',
        'building', 'bldg', 'floor', 'fl', 'unit'
    ];
    
    const lowerAddress = trimmed.toLowerCase();
    const hasStreetTerm = streetTerms.some(term => 
        lowerAddress.includes(term) || 
        lowerAddress.includes(term + '.')
    );
    
    // Not requiring street terms to allow for international addresses
    // but it's a good signal if present
    if (!hasStreetTerm) {
        // If no street term, require stronger validation
        // Must have at least 3 words (e.g., "123 Main Street")
        const wordCount = trimmed.split(/\s+/).filter(word => word.length > 0).length;
        if (wordCount < 3) return false;
    }
    
    return true;
}
