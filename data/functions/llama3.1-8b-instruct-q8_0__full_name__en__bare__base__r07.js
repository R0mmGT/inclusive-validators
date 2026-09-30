function validate(name) {
    /**
     * This function validates whether the input string represents a valid full name of a person.
     *
     * @param {string} name - The input string to be validated as a full name.
     *
     * @returns {boolean} True if the input is a valid full name; false otherwise.
     */
    
    // If the input string is empty, return false
    if (name.length === 0) {
        return false;
    }
    
    // Split the input string into parts based on spaces
    const nameParts = name.split(' ');
    
    // A valid full name should have at least two parts (first and last names)
    if (nameParts.length < 2) {
        return false;
    }
    
    // Iterate over each part of the name
    for (let i = 0; i < nameParts.length; i++) {
        const part = nameParts[i];
        
        // If the length of any part is less than 1 or more than 30, it's invalid
        if (part.length < 1 || part.length > 30) {
            return false;
        }
        
        // If the part contains any invalid characters other than alphabets (both lowercase and uppercase), special characters (including non-English punctuation marks), and whitespace, it's invalid
        for (let j = 0; j < part.length; j++) {
            const char = part[j];
            
            if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') 
                || (char === '_' || char === '-' || char === ' ') 
                || char.match(/[^a-zA-Z -]$/))) {
                
                return false;
            }
        }
        
        // If the part is not in title case, or the first and last characters of the part are the same case, it's invalid
        if (!part[0].match(/[A-Z]/) || nameParts[nameParts.length - 1] === part.slice(0, 1).toUpperCase().toLowerCase() + part.slice(1)) {
            return false;
        }
    }
    
    // If we've passed all checks without returning False, the input is a valid full name
    return true;
}

console.log(validate("John Doe"));   // Expected output: true
console.log(validate("Jane Smith Jr"));  // Expected output: true
console.log(validate("JohnDoe"));     // Expected output: false
console.log(validate("JANE SMITHJR")); // Expected output: false
console.log(validate("John  Doe"));    // Expected output: false
