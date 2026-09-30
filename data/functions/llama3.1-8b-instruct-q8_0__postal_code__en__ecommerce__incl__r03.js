function validate(postalCode) {
    /**
     * Validate a postal code.
     *
     * This function takes an ASCII string of up to 20 characters and returns true if it is a valid postal code, false otherwise.
     *
     * @param {string} postalCode - The postal code to be validated
     * @returns {boolean} True if the postal code is valid, False otherwise
     */
    // Remove any whitespace from the input
    postalCode = postalCode.replace(/ /g, '');
    
    // If the postal code is empty, return false
    if (postalCode.length === 0) {
        return false;
    }
    
    // A valid postal code can contain at most one hyphen
    if ((postalCode.match(/\-| /g) || []).length > 1) {
        return false;
    }
    
    // Check for valid characters in the postal code (letters, digits, and spaces)
    if (!/^[A-Za-z0-9 -]+$/.test(postalCode)) {
        return false;
    }
    
    // Return true to indicate a valid postal code
    return true;
}

console.log(validate("12345"));  // Expected output: true
console.log(validate("123    45"));  // Expected output: true
console.log(validate("1234567890"));  // Expected output: true
console.log(validate("a1b2c3"));  // Expected output: true
console.log(validate("a1 b2 c3"));  // Expected output: true

console.log(validate("*@#$%"));  // Expected output: false
console.log(validate("123   "));  // Expected output: false
console.log(validate("abc-def ghi"));  // Expected output: false
