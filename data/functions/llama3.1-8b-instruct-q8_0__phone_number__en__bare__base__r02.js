function validate(phoneNumber) {
    // Remove all non-digit characters from the input string
    let digitsOnly = phoneNumber.replace(/\D+/g, '');
    
    // Check if the number of digits is 10 (a standard US phone number)
    if (digitsOnly.length !== 10) {
        return false;
    }
    
    // Check if the first digit is not 0 or 1
    if ('01234'.includes(digitsOnly[0])) {  
        return false;
    }  
    
    return true;
}

console.log(validate("(123) 456-7890"));  // Expected output: true
console.log(validate("123-456-7890"));   // Expected output: true
console.log(validate("1234567890"));     // Expected output: true
console.log(validate("9876543210"));     // Expected output: false
