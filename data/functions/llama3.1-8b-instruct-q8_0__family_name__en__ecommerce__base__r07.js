function validate(lastName) {
    // Regular expression pattern for matching valid last names
    let pattern = /^[a-zA-Z'-]+$/;

    // Check if the input string matches the pattern
    return pattern.test(lastName);
}

// Example usage:
console.log(validate('Smith'));  // Returns: true
console.log(validate('J-OHN'));  // Returns: true
console.log(validate('John-Smith'));  // Returns: false
