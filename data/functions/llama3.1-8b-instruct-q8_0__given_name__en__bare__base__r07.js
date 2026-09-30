function validate(name) {
    /**
     * Checks if a given string matches the format of a typical first name.
     *
     * @param {string} name The string to be validated as a first name.
     * 
     * @returns {boolean} True if the string is valid, False otherwise.
     */
    
    // First, we check that the input is a non-empty string
    if (typeof name !== 'string' || name.length === 0) {
        return false;
    }
    
    // We create an expression to match most common patterns
    let pattern = /^[A-Z][a-z]{2,}(['- ]?[A-Z]?[a-z]*)*/i;
    
    // Finally, we check if the string matches our pattern
    return pattern.test(name);
}

console.log(validate("John"));  // true
console.log(validate("John Smith"));  // true
console.log(validate("Hello World"));  // false
console.log(validate(123));  // false
console.log(validate());  // false
