/**
 * Validates whether a given string is a valid last name (family name).
 *
 * A valid last name should be at least 2 characters long, have only alphabetic characters and spaces,
 * not exceed 30 characters in length, or start with a space character.
 *
 * @param {string} surname - The potential last name to validate
 * @returns {boolean} True if the string is a valid last name, false otherwise
 */
function validate(surname) {
    // First, we check if the input is not empty and its length is at least 2 characters
    if (!surname || surname.length < 2) {
        return false;
    }

    // Then, we check if all characters in the string are alphabetic or a space
    for (let char of surname) {
        // Use String charCodeAt() method to get ASCII value and checking with condition(65-90 || 97-122)
        if (!((char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) || (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) || char === ' ')) {
            return false;
        }
    }

    // Finally, we check if the length of the string does not exceed 30 characters
    return surname.length <= 30;
}

// Example usage:
console.log(validate("Smith"));  // Should print true
console.log(validate("ABcdE"))   // Should print false - "A" and "B" are uppercase letters.
console.log(validate("aBcde"))   // Should print true
