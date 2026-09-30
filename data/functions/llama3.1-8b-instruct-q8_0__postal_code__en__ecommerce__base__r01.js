function validate(postalCode) {
    // Check if the string is empty or null
    if (!postalCode) return false;

    // Remove any spaces from the string
    postalCode = postalCode.replace(/\s/g, '');

    // Convert the string to uppercase
    postalCode = postalCode.toUpperCase();

    // Check if the length of the string is not 6 characters (example: AB1C2E)
    if (postalCode.length !== 6) return false;

    // If the length is correct, check if it matches the regular expression pattern
    var regex = /^[A-Z]\d[A-Z] \d[A-Z]\d$/;
    
    // Return tru if it's a match with the regex pattern
    return regex.test(postalCode);
}
