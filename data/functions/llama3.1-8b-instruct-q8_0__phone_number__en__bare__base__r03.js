function validate(phoneNumber) {
    // Define regular expression for validation.
    let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    
    // Test if the phone number matches the pattern and return result
    return phoneNumber.match(pattern);
}

console.log(validate("(123) 456-7890")); // true
console.log(validate("123.456.7890")); // true
console.log(validate("1234567890")); // true
console.log(validate("123-456-7890")); // true
console.log(validate("(123) 456")); // false (missing last four digits)
console.log(validate("12345678")); // false (missing first or last 1, 2, or 3)
