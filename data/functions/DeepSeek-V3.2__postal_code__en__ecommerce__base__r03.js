function validate(postalCode) {
    // Check if input is a string
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    // Remove whitespace from beginning and end
    const trimmedCode = postalCode.trim();
    
    // Check for empty string after trimming
    if (trimmedCode.length === 0) {
        return false;
    }
    
    // Universal validation rules for common postal code formats
    const patterns = [
        // US ZIP code (5 digits or 5+4 format)
        /^\d{5}(-\d{4})?$/,
        // Canadian postal code (A1A 1A1 format)
        /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
        // UK postcode (various formats like AA1A 1AA, A1A 1AA, A1 1AA, AA1 1AA)
        /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,
        // Australian postcode (4 digits)
        /^\d{4}$/,
        // German postcode (5 digits)
        /^\d{5}$/,
        // French postcode (5 digits)
        /^\d{5}$/,
        // Japanese postal code (7 digits, may have hyphen: 123-4567)
        /^\d{3}-\d{4}$|^\d{7}$/,
        // Indian PIN code (6 digits)
        /^\d{6}$/
    ];
    
    // Check if the trimmed postal code matches any valid pattern
    return patterns.some(pattern => pattern.test(trimmedCode));
}
