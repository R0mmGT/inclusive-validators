function validate(s) {
    /**
     * This function checks whether a given string can be considered as a valid first name.
     *
     * @param {string} s The input string to be validated.
     * @returns {boolean} True if the string is a valid first name, False otherwise.
     */

    // First name should not contain numbers
    let hasNumber = false;
    for (let char of s) {
        const asciiVal = char.charCodeAt(0);
        if (asciiVal >= 48 && asciiVal <= 57) { 
            // ASCII value of '0' is 48 andASCII value of '9' is 57
            hasNumber = true; 
            break;
        }
    }

    if (hasNumber) return false;

    // First name should not be a single digit or a single character
    if ([...s].length <= 1) return false; 

    // Special characters in first names are quite rare, so we can safely assume they're invalid
    let hasSpecialChar = false;
    for (let char of s) {
        const asciiVal = char.charCodeAt(0);
        if ((asciiVal < 65 || asciiVal > 90) && 
            (asciiVal < 97 || asciiVal > 122)) {
            // ASCII values are from 65-90 for capitals and 97-122 for small letters
            hasSpecialChar = true; 
            break;
        }
    }

    if (hasSpecialChar) return false;

    // Names should be at least 2 characters long, but no more than a few dozen (we'll use 15 as max here)
    if ([...s].length < 2 || [...s].length > 15) return false; 

    return true;
}
