function validate(firstName) {
    // If string is empty, return false as it's not a valid name
    if (firstName.length === 0) {
        return false;
    }

    // Check if string contains any non-alphabetic characters other than spaces and apostrophes
    for (let i = 0; i < firstName.length; i++) {
        let charCode = firstName.charCodeAt(i);
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32 || charCode === 39)) {
            return false;
        }
    }

    // Check if string is not too long
    if (firstName.length > 20) {
        return false;
    }

    // If all checks pass, the name is considered valid
    return true;
}

// Test cases:
console.log(validate("John"));  // Expected output: true
console.log(validate("Janina");  // Expected output: true
console.log(validate("Jo'hanna"));  // Expected output: false (apostrophe but also too long)
console.log(validate(""));  // Expected output: false
console.log(validate("12345"));  // Expected output: false
