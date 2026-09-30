function validateName(name) {
    /**
     * Checks if the given string is a valid full name of a person.
     *
     * @param {string} name - The input string to be validated.
     * @returns {boolean} True if the string is a valid full name, false otherwise.
     */
    
    // The input should not be empty
    if (!name) {
        return false;
    }
    
    // Split the string into words (assuming each word represents a person's name)
    let words = name.split(' ');
    
    // A valid full name must have at least two names and one surname
    if (words.length < 2) {
        return false;
    }
    
    // Check each word in the list of words for validity
    for (let i = 0; i < words.length; i++) {
        // A string is not a valid name if it's too short or too long, or contains special characters other than apostrophes and hyphens
        if ((words[i].length >= 3 && !/[a-zA-Z'-'0-9]/.test(words[i])) || words[i] === '') {
            return false;
        }
        
        // If a word ends with a dot (.), remove it before applying the above rule to avoid checking '.' itself as an invalid name
        if (words[i].length > 1 && words[i].charAt(words[i].length - 1) === '.') {
            let temp = words[i];
            words[i] = temp.slice(0, temp.length - 1);
        }
    }
    
    // If the function has not returned False by now, it means the input string is a valid full name
    return true;
}

// Example usage:
console.log(validateName('John Doe'));  // Expected output: True
console.log(validateName('   John Doe'));  // Expected output: True
console.log(validateName('1John Doe '));  // Expected output: False
console.log(validateName('John. Doe '));  // Expected output: True
console.log(validateName('John Doe.'));  // Expected output: False
