function validate(name) {
    /**
     * Validate if a given string is a valid first name.
     *
     * This function checks if a string contains alphabets only (both uppercase and lowercase).
     * It does not check for the length of the string, making it suitable for names from all cultures.
     *
     * @param {string} name - The input string to be validated.
     * @returns {boolean} True if the string is a valid first name, False otherwise.
     */
    // Remove leading and trailing whitespaces from the input string
    name = name.trim();

    // Check if all characters in the string are alphabets or whitespace
    return /^[a-zA-Z\s]+$/.test(name);
}

console.log(validate("John"));  // Expected output: true
console.log(validate("12345"));  // Expected output: false
console.log(validate(null));  // Expected output: false
console.log(validate(undefined));  // Expected output: false
console.log(validate());  // Expected output: false
console.log(validate(" John "));  // Expected output: true
console.log(validate("john"));  // Expected output: true
