function validate(phoneNumber) {
    let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (phoneNumber.match(pattern)) {
        return true;
    } else {
        return false;
    }
}

// Test cases
console.log(validate("(123) 456-7890"));  // Expected output: true
console.log(validate("123-456-7890"));  // Expected output: true
console.log(validate("123.456.7890"));  // Expected output: true
console.log(validate("1234567890"));  // Expected output: true

console.log(validate("(123)456-789"));  // Expected output: false
console.log(validate("1234567"));  // Expected output: false
