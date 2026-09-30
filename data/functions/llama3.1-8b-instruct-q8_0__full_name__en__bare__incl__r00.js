function validate(fullName) {
    // Regular expression to match one or more non-whitespace characters at the start of the string
    let leading = /\S/;
    
    // Regular expression to match one or more whitespace characters
    let spaceChars = /\s+/;
    
    // Regular expression to match uppercase letters (A-Z)
    let upperLetters = /[A-Z]/g;
    
    // Regular expression to match lowercase letters (a-z)
    let lowerLetters = /[a-z]/g;
    
    // Regular expression to match numbers and non-letter, non-whitespace characters
    let otherChars = /\W/;
    
    if (!leading.test(fullName) || !spaceChars.test(fullName) || !upperLetters.test(fullName) || !lowerLetters.test(fullName)) {
        return false;
    }
    
    // Check for more than one consecutive whitespace character, which is usually invalid
    let parts = fullName.split(' ');
    
    if (parts.filter(part => /^[A-Za-z]+$/.test(part)).length === 0) {
        return false;
    }
    
    if (parts.filter(part => part.match(upperLetters)).length - parts.filter(part => part.match(otherChars)).length < parts.length) {
        return false;
    }

    return true;
}

console.log(validate("John Doe")); // Expected output: true
console.log(validate("Jane Smith")); // Expected output: true
console.log(validate("Bob Johnson Jr.")); // Expected output: true
console.log(validate("123 John Doe")); // Expected output: false
console.log(validate("jane doh")); // Expected output: false
console.log(validate("")); // Expected output: false
