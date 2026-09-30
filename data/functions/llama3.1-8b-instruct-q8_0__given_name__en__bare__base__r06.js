function validate(name) {
    /**
     * Validates a given string as a valid first name.
     *
     * @param {string} name - The name to be validated.
     * @returns {boolean} True if the name is a valid first name, false otherwise.
     */
    
    // Check if the input is empty
    if (!name) {
        return false;
    }
    
    // Remove leading and trailing whitespaces
    const strippedName = name.trim();
    
    // Check if the string length is less than 2 or more than 30 characters
    if (strippedName.length < 2 || strippedName.length > 30) {
        return false;
    }
        
    // Check if the string contains any non-alphabetic characters (excluding hyphen)
    if (!/^[a-zA-Z-]+$/.test(strippedName)) {
        return false;
    }

    return true;
}

console.log(validate("John Doe"));  // Expected output: true
console.log(validate("Jane Smith"));  // Expected output: true
console.log(validate("John"));  // Expected output: true
console.log(validate("J"));  // Expected output: false
console.log(validate("John123"));  // Expected output: true
console.log(validate("John Doe!"));  // Expected output: false
console.log(validate("!"));  // Expected output: false
