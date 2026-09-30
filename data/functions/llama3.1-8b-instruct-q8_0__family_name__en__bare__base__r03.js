function validate(lastName) {
    /**
     * Checks if a given string is a valid last name (family name).
     *
     * A valid last name should match one or more letters, followed by an optional hyphen and 
     * then another sequence of zero or more letters. This allows for names like 'van der Berg', 
     * but does not allow for names with other types of punctuation.
     *
     * @param {string} lastName - The last name to check.
     * @returns {boolean} True if the last name is valid, false otherwise.
     */

    // Check if input is a string
    if (typeof lastName !== 'string') {
        return false;
    }

    // Remove any whitespace from the first name to treat "John Smith" and "John Smith Jr." as the same
    lastName = lastName.trim().replace(/ /g, '');

    // Use regular expression to check for valid format.
    let pattern = /^[a-zA-Z]+[-\s]?[a-zA-Z]*$/;
    return Boolean(lastName.match(pattern));
}

console.log(validate('Doe'));  // true
console.log(validate('van der Berg'));  // true
console.log(validate('123 Doe'));  // false
console.log(validate(['Test', 'String', new Number(1)]));  // false
