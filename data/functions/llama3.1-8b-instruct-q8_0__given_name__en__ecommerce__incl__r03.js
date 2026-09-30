function validate(firstName) {
    // First, we remove leading/trailing whitespaces from the input string
    firstName = firstName.trim();
    
    // Then, we check if the string is empty or null
    if (!firstName) return false;
    
    // We then check if the string matches one or more alphabets (both lowercase and uppercase)
    // as per Unicode standard which includes all characters in all languages.
    // We also include accented characters to handle first names like François and Ásta.
    let match = firstName.match(/^[\p{L}\s\.\'-]+$/u);
    
    // If there's no match, then the name is not valid
    if (!match) return false;
    
    // Finally, we check if the string length is within a reasonable range (1-50)
    if (firstName.length < 1 || firstName.length > 50) return false;
    
    // If all checks pass, the first name is valid
    return true;
}

console.log(validate('John'));  // Expected output: true
console.log(validate('Juan');   // Expected output: true
console.log(validate('François'));  // Expected output: true
console.log(validate('Ásta'));  // Expected output: true
console.log(validate(''));       // Expected output: false
console.log(validate(null));     // Expected output: false
console.log(validate(123));      // Expected output: false
console.log(validate('a'.repeat(51)));         // Expected output: false

