function validate(address) {
    // Basic validation - address must be a string and have reasonable length
    if (typeof address !== 'string' || address.length < 5 || address.length > 100) {
        return false;
    }
    
    // Trim whitespace
    const trimmed = address.trim();
    
    // Check for empty string after trimming
    if (trimmed.length === 0) {
        return false;
    }
    
    // Should contain at least one digit (for house/building number)
    if (!/\d/.test(trimmed)) {
        return false;
    }
    
    // Should contain at least one letter
    if (!/[a-zA-Z]/.test(trimmed)) {
        return false;
    }
    
    // Should not contain control characters
    if (/[\x00-\x1F\x7F]/.test(trimmed)) {
        return false;
    }
    
    // Should not contain suspicious patterns like multiple dots or slashes in sequence
    if (/\.{3,}|\/{3,}/.test(trimmed)) {
        return false;
    }
    
    // Common address components that should be present
    // Check for street indicators or common patterns
    const streetIndicators = [
        'street', 'st', 'road', 'rd', 'avenue', 'ave', 'boulevard', 'blvd',
        'drive', 'dr', 'lane', 'ln', 'court', 'ct', 'way', 'highway', 'hwy',
        'circle', 'cir', 'place', 'pl', 'terrace', 'ter', 'trail', 'trl'
    ];
    
    // Check for common address patterns without being too restrictive
    const addressPatterns = [
        /^\d+\s+[a-zA-Z]/,  // Starts with number followed by letters
        /^[a-zA-Z]+\s+\d+/, // Starts with letters followed by number
        /\s+#?\d+[a-zA-Z]?$/,  // Ends with unit/apartment number
        /\s+(apt|apartment|unit|suite|ste|#)\s*\d+/i,  // Contains unit designator
    ];
    
    // Convert to lowercase for checking street indicators
    const lowerAddress = trimmed.toLowerCase();
    
    // Check for at least one street indicator OR matching common patterns
    const hasStreetIndicator = streetIndicators.some(indicator => 
        new RegExp(`\\b${indicator}\\b`).test(lowerAddress)
    );
    
    const hasAddressPattern = addressPatterns.some(pattern => 
        pattern.test(trimmed)
    );
    
    // Should have either a street indicator or match common address patterns
    if (!hasStreetIndicator && !hasAddressPattern) {
        return false;
    }
    
    // Check for minimum token count (at least 2 meaningful parts)
    const tokens = trimmed.split(/\s+/).filter(token => token.length > 0);
    if (tokens.length < 2) {
        return false;
    }
    
    // Basic format validation - should have number and street name reasonably positioned
    const tokensWithNumbers = tokens.filter(token => /\d/.test(token));
    const tokensWithLetters = tokens.filter(token => /[a-zA-Z]{2,}/.test(token));
    
    if (tokensWithNumbers.length === 0 || tokensWithLetters.length === 0) {
        return false;
    }
    
    return true;
}
