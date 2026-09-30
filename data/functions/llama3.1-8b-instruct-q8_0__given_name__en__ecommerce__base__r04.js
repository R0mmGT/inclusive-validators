function validate(name) {
    /**
     * Returns true if the given string is a valid first name, false otherwise.
     */
    
    // Remove leading and trailing whitespace from the input string
    name = name.trim();
    
    // If the string is empty or only contains non-alphabetic characters, it's not a valid first name
    if (!name || !/^[a-zA-Z]+$/.test(name)) {
        return false;
    }
    
    // First names can be at most 30 characters long
    if (name.length > 30) {
        return false;
    }
    
    // If the string passes all these checks, it's valid
    return true;
}

console.log(validate("John"));  // Expected output: true
console.log(validate("Jane Doe"));  // Expected output: false
console.log(validate("jane doe"));  // Expected output: false
console.log(validate("Too long name"*30));  // Expected output: false
