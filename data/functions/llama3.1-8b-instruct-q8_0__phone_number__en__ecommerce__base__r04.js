function validate(phoneNumber) {
    var phoneNumberRegex = /^[01]?[-\s\.]?\(?([0-9]{3})\)?[-\s\.]?([0-9]{3})[-\s\.]?([0-9]{4})$/;
    return phoneNumberRegex.test(phoneNumber);
}

console.log(validate("123456789"));  // false
console.log(validate("(123) 4567890"));  // true
console.log(validate("+1 (123) 4567890"));  // true
console.log(validate("123.456.7890"));  // true
