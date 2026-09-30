function validate(name) {
    /**
     * Validate if the given string is a valid full name.
     *
     * A valid full name consists of one or more words separated by spaces, 
     * where each word starts with a capital letter and the rest are lowercase letters.
     *
     * @param {string} name - The input full name to validate
     * @return {boolean} True if the name is valid, False otherwise
     */
    
    // Split the string into words using space as delimiter
    let words = name.split(' ');
    
    // Check each word individually
    for (let word of words) {
        // If a word does not start with a capital letter or contains anything other than lowercase letters and spaces, return False
        if (!/^[A-Z]/.test(word) || /[a-z]/i.test(word.slice(1)) !== word.slice(1).toLowerCase()) {
            return false;
        }
    }
    
    // If all checks pass, the name is valid, so return True
    return true;
}
