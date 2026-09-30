function validate(s) {
    /**
     * Validate whether the input string is a valid postal code or not.
     *
     * @param {string} s The potential postal code to be validated.
     *
     * @returns {boolean} True if the input string is a valid postal code, False otherwise.
     */
    
    // Check if the length of the postal code is within 2-10 characters
    if (s.length < 2 || s.length > 10) {
        return false;
    }
        
    // Initialize flag to indicate whether the postal code contains any digit or not 
    let hasDigit = false;
    
    // Iterate over each character in the input string
    for (let c of s) {
        // Check if the character is a digit, space or letter; if it's not then return False
        if (!(/[^a-zA-Z0-9\s]/).test(c)) {
            hasDigit = true;
        } else {
            // If not return False
            return false;
        }
    }
    
    // Check if the postal code contains digit or not, 
    // if it doesn't then return False
    if (!hasDigit) {
        return false;
    }
        
    // Return True as all checks passed hence postal code is valid
    return true;
}
