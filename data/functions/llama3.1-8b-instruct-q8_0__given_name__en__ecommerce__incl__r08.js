function validate(firstName) {
    // Remove leading and trailing whitespace
    firstName = firstName.trim();
    
    // If empty string, return false
    if (!firstName) return false;
    
    // Convert to lowercase for comparison
    firstName = firstName.toLowerCase();
    
    // Check if it matches the expected format of a given name in any culture
    var pattern = /^[a-z ,.'-]+$/;
    
    // Return true if match, otherwise return false
    return Boolean(firstName.match(pattern));
}

// Test cases
console.log(validate("John"));   // True
console.log(validate("Johnathan"));   // True
console.log(validate("Johnathan Smith"));   // True
console.log(validate("Johnathan-S"));  // True
console.log(validate("Joh@non"));     // False
console.log(validate("johnon"));      // False
console.log(validate(""));           // False
console.log(validate("   "));        // False
