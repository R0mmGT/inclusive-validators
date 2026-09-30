function validate(input) {
    let pattern = /^[a-zA-Z ]+$/;
    return pattern.test(input);
}

console.log(validate("John Doe"));  // Expected output: true
console.log(validate("John Joe"));   // Expected output: false
console.log(validate(123));          // Expected output: false
