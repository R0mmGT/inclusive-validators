function validate(s) {
    // Check if contains alphanumeric characters, spaces, or special characters like ". # -"
    let pattern = /^[\w\s#.]+$/;
    return pattern.test(s);
}

// Test cases
console.log(validate("123 Main St"));  // Expected output: true
console.log(validate("123 Main St.")); // Expected output: true
console.log(validate("123 Main St#")); // Expected output: true
console.log(validate("123 Main St-")); // Expected output: true

console.log(validate("123MainSt"));  // Expected output: false (contains special character '@')
console.log(validate("123 Main Street Ave"));  // Expected output: true
