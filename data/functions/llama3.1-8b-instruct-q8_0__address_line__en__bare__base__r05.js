function validate(streetAddress) {
    let pattern = /^[#.0-9a-zA-Z\s]+$/;
    
    return pattern.test(streetAddress);
}

console.log(validate("123 Main St"));  // Expected output: true
console.log(validate("123 Main Street"));  // Expected output: false
console.log(validate("# 456 Elm Dr"));  // Expected output: true
console.log(validate("!@#$%^&*()_+"));  // Expected output: false
