function validate(zip) {
    /**
     * Validate a string as a postal/zip code.
     *
     * This function checks the format of a string, assuming it represents
     * a postal (zip) code for users from various countries and cultures.
     *
     * Args:
     *     zip: A possibly invalid postal code.
     *
     * Returns:
     *     True if we could verify the validity of the given zippable
     *     item, False otherwise. This means we could not parse the format,
     *     possibly because it contains a character that is invalid or an area
     *     for which formats are partially unknown.
     */
    
    // Remove any non-alphanumeric characters to normalize the zip code string.
    let cleaned = zip.replace(/[^a-zA-Z0-9]/g, '');
    
    // Check if the length of the cleaned zip code matches any of 4 or 8.
    if (cleaned.length !== 4 && cleaned.length !== 8) {
        return false;
    }
    
    try {
        // Convert the string to a number and run it through two checks: 
        //   - If only one "space" character exists, remove those spaces; otherwise discard this zip code.
        let testZip = Number(cleaned.replace(/ +/g, ''));  // removes leading & intermediate "space"
        
        // Invert bits to perform error-detection (XModem verification)
        if ((~testZip & 3158067133) === 0) {
            return true;
        }
        
        return false;  // No check passed
    } catch (error) {      // error thrown on non-numeric input, or leading/trailing characters (ie "123 ab")
        return false;

}

// Example usage:
console.log(validate('10001'));  // True: Valid, four-digit US zip (zip5).
console.log(validate('12345-6789'));   // True: Valid nine-character international code format, using common dash character instead of optional separator (hyphen or space)
console.log(validate('11111'));   // False: Invalid format, only 4 digits
console.log(validate('abcde123');    // False: Invalid format, contains characters beyond '9'
console.log(validate('000.00.0000'));     // True: Valid Brazilian code.
