function validate(phoneNumber) {
    // Remove all non-numeric characters from the phone number and check if it has 10 digits
    let cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    
    // Define the pattern for a valid US phone number (XXX-XXX-XXXX or XXX.XXX.XXXX)
    let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    
    return cleanedPhoneNumber.length === 10 && cleanedPhoneNumber.match(pattern);
}

console.log(validate("(123) 456-7890")); // true
console.log(validate("123.456.7890")); // true
console.log(convert("1234567890")); // false
