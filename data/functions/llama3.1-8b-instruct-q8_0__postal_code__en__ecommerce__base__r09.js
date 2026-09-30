function validate(postalCode) {
    /**
     * Checks if the given string represents a valid postal code.
     *
     * The function assumes that a postal code is valid if it matches any of the following patterns:
     * - 5 digits (e.g., "12345")
     * - format "XXX ZZ" where 'X' and 'Z' are digits, but the first segment cannot contain a zero unless it's the last (e.g., "123 99", "012 34", but not "013 89")
     *
     * Parameters:
     * postalCode (str): The string to be validated.
     *
     * Returns:
     * bool: True if the string is valid, False otherwise.
     */

    // First, we check for a 5-digit postal code
    const fiveDigitRegex = /^\d{5}$/;
    
    // If the string matches this pattern, it's a valid postal code
    if (fiveDigitRegex.test(postalCode)) {
        return true;
    }

    // Otherwise, check for a postal code in the "XXX ZZ" format
    const zipCodeRegex = /^(\d{1}[2-9])?\s\d{2}$/;

    // If the string matches this pattern, it's a valid postal code
    if (zipCodeRegex.test(postalCode)) {
        return true;
    }

    // Check for a postal code with leading zeroes in segment 3 and then 4 digits
    const threeZeroesAndFourDigits = /^0\s\d{2}\s0\d$/;

    // If the string matches this pattern, it's a valid postal code
    if (threeZeroesAndFourDigits.test(postalCode)) {
        return true;
    }

    // Check for 6-digit non-US Zip Code
    const sixDigitZip = /^(\d{1}[2-9])?\s\d{5}$/;

    // If the string matches this pattern, it's a valid postal code
    if (sixDigitZip.test(postalCode)) {
        return true;
    }

    // Check for 6-digit US Zip Code
    const sixDigitUSZip = /^\d{2}-\d{3}[0-9A-Z]$/;

    // If the string matches this pattern, it's a valid postal code
    if (sixDigitUSZip.test(postalCode)) {
        return true;
    }

    // If none of these patterns match, the string is not a valid postal code
    return false;
}
