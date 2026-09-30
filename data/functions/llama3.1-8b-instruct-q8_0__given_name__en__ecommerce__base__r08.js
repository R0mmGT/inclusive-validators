function validate(input) {
    const regex = /^[A-Z][a-z]{1,20}$/;
    return regex.test(input);
}

console.log(validate("John"));  // Expected output: true
console.log(validate("JohnDoe"));  // Expected output: false
console.log(validate("jane"));  // Expected output: false
