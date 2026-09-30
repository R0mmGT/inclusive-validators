function validate(name) {
    // Check if the name is empty or contains only whitespace characters.
    if (!name.trim()) return false;
    
    // Check if the name contains at least two alphabetic characters and optionally one space character.
    if (!/(?=.*[a-zA-Z]).{2,}(?:\s{1}[a-zA-Z])?/g.test(name)) return false;
    
    return true;
}

console.log(validate("John"));  // Expected output: true
console.log(validate("John Smith"));  // Expected output: true
console.log(validate("12345 John Smith"));  // Expected output: false
console.log(validate(""));  // Expected output: false
console.log(validate("   "));  // Expected output: false
console.log(validate("!@#$%^&*() John"));  // Expected output: false
