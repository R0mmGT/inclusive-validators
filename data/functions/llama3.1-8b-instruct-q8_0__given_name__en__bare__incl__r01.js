function validate(fname) {
    /**
     * Validate if the input string is a valid first name (given name).
     *
     * @param {string} fname The string to be validated.
     * @return {boolean} True if the input string is a valid first name, False otherwise.
     */
    
    // Check if the string is not empty
    if (!fname) {
        return false;
    }
    
    // Remove leading and trailing whitespace characters
    fname = fname.trim();
    
    // If the length of the string is less than 2 or more than 30 characters, it's not a valid name
    if (fname.length < 2 || fname.length > 30) {
        return false;
    }
    
    // Use regular expression pattern to match common name patterns in most cultures and countries
    let testName = new RegExp('^[a-zA-Z\u2605_\u200D]+$');
    if (/\d/.test(fname)) {
        return false;  // Don't allow digits
    }
    if (/^([^\w])*$/.test(fname)) {  // A string is not purely alphanumeric or whitespace characters if its contains at least one non-alphanumeric character and no whitespace character.
        return false;
    }
    
    // If the name matches the pattern, it's a valid name
    return testName.test(fname);
}
