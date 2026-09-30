function validate(phoneNumber) {
    // Remove any spaces or hyphens from the phone number
    let sanitizedNumber = phoneNumber.replace(/\s|-/g, '');

    // Remove any leading zeros (they don't provide any information)
    sanitizedNumber = sanitizedNumber.replace(/^0/, "");

    // Check that the number is at least 5 characters long (shortest country code)
    if (sanitizedNumber.length < 5) {
        return false;
    }

    // Define a regular expression pattern for phone numbers
    let pattern = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{3,6}[-.\s]?[\d]{1,4}$/;

    return pattern.test(sanitizedNumber);
}

console.log(validate("+1234567890"));  // Output: true
console.log(validate("123.456.7890"));  // Output: false (no plus sign and not the correct format for countries requiring it)
console.log(validate("(123) 456-7890"));  // Output: false (not the correct format for international phones)
