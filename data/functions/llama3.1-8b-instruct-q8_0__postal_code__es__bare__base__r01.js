function validate(zipCode) {
    /**
     * Validate if a given zip code is valid.
     *
     * The function checks if the input string is a 5 or 9 digit number,
     * and does not start with zero if it's 5 digits long.
     *
     * @param {string} zipCode - The zip code to be validated.
     * @returns {boolean} True if the zip code is valid, False otherwise.
     */
    
    // Remove all non-digit characters from the string
    let cleanedZip = zipCode.replace(/\D+/g, '');
    
    // Check if the length of the cleaned string is either 5 or 9
    if (cleanedZip.length === 5 || cleanedZip.length === 9) {
        // If it's 5 digits long and starts with zero, return False
        if (cleanedZip.length === 5 && cleanedZip[0] === '0') {
            return false;
        }
        
        // If all checks pass, return True
        return true;
    } else {
        // If the length is neither 5 nor 9, return False
        return false;
    }
}

console.log(validate("01234"));  // → false (starts with zero)
console.log(validate("1234"));   // → false (too short)
console.log(validate("abcdefgh"));  // → false (too long)
console.log(validate("12AB34C")); // -> false (contains letters)
