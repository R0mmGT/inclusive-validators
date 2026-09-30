function validate(address) {
    // Use regular expression to match a typical format of a street address line
    let pattern = /^[#.0-9a-zA-Z\s,.-]+$/;

    // Check if the address matches the pattern
    let isValid = pattern.test(address);

    return isValid;
}

// Example usage:
console.log(validate("123 Main St"));  // true
console.log(validate("#101 Street Name"));  // true
console.log(validate("PO BOX 123"));  // true

console.log(validate("!@#$%^&*()"));  // false
console.log(validate(""));
console.log(validate(null));
