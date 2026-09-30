function validate(postalCode) {
    let reg = /^([A-Z]{1}[0-9]\d{2})( [0-9A-Z]{3})?$/;
    return reg.test(postalCode);
}

console.log(validate("M5V1E4")); // true
console.log(validate("123 Main St")); // false
console.log(validate("M5V 1E4")); // true
