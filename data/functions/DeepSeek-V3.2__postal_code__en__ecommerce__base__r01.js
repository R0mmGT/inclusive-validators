function validate(postalCode) {
    // Step 1: Basic validation - must be a non-empty string
    if (typeof postalCode !== 'string' || postalCode.trim() === '') {
        return false;
    }
    
    // Step 2: Trim whitespace
    const trimmedCode = postalCode.trim();
    
    // Step 3: US postal code validation (format: 5 digits or 5 digits + hyphen + 4 digits)
    const usFormat = /^\d{5}(-\d{4})?$/;
    
    // Step 4: Canadian postal code validation (format: A1A 1A1, case insensitive)
    const canadianFormat = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/i;
    
    // Step 5: UK postal code validation (multiple formats, case insensitive)
    const ukFormats = [
        /^[A-Z]{1,2}\d[A-Z\d]? \d[ABD-HJLNP-UW-Z]{2}$/i,  // Standard format
        /^[A-Z]{1,2}\d{1,2} \d[ABD-HJLNP-UW-Z]{2}$/i,    // Format with 1-2 digits
        /^[A-Z]{1,2}\d[A-Z\d]? \d[ABD-HJLNP-UW-Z]{2}$/i, // Alternate format
    ];
    
    // Step 6: Check if it matches any of the supported formats
    return usFormat.test(trimmedCode) || 
           canadianFormat.test(trimmedCode) || 
           ukFormats.some(format => format.test(trimmedCode));
}
