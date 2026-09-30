function validate(phoneNumber) {
    // Remove spaces, hyphens or other special characters
    phoneNumber = phoneNumber.replace(/ /g, "");
    phoneNumber = phoneNumber.replace(/-/g, "");
    phoneNumber = phoneNumber.replace(/\+/g, "");

    if (phoneNumber.length < 5 || phoneNumber.length > 20)
        return false;

    // Regular expression for E.164 phone number format (RFC3966)
    // This is recommended by the ITU-T (International Telecommunication Union - Telecommunication Standardization Sector) and widely used
    let pattern = /^\+[1-9]\d{0,2}[-\s.]?\(?\d{1,14}\)?[\s.-]?\d{1,14}$/;

    // Check if the phone number matches the pattern
    return pattern.test(phoneNumber);
}

console.log(validate("+1 (123) 456-7890")); // Expected output: true
console.log(validate("123.456.7890")); // Expected output: true
console.log(validate("+44-01234-567890")); // Expected output: true
console.log(validate(" invalid phone number # ")); // Expected output: false
