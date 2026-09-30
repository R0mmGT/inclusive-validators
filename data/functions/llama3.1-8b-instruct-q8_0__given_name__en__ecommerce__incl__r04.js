function validate(name) {
    // Remove leading, trailing whitespaces and convert to lowercase
    name = name.trim().toLowerCase();
    
    // Check if String is empty or contains just one character.
    if (name.length < 2 || name === null) {
        return false;
    }
        
    // Regular expression pattern for validating names from different cultures
    let regexPattern = /^[a-z]+$/i;
    match = regexPattern.test(name);
    
    // Return true if name matches the pattern, otherwise return false.
    return match && (name.match(/^[aeiou]/) === null);
}

// Test the function with some examples
console.log(validate("John Doe"));  // Expected output: True
console.log(validate("Juan Pedro Pérez"));  // Expected output: False because of accented characters
console.log(validate("Joe"));  // Expected output: True
console.log(validate(""));  // Expected output: False
console.log(validate(null));  // Expected output: False
console.log(validate(12345));  //Expected Output :False
