function validate(postalCode) {
    // Input must be a string
    if (typeof postalCode !== 'string') return false;
    
    // Remove whitespace from both ends
    const trimmedCode = postalCode.trim();
    
    // Common patterns for various countries
    const patterns = [
        // US ZIP code (5 digits or 5+4 format)
        /^\d{5}(-\d{4})?$/,
        // Canadian postal code (A1A 1A1 format)
        /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
        // UK postcode (various formats like AA9A 9AA, A9A 9AA, A9 9AA, etc.)
        /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,
        // Australian postcode (4 digits)
        /^\d{4}$/,
        // German postal code (5 digits)
        /^\d{5}$/,
        // French postal code (5 digits)
        /^\d{5}$/,
        // Japanese postal code (3 digits dash 4 digits)
        /^\d{3}-\d{4}$/,
        // Indian postal code (6 digits)
        /^\d{6}$/,
        // Brazilian postal code (5 digits dash 3 digits)
        /^\d{5}-\d{3}$/
    ];
    
    // Check if the trimmed code matches any pattern
    return patterns.some(pattern => pattern.test(trimmedCode));
}
