function validate(phoneNumber) {
    const phoneNumberPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneNumber.match(phoneNumberPattern) !== null;
}

console.log(validate("(123) 456-7890")); // true
console.log(validate("123-456-7890")); // true
console.log(validate("123 456 7890")); // true
console.log(validate("(123)456-7890")); // true
console.log(validate("invalid phone number")); // false
