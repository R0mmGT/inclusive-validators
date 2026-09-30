function validate(address) {
    // Basic validation: address must be a non-empty string
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Length constraints (reasonable street address limits)
    if (trimmedAddress.length > 100 || trimmedAddress.length < 5) {
        return false;
    }
    
    // Must contain at least one digit (house/building number)
    if (!/\d/.test(trimmedAddress)) {
        return false;
    }
    
    // Must contain at least one letter (street name)
    if (!/[a-zA-Z]/.test(trimmedAddress)) {
        return false;
    }
    
    // Should not contain obviously invalid patterns
    const invalidPatterns = [
        /https?:\/\//i,  // URLs
        /[<>{}[\]\\|]/   // Special characters that wouldn't appear in valid addresses
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedAddress)) {
            return false;
        }
    }
    
    // Basic format validation: should have at least two parts (number and street)
    const parts = trimmedAddress.split(/\s+/).filter(part => part.length > 0);
    if (parts.length < 2) {
        return false;
    }
    
    // Common address format: number followed by street name (or vice versa)
    // Check if there's a number in one part and letters in another
    let hasNumberPart = false;
    let hasLetterPart = false;
    
    for (const part of parts) {
        if (/^\d+[a-zA-Z]?$/.test(part) || /^\d+[a-zA-Z]?[-\/]?\d*[a-zA-Z]?$/.test(part)) {
            hasNumberPart = true;
        }
        if (/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*[.]?$/.test(part) && part.length > 1) {
            hasLetterPart = true;
        }
    }
    
    if (!hasNumberPart || !hasLetterPart) {
        return false;
    }
    
    // Check for reasonable street suffixes/words (optional but helpful)
    const streetIndicators = [
        'street', 'st', 'avenue', 'ave', 'road', 'rd', 'boulevard', 'blvd',
        'lane', 'ln', 'drive', 'dr', 'court', 'ct', 'place', 'pl', 'way'
    ];
    
    const lowerAddress = trimmedAddress.toLowerCase();
    const hasStreetIndicator = streetIndicators.some(indicator => 
        lowerAddress.includes(' ' + indicator + ' ') || 
        lowerAddress.endsWith(' ' + indicator) ||
        new RegExp('\\b' + indicator + '\\b').test(lowerAddress)
    );
    
    // Not requiring a street indicator, but if present it's a good sign
    // Main validation is the previous checks
    
    return true;
}
