function validate(postalCode) {
    // Handle null, undefined, or non-string input
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    // Trim whitespace from both ends
    const trimmedCode = postalCode.trim();
    
    // Check for empty string after trimming
    if (trimmedCode.length === 0) {
        return false;
    }
    
    // Common postal code patterns by country
    const patterns = [
        /^\d{5}(-\d{4})?$/,                         // US: 12345 or 12345-6789
        /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,    // Canada: A1A 1A1
        /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/,       // UK: SW1A 1AA
        /^\d{4}$/,                                  // Australia: 1234
        /^\d{5}$/,                                  // Germany: 12345
        /^[0-9]{5}$/,                               // France: 12345
        /^\d{3} ?\d{2}$/,                           // Sweden: 123 45
        /^\d{4}$/,                                  // New Zealand: 1234
        /^\d{6}$/,                                  // India: 123456
        /^\d{3}-\d{4}$/,                            // Japan: 123-4567
    ];
    
    // Check if the code matches any of the patterns
    return patterns.some(pattern => pattern.test(trimmedCode));
}
