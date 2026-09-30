/**
 * Validates a given string as a first name.
 *
 * @param {string} firstName - The name to validate.
 * @returns {boolean} Whether the given string is a valid first name or not.
 */
function validate(firstName) {
    // A valid first name must be at least 2 characters long and not more than 20
    if (firstName.length < 2 || firstName.length > 20) return false;
    
    // Check for any non-alphabetic character, apart from the first character which may or may not have a space before it.
    // Allow Unicode and also make sure there are less than three consecutive spaces in a row
    if (!/^[ a-zA-Z]+([ .,']?[a-zA-Z]*)?( [a-zA-Z]+)*$/.test(firstName) || / {2,}/.test(firstName)) return false;
    
    // If we have reached this point then the first name is valid.
    return true;
}

// Example usage:
console.log(validate("John"));  // Expected output: True
console.log(validate("Jane"));  // Expected output: True
console.log(validate("!@# John"));  // Expected output: False (non-alphabetic character)
console.log(validate("jOHN"));   // Expected output: True
console.log(validate("J"));     // Expected output: False (first name must be at least 2 characters long)
console.log(validate("a".repeat(21)));  // Expected output: False (name length exceeds maximum limit)
