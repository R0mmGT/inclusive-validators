function validate(phoneNumber) {
    let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneNumber.length === 12 && phoneNumber.match(pattern);
}

console.log(validate("12345678901")); // false
console.log(validate("(123) 456-7890")); // true
console.log(validate("123.456.7891")); // true
