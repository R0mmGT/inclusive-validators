function validateFullName(fullName) {
    if (!fullName || typeof fullName !== 'string') return false;

    let words = fullName.trim().split(' ');
    if (words.length < 2 || words.length > 3) return false;
    
    for (let word of words) {
        if (!word.match(/^[A-Z][a-z]+$/)) return false;
    }
    
    return true;
}

console.log(validateFullName("John Smith")); // Expected output: true
console.log(validateFullName("John J'));     // Expected output: false
console.log(validateFullName('Smith John Doe'));  // Expected output: true
console.log(validateFullName(!null));             // Expected output: false
console.log(validateFullName());                 // Expected output: false
console.log(validateFullName(123));               // Expected output: false
