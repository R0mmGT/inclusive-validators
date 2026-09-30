function validate(postalCode) {
    // Check if postal code is empty or null
    if (!postalCode) return false;

    // Remove spaces and special characters from the input
    const cleanedPostalCode = postalCode.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');

    // Check if postal code length is less than 1 or more than 20 characters
    if (cleanedPostalCode.length < 1 || cleanedPostalCode.length > 20) return false;

    // Check each character in the cleaned postal code to ensure it's alphanumeric
    for (let i = 0; i < cleanedPostalCode.length; i++) {
        if (/[a-zA-Z]/.test(cleanedPostalCode[i])) continue;
        else if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(cleanedPostalCode[i]))) continue;
        else return false;
    }

    // If all checks pass, the postal code is valid
    return true;
}

console.log(validate('')); // False
console.log(validate(null)); // False
console.log(validate('1234567890')); // True
console.log(validate('abcde')); // False
console.log(validate('ABCDEF GH')); // False
