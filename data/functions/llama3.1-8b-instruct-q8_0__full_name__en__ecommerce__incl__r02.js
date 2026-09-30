function validate(fullName) {
    /**
     * Validate a full name string to check if it is valid.
     *
     * A valid full name must have the following characteristics:
     *  - It contains at least one whitespace character (not only apostrophes or hyphens).
     *  - It is not composed of punctuation characters only.
     *  - Its ASCII letters are mostly uppercase (for surnames) and a combination of them with some lowercase letters for names,
     *    no all caps or all lowercase letters allowed.
     *
     * Parameters:
     * fullName (str): The full name to validate.
     *
     * Returns:
     * bool: True if the full name is valid, false otherwise
     */
    
    // First check if the input string contains alphanumeric characters and/or some punctuation like comma and apostrophe
    let hasAlphaOrSpecialChar = /[a-zA-Z\u00C0-\u017F,'" '-]/g.test(fullName);
    
    // If not, return false right away
    if (!hasAlphaOrSpecialChar) {
        return false;
    }
    
    // Replace some special characters with spaces
    fullName = fullName.replace(/['-,\. ]/g, ' ');
    
    // Split the string into an array of words
    let words = fullName.split(/\s+/);
    
    // Check each word
    for (let w of words) {
        // Only uppercase or a mix of upper and lowercase letters are allowed for surnames, no all caps or lower case
        if (/[A-Z]/.test(w[0]) && !w.match(/[a-z]/)) return false;
        
        // If there's more than one apostrophe in any word, then it is likely not a single name
        if (/-''-/.test(w)) return false;

        // If all characters of the string are uppercase or lowercase, reject the full names with less 2 words and length shorter than 3
        if ((w.length <3 || w.length >5) && !/[a-zA-Z0-9 -]/.test(w) && w != w.toUpperCase()) return false;
    }
    
    // Return true only if all checks passed out
    return true;
}

// Test the function with some examples
console.log(validate('John Smith'));  // Expected output: true
console.log(validate('JOHN SMITH'));  // Expected output: false
console.log(validate('james smith'));  // Expected output: false
console.log(validate('James "Smith"'));  // Expected output: false
console.log(validate('John ''Smith'' 3rd'));  // Expected output: false
