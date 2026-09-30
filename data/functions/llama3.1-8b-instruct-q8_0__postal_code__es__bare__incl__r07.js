function validate(postcode) {
    /**
     * Validate a postcode.
     *
     * @param {string} postcode The postcode to check.
     * @return {boolean} True if the postcode is valid, False otherwise.
     */
    
    // Remove non-alphanumeric characters from the postcode
    let cleanedPostcode = postcode.replace(/[^0-9a-zA-Z]/g, '');
    
    // Check if the postcode has exactly 5 or 7 alphanumeric characters
    return (cleanedPostcode.length === 5) || (cleanedPostcode.length === 7 && /^[A-Z]{1}[0-9]{1}[0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i.test(cleanedPostcode));
}

// Test the function
console.log(validate("M1 1AA")); // Should return True
console.log(validate("ABC123")); // Should return False
