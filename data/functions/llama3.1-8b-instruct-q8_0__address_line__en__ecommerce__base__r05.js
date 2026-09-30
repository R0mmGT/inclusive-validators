function validate(address) {
    /**
     * Validates whether the provided string is a valid street address line.
     *
     * A valid street address line should contain no more than 50 characters, at least one number,
     * and at least one of 'Street', 'Avenue', or 'Road'.
     *
     * @param {string} address - The input address to be validated
     * @returns {boolean} True if the address is valid, False otherwise
     */

    // Check if the address string is not empty and has a maximum length of 50 characters
    if (!address || address.length > 50) {
        return false;
    }

    // Use regular expression to search for at least one digit in the address
    if (!/^\d/.test(address)) {
        return false;  // no numbers found
    }

    // Use regular expression to search for one of 'Street', 'Avenue', or 'Road' in the address (ignore case)
    var keys = ['street', 'avenue', 'road'];
    if (!keys.some(key => address.toLowerCase().includes(key))) {
        return false;  // no street/avenue/road found
    }

    // If all conditions are met, the address is considered valid
    return true;
}

console.log(validate('123 Main St'));  // Expected output: true
console.log(validate('Main St'));      // Expected output: false (no numbers)
console.log(validate('No address'));   // Expected output: false (empty string)
console.log(validate('1234567890'));   // Expected output: false (length too long)
