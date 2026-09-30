function validate(zipcode) {
    let pattern = /^([ABCEGHJKLMNPRSTVXY]\d)\s*\d\s*([ABCEGHJKLMNPRSTVWXYZ])\d$/;
    return !!zipcode.match(pattern);
}

console.log(validate("M4B 1E4")); // true
console.log(validate("123 Main St")); // false
