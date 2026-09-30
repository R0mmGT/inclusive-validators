/**
 * Validates if the given string is a valid last name (family name) of a person.
 * 
 * A valid last name should match the following rules:
 * - It must be at least 2 characters long.
 * - It can contain only letters, spaces, hyphens and apostrophes.
 * @param {string} name Last name to be validated
 * @returns {boolean} True if the given string is a valid last name; false otherwise.
 */
function validate(name) {
    // check if the input string has at least 2 characters
    if (name.length < 2) {
        return false;
    }
    
    // iterate over each character in the string
    for (let char of name) {
        // check if the character is a letter, a space, a hyphen or an apostrophe
        if (!((char === char.toLowerCase() && char.match(/[a-z]/)) || 
              (char === char.toUpperCase() && char.match(/[A-Z]/)) || 
              char === ' ' || char === '-' || char === "'")) {
            return false;
        }
    }
    
    // if no conditions were met to return false, the function returns true
    return true;
}
