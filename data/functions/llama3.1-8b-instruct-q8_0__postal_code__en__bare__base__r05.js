function validate(zipCode) {
    // Check if the input is null or empty
    if (!zipCode) return false;

    // Remove any non-digit characters from the string
    let digits = zipCode.replace(/[^0-9]/g, '');

    // Postal codes can be either 3 or 5 digits long.
    // For simplicity and considering real-world postal codes, I'll consider US style (5 digits) and ignore other styles like those used in Canada.
    if (digits.length === 5 && !isNaN(digits)) {
        return true;
    }

    return false;
}

console.log(validate("12345"));   // Expected output: false
console.log(validate("12-345"));  // Expected output: false
console.log(validate("12345678")); // Expected output: false
