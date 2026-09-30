function validate(postalCode) {
    // Handle null, undefined, or non-string inputs
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    // Trim whitespace from both ends
    const trimmedCode = postalCode.trim();
    
    // Must be 5 digits (US postal code format)
    if (trimmedCode.length !== 5) {
        return false;
    }
    
    // Check that all characters are digits
    for (let i = 0; i < trimmedCode.length; i++) {
        if (trimmedCode.charCodeAt(i) < 48 || trimmedCode.charCodeAt(i) > 57) {
            return false;
        }
    }
    
    return true;
}
