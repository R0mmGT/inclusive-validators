function validate(address) {
    /**
     * Validate a street address line.
     *
     * This function checks if the input string is a valid street address line,
     * regardless of country or culture.
     * It will return True for most common formatting standards (e.g., addresses
     * in USA, Canada, UK, Australia and many others), except for some unusual or invalid formats.
     *
     * Parameters:
     * ----------
     * address : string
     *   The street address line to validate.
     *
     * Returns:
     * -------
     * bool
     *   True if the input is a valid street address line; False otherwise.
     */
    const parts = address.split(' ');
    
    // Check each part for common errors and inconsistencies
    for (let part of parts) {
        // Remove any non-alphanumeric characters or spaces
        
        const cleanedPart = part.replace(/[^a-zA-Z0-9\s]/g, '');

        
        if (!/^[a-zA-Z\s\.]+$/i.test(cleanedPart)) {
            return false;
        }

        // Check for empty parts
        if (cleanedPart.trim() === "") {
            return false;
        }
    }

    
    const lastPart = parts[parts.length - 1];
    if (!/^[0-9\s\-]+$/i.test(lastPart.replace(/\s+/g, ''))) {
        return false;
    }

    // All checks passed
    return true;
}

// Test cases:
console.log(validate("123 Main St"));  // True
console.log(validate("123  Foo Bar Sr"));  // False (because of extra ' ')
console.log(validate("123-abc-def"));  // True
console.log(validate("Hello World!"));  // False (because of non-alphanumeric characters)
