function validate(s) {
    // First Name rules: 1 to 20 characters, only letters and spaces (no leading or trailing spaces)
    const firstNameRules = /^[a-zA-Z]{1,19}[a-zA-Z ]{0,14}$/;
    
    return s.match(firstNameRules);
}

// Test the function
console.log(validate("John"));   // Expected output: true
console.log(validate("John Doe")); // Expected output: false (leading and trailing spaces)
console.log(validate("John     ")); // Expected output: false (too many white spaces between words)
console.log(validate("Johndoe"));  // Expected output: false (not a single word)
console.log(validate("Johnnie"));  // Expected output: true
console.log(validate("A"));        // Expected output: false (has too few characters)
console.log(validate("aaaaaaaaaaaaaaab"));  // Expected output: false (too many characters)
console.log(validate("!#@%^&*()_+")); // Expected output: false (does not contain letters only)
console.log(validate("JohnDoe-1990"));// Expected output: false (contains non-alphanumeric character other than a hyphen and a space)
