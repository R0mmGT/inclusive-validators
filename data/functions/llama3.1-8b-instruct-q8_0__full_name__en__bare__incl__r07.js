function validate(fullName) {
    /**
     * Validate if a given string is a valid full name of a person.
     *
     * @param {string} fullName - The full name to be validated.
     * @returns {boolean} True if the name is valid, False otherwise.
     */
    
    // Split the full name into names
    let names = fullName.split(' ');
    
    // Check if there are at least two names (first and last) or more than four names (multiple middle names)
    if ((names.length < 2 || names.length > 4)) {
        return false;
    }
    
    // Iterate over each name in the list of names
    for (let i = 0; i < names.length; i++) {
        
        // Check if a name is empty, which would indicate an invalid full name format
        if (!names[i]) {
            return false;
        }
        
        // Use regular expressions to check some common patterns of valid words for names
        let wordPattern = /^[a-zA-Z\s]+$/;  // Allow letters and spaces only
        
        // If a name does not match the pattern, it is considered invalid
        if (!wordPattern.test(names[i])) {
            return false;
        }
        
        // Use regular expressions to check for common invalid characters in names (umlauts etc.)
        let specialChars = /[^a-zA-Z\s!\"#¤%&/\(\)=§£€\[\]\*\+@\^\{\|\}<>\?~\_\-]*/g;
        
        // If a name contains any of these characters, it's not valid
        if (names[i].match(specialChars)) {
            return false;
        }
    }
    
    // After passing all checks, the full name is considered valid
    return true;
}
