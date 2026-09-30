function validate(lastName) {
    /**
     * This function validates a given string as a valid last name.
     *
     * A valid last name should be:
     * - at least 2 characters long
     * - at most 60 characters long
     * - composed only of letters, spaces and some special characters
     * 
     * @param {string} lastName The input string to check.
     * 
     * @returns {boolean} True if the input is a valid last name, False otherwise.
     */

    // If the string is null or undefined, it's not a valid last name
    if (lastName == null) {
        return false;
    }

    // If the string is too short or too long, it's not a valid last name
    if (lastName.length < 2 || lastName.length > 60) {
        return false;
    }

    // We iterate over all characters in the string
    for (let char of lastName) {
        // If the character is not a letter, space or one of some special characters, it's not valid
        if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' ' || ['-','.',',',"'"," ","_"].includes(char))) {
            return false;
        }
    }

    // If we've passed all checks, the string is a valid last name
    return true;
}

console.log(validate("Smith"));  // Expected output: true
console.log(validate("John"));   // Expected output: false
console.log(validate(null));     // Expected output: false
console.log(validate("a"));      // Expected output: false
