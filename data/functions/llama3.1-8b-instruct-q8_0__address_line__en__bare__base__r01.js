function validate(address) {
    // Define patterns for common parts of a US street address
    const pattern = /^(?:1 [0-9]|2[0-8]|[3-9] [0-9]|10 [01|[2468]|52|[3579]|[6-9]))? ?(?:[A-Z][a-z]{2,}|[0-9]{1,2} ?[A-Z]?[a-z]*)$/;
    
    // Match the pattern at the beginning of the address
    const match = address.match(pattern);
    
    return match && match.index === 0;
}

console.log(validate("123 Main St"));  // Expected output: true
console.log(validate("456 Elm Rd"));   // Expected output: true
console.log(validate("789 Oak Cir"));  // Expected output: true
console.log(validate("100 1st Ave"));  // Expected output: false
console.log(validate("234 W Maple Dr")); // Expected output: false
