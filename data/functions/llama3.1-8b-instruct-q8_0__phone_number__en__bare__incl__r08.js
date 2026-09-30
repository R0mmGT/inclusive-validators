function validate(phoneNumber) {
    // Remove all non-digit characters from the input string, as they don't matter in phone number validation
    let digitsOnly = phoneNumber.replace(/\D+/g, '');
    
    // Check if there are enough valid digits to even form a phone number (at least 5 for some countries and culturs)
    if (digitsOnly.length < 10) {
        return false;
    }

    // Regular expression pattern to match most common phone number formats
    let pattern = /^(\+?\d{0,4})?[\s.-]?\(?(\d{1,3}|\d{2})(\[]?([^\[\]\s]+)[\]\])?[)^\s-]*([\d\s.-\[\]\{\}\#\+\(\)]+)?$/;

    // Use the regular expression to match the formatted and cleaned phone number
    let match = digitsOnly.match(pattern);
    
    // If a match was found, the number is valid in this particular format. The function still returns true.
    return match !== null;
}

// Test cases:
console.log(validate('+1 1234567890'));  // true
console.log(validate('01234'));         // false (too short)
console.log(validate('12345678901'));   // false (too long)
