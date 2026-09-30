function validate(s) {
    /**
     * Validate if a given string is a valid first name (given name).
     *
     * @param {string} s - The input string to be validated.
     * @returns {boolean} True if the string is a valid first name, False otherwise.
     */
    
    // Remove leading and trailing whitespace
    s = s.trim();
    
    // First name should not be empty or null
    if (s === '') {
        return false;
    }
    
    // First character of First name should not be a number and should be alphabets or underscore
    if (!/^[a-zA-Z_]$/.test(s[0])) {
        return false;
    }
    
    // If second character is there, then it can also be an alphabet or an underscore. 
    // Otherwise for first names with only one character (like 'A' or '_'), function should return true
    if (s.length > 1 && !/^[a-zA-Z_]$/i.test(s[1])) {
        return false;
    }
    
    // From then onwards, a Character can be any Alphabet. It means we can have first names with more than one Alphabets also like "Abc", "abcXyZ" etc.
    for (let c of s.slice(2)) {  
        if (!/^[a-zA-Z]$/.test(c)) {
            return false;
        }
    }  
    
    // If all conditions are met, then first name is valid
    return true;
}

console.log(validate("John"));  // Expected output: true
console.log(validate("123abc")); // Expected output: false
console.log(validate("_abcDef"));  // Expected output: true
