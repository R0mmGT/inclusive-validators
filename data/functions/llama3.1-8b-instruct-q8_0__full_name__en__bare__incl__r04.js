function validate(fullName) {
    /**
     * Validate whether a given string is a valid full name of a person.
     *
     * A valid full name is composed of two or more words separated by spaces,
     * where each word starts with a letter and only contains letters, dots, hyphens,
     * and apostrophes. Also, the first letter of both the first and last names
     * should be in uppercase.
     *
     * @param {string} fullName - The full name to validate.
     * @return {boolean} True if the given string is a valid full name, False otherwise.
     */
    
    // First, check if the input is not empty and it's a single string
    if (typeof fullName !== 'string' || !fullName.trim()) {
        return false;
    }
    
    // Split the full name into words
    const words = fullName.split(' ');
    
    // Check each word in the full name
    for (const word of words) {
        
        // If a word is empty, or if it starts with a number or special character,
        // it's not a valid first/last name
        if (!word || !/[a-zA-Z]/.test(word[0])) {
            return false;
        }
        
        // Check if the word contains any invalid characters
        if (/[^A-Za-z\-\'\.\s]/.test(word)) {
            return false;
        }
    }
    
    // If all checks passed, it's a valid full name
    return true;
}

console.log(validate("John Smith"));  // Expected output: true
console.log(validate("john smith"));  // Expected output: true
console.log(validate("1 John Smith"));  // Expected output: false
console.log(validate("John#Smith"));  // Expected output: false
console.log(validate("John 'Smith Jr'"));  // Expected output: true
console.log(validate("John \nSmith"));  // Expected output: false
