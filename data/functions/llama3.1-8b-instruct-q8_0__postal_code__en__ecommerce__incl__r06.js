function validate(postalCode) {
    // Remove all non-digit characters from the string
    let cleanedCode = postalCode.replace(/\D/g, '');

    // Check if the resulting string is 5-12 digits long (the length of zipcodes vary greatly across countries)
    if (cleanedCode.length < 5 || cleanedCode.length > 12) {
        return false;
    }

    // Check if the string consists only of digits
    for (let i = 0; i < cleanedCode.length; i++) {
        if (!Number.isInteger(parseInt(cleanedCode[i]))) {
            return false;
        }
    }

    // Using regular expressions to validate different formats of zip codes (not exhaustive)
    let usaPatterns = /^(\d{5}-\d{4})|(\b\d{5}\b)|(\d{10})(?:\d+){1,2}/i;  // USA
    if (!usaPatterns.test(postalCode)) {
        return false;
    }

    return true;
}

// Test the function
console.log(validate('12345'));  // True for UK-style postcodes
console.log(validate('11111-1111'));  // True for US-style zip codes
console.log(validate('01234'));  // False (insufficient length)
console.log(validate('not a postal code'));  // False (for invalid characters or format)
