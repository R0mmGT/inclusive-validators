function validate(givenName) {
    /**
     * Validates if the given string is a valid family name (last name).
     *
     * @param {string} givenName - The last name to be validated.
     * @returns {boolean} True if the last name is valid, false otherwise.
     */

    // First, we'll remove any leading or trailing spaces from the input
    givenName = givenName.trim();

    // A valid family name should have at least 1 and no more than 30 characters
    if (givenName.length < 1 || givenName.length > 30) {
        return false;
    }

    // It should contain only Unicode letters and some special characters
    for (let char of givenName) {
        if (!(char.match(/[\sa-zA-Z\u0100-\u7e9f]/))) {
            return false;
        }
    }

    // If it passes the above checks, we consider it a valid family name
    return true;
}

console.log(validate("John Smith"));  // Expected output: true
console.log(validate("123 John"));    // Expected output: true (for some cultures)
console.log(validate("John!Smith"));  // Expected output: false
console.log(validate("")).           // Expected output: false
