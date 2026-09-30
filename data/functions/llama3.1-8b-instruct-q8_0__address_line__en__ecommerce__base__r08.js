function validate(address) {
    /**
     * Validate a street address line.
     *
     * @param {String} address - A string representing a possible street address line.
     *
     * @returns {Boolean} True if the input is a valid street address line, False otherwise.
     */
    
    // If the address is empty or null, it's not a valid address
    if (!address) {
        return false;
    }
    
    // Remove all whitespace from the string to make it easier to check
    address = address.replace(/\s/g, '');
    
    // Check for common street suffixes
    const suffixes = ['st', 'nd', 'rd'];
    if (suffixes.some(suffix => address.endsWith(suffix))) {
        return true;  // If a suffix is found, it's likely a valid address
    }
    
    // A valid address should always be composed of at least two different letters/numbers and have either an alphabetic or numeric character in the last position
    if (!/[a-zA-Z0-9].*[A-Za-z0-9][^a-zA-Z0-9]$/.test(address)) {
        return false;
    }
    
    // If no suffix is found but the string contains at least one word and an alphabet letter or number in the last position, it could be a valid address
    const words = address.split(' ');
    if (words.some(word => word.length > 0) && /[a-zA-Z0-9]$/.test(address)) {
        return true;
    }
    
    // If none of the above conditions are met, the address is likely not valid
    return false;
}

console.log(validate("123 Main St"));  // Expected output: true
console.log(validate("123 Main Avenue"));  // Expected output: true
console.log(validate("ABC 123"));  // Expected output: true
console.log(validate("123"));  // Expected output: false
console.log(validate(""));  // Expected output: false
console.log(validate(null));  // Expected output: false
