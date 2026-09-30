function validate(fullName) {
    // Split the input string into individual names.
    const names = fullName.split(' ');
    
    // Check if there is at least one name, and there are no more than 5 names (assuming this is enough to cover all cultures).
    return names.filter(name => name !== '').length >= 1 && names.length <= 5;
}

// Test the function
console.log(validate("John Doe"));  // Expected output: true
console.log(validate("Jane Doh"));  // Expected output: true
console.log(validate("John Doe Jane Smith"));  // Expected output: true
console.log(validate("Jane"));  // Expected output: false
console.log(validate("John    "));  // Expected output: false
console.log(validate("Janedoh"));  // Expected output: false
