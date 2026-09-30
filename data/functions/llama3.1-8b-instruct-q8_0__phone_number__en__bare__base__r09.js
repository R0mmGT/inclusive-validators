function validate(phoneNumber) {
    let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneNumber.match(pattern);
}

console.log(validate('(123) 456-7890')); // should return true
console.log(validate('123-456-7890')); // should return true
console.log(validate('123.456.7890')); // should return true
console.log(validate('1234567890')); // should return false
console.log(validate('12345678901')); // should return false
