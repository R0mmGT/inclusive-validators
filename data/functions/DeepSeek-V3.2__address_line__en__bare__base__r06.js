function validate(address) {
    // Basic validation checks
    if (typeof address !== 'string') return false;
    if (address.trim().length === 0) return false;
    
    const trimmed = address.trim();
    
    // Minimum length check (house number + street name)
    if (trimmed.length < 5) return false;
    
    // Check for presence of at least one digit (house/building number)
    if (!/\d/.test(trimmed)) return false;
    
    // Check for at least one letter (street name)
    if (!/[a-zA-Z]/.test(trimmed)) return false;
    
    // Common invalid patterns
    const invalidPatterns = [
        /^P\.?O\.?\s*Box/i,  // PO Box addresses
        /^\d+\s*$/,           // Just numbers
        /^[^a-zA-Z0-9]+$/,    // No alphanumeric characters
        /test/i,              // Common test values
        /example/i,
        /^[^a-zA-Z0-9]*$/,    // No meaningful content
        /^123\s+Main\s+St$/i  // Overly generic/test address
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) return false;
    }
    
    // Valid pattern: number followed by street name
    const validPatterns = [
        /^\d+\s+[a-zA-Z]+/,           // "123 Main"
        /^\d+\s+[a-zA-Z]+\s+[a-zA-Z]+/, // "123 Main Street"
        /^\d+[a-zA-Z]?\s+[a-zA-Z]+/,   // "123A Main"
        /^[a-zA-Z]+\s+\d+/,           // European style "Main Street 123"
        /^\d+\s*[-#]?\s*\d+\s+[a-zA-Z]/ // "123-45 Main" or "123 #45 Main"
    ];
    
    for (const pattern of validPatterns) {
        if (pattern.test(trimmed)) return true;
    }
    
    // Additional check: contains common street suffixes
    const streetSuffixes = [
        'street', 'st', 'avenue', 'ave', 'road', 'rd', 'boulevard', 'blvd',
        'lane', 'ln', 'drive', 'dr', 'court', 'ct', 'place', 'pl', 'way'
    ];
    
    const lowerAddress = trimmed.toLowerCase();
    for (const suffix of streetSuffixes) {
        if (lowerAddress.includes(suffix) && 
            /\d/.test(lowerAddress) && 
            /[a-zA-Z]/.test(lowerAddress)) {
            return true;
        }
    }
    
    return false;
}
