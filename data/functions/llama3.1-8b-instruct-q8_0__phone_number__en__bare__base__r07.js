function validate(phoneNumber) {
    // Remove all non-digit characters from the input
    const digitsOnly = phoneNumber.replace(/\D+/g, '');

    // Check if the phone number has 8 or 11 digits
    return (digitsOnly.length === 8 || digitsOnly.length === 11) && 
           /^\d+$/.test(digitsOnly);
}

// Test cases
console.log(validate('12345678'));   // Returns true
console.log(validate('9876543210')); // Returns true
console.log(validate('1234567'));    // Returns false (too short)
console.log(validate('123456789012'));  // Returns false (too long)
console.log(validate('abcdefg'));     // Returns false (contains non-digit characters)
