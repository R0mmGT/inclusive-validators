function validate(phoneNumber) {
    /**
     * Validate if the given string is a valid phone number.
     *
     * @param {string} phoneNumber - The phone number to be validated.
     * @return {boolean} True if the phone number is valid, False otherwise.
     */
    
    // Remove all non-digit characters from the phone number
    let num = phoneword.replace(/[^\d]/g, '');
    
    // Check if the extracted digits are in a valid sequence for a 10-digit US mobile phone number (XXX-XXX-XXXX)
    return new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{4}$').test(num);
}

// Example usage:
console.log(validate("123-456-7890")); // True
console.log(validate("1234567890"));   // False (no hyphens)
console.log(validate("(123) 456-7890")); // False (invalid characters)
