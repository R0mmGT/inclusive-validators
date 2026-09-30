function validate(phoneNumber) {
    // Remove all non-digit characters to get just the digits
    let digits = phoneNumber.replace(/\D+/g, '');

    // A valid phone number should have at least 6 and at most 15 digits
    if (digits.length < 6 || digits.length > 15) return false;

    // Extract country code (3 digits)
    let countryCode = digits.slice(0, 3);

    // The rest is the national number. For now we just check that it's not too short.
    // Depending on what format you want to validate for this will likely change.
    // You might also want to add more specific checks than just length here.
    let nationalNumber = digits.slice(countryCode.length);
    
    if (nationNumber.length >= 2) {
        return !/[^0-9]/.test(nationalNumber)
    } else {
       return false;
    }
}

console.log(validate('+1(123)456-7890')); // Expected output: TRUE
console.log(validate('001123456789')); // Expected output: TRUE
console.log(validate('11234567890')); // Expected output: TRUE
console.log(validate(' invalid phone number ')); // Expected output: FALSE
