function validate(lastName) {
    /**
     * Validate if the given string is a valid last name (family name)
     *
     * A valid last name should be:
     * - At least 1 character long (ignoring leading/trailing whitespace)
     * - At most 50 characters long (ignoring whitespace)
     * - Contain only letters, digits, apostrophes, hyphens, and whitespace
     *
     * @param {string} lastName The last name to validate
     * @return {boolean} True if the last name is valid, false otherwise
     */

    // Remove leading/trailing whitespace from the string
    lastName = lastName.trim();

    // Check if the string is empty
    if (lastName.length === 0) {
        return false;
    }

    // Check if the string is longer than 50 characters
    if (lastName.length > 50) {
        return false;
    }

    // Initialize an empty character class to match a wide range of allowed characters
    let charClass = '';

    // Add allowed digits, letters and some punctuation marks to the character class
    for (const char of "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'" + "'-") {
        charClass += char;
    }

    // Check if all characters in the string are valid using a regular expression
    return !/[^${charClass} ]/.test(lastName) &&
           !!/\.\s/.test(lastName);
}

// Test cases
console.log(validate(" "));  // false
console.log(validate("   "));  // false
console.log(validate(""));  // false
console.log(validate("a"));  // true
console.log(validate("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'" + "'-"));  // true
console.log(validate("-"));  // false
console.log(validate("'"));  // false
console.log(validate("("));  // false
console.log(validate("$"));  // false
