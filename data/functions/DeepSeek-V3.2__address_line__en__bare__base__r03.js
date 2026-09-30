function validate(address) {
    // Basic checks
    if (typeof address !== 'string') return false;
    
    const trimmedAddress = address.trim();
    
    // Address cannot be empty or too short (minimum reasonable length)
    if (trimmedAddress.length < 5) return false;
    
    // Address cannot be too long (practical limit for street address lines)
    if (trimmedAddress.length > 100) return false;
    
    // Must contain at least one digit (for house/building number)
    if (!/\d/.test(trimmedAddress)) return false;
    
    // Must contain at least one letter (for street name)
    if (!/[a-zA-Z]/.test(trimmedAddress)) return false;
    
    // Should not contain obviously invalid patterns
    const invalidPatterns = [
        /^[^a-zA-Z0-9]*$/, // Only special characters
        /^\d+$/, // Only numbers
        /^[a-zA-Z\s]+$/, // Only letters and spaces (no numbers)
        /test\s+address/i, // Common test patterns
        /example\s+address/i,
        /123\s+main\s+street/i // Too generic/placeholder
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedAddress)) return false;
    }
    
    // Should contain common address components (not exhaustive but reasonable)
    const addressComponents = [
        /\d+\s+\w+/, // Number followed by word (e.g., "123 Main")
        /\b(street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln)\b/i, // Common street types
        /\b(apartment|apt|suite|ste|unit|building|bldg|floor|fl)\b/i // Common unit indicators
    ];
    
    // At least one address component should match
    const hasValidComponent = addressComponents.some(pattern => pattern.test(trimmedAddress));
    if (!hasValidComponent) return false;
    
    // Check for reasonable structure: typically starts with number or contains unit designation
    const startsWithNumber = /^\d+/.test(trimmedAddress);
    const containsUnit = /\b(apt|apartment|suite|unit|#)\s*\d+/i.test(trimmedAddress);
    
    if (!startsWithNumber && !containsUnit) {
        // If doesn't start with number and has no unit, check if number appears reasonably early
        const firstNumberIndex = trimmedAddress.search(/\d/);
        if (firstNumberIndex > 20) return false; // Number too far into the address
    }
    
    // Should not contain multiple consecutive special characters (except spaces)
    if (/[^a-zA-Z0-9\s]{2,}/.test(trimmedAddress)) return false;
    
    // Should not start or end with special characters (except numbers/letters)
    if (/^[^a-zA-Z0-9]/.test(trimmedAddress) || /[^a-zA-Z0-9]$/.test(trimmedAddress)) return false;
    
    return true;
}
