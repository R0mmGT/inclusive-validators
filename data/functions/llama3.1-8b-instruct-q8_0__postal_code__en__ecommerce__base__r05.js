function validate(postalCode) {
    /**
     * Validate if the given string is a valid postal code.
     * 
     * A valid postal code consists of 5 or 6 characters, with or without a space.
     * It can include letters and numbers, but must start with at least one letter.
     * After the first character, it can contain any length of digits and spaces.
     *
     * @param {string} postalCode The string to validate as a postal code.
     * @returns {boolean} True if the given string is a valid postal code, false otherwise.
     */
    
    // Remove leading and trailing whitespace
    postalCode = postalCode.trim();
    
    // Check if postalCode has exactly 5 or 6 characters
    if (postalCode.length !== 5 && postalCode.length !== 6) {
        return false;
    }
    
    // If the first character is not a letter, but the rest of the string is either all digits and/or spaces
    if (!/^[a-zA-Z]$/.test(postalCode.charAt(0)) && postalCode.substring(1).match(/^[0-9\s]$/) === null) {
        return false;
    }
    
    // If none of the conditions above are met, try to match all characters as a whole word
    if (!postalCode.match(/^[\w\s]{5}$/i) && !postalCode.match(/^[\w\s]{6}$/i)) {
        return false;
    }
    
    return true;
}
