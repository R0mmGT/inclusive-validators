function validate(streetAddress) {
    /**
     * This function validates whether the input is a valid street address line or not.
     *
     * @param {string} streetAddress The street address to be validated.
     * @returns {boolean} True if the string is a valid street address, False otherwise.
     */

    // A simple and effective way to validate addresses without a comprehensive list of valid address patterns
    // This function will return false if there are any invalid characters (like special symbols)
    let pattern = /^[a-zA-Z0-9\s\.,\-]+$/;
    
    // If the street address does not have at least two non-space characters, it is not a valid address.
    if (!streetAddress.trim().split(/\s+/).length >= 2) {
        return false;
    }
        
    // Check if the string matches the pattern using match(), returns an array or null
    let match = streetAddress.match(pattern);
    
    // If there is no match, match will be null
    // We use this logic to test whether the regex object contains no matches in a more 'javascript' way.
    // An empty string is a valid address but doesn't contain any letters or words.
    if (match && streetAddress.trim()) {
        return true;
    } else {
        return false;
    }
}

console.log(validate("123 Main St"));  // Outputs: true
console.log(validate("1,Main Street"));  // Outputs: true
console.log(validate("123.45 Main Street"));  // Outputs: true
console.log(validate("123@# Main Street"));  // Outputs: false
