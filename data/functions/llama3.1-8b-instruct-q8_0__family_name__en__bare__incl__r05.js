function validate(lastName) {
    /**
     * Validate if a given string is a valid last name (family name) of a person.
     *
     * @param {string} lastName The last name to be validated.
     * @return {boolean} True if the last name is valid, False otherwise.
     */
    
    // If the input string is empty or null, it's not a valid last name
    if (!lastName) return false;
    
    // Convert the last name to lowercase for case-insensitive validation
    lastName = lastName.toLowerCase();
    
    // Remove any leading or trailing whitespace from the last name
    lastName = lastName.trim();
    
    // If the length of the last name is less than 2 characters, it's not valid
    if (lastName.length < 2) return false;
    
    // Check if all characters are letters (a-z, A-Z)
    for (let char of lastName) {
        let codePoint = char.charCodeAt(0);
        if (!(97 <= codePoint && codePoint <= 122 || 65 <= codePoint && codePoint <= 90)) {
            return false;
        }
    }
    
    // If the above conditions are met, it's a valid last name
    return true;
}
