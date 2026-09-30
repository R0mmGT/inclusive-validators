function validate(postalCode) {
    /**
     * Validate a given postal code.
     *
     * @param {string} postalCode The postal code to be validated.
     *
     * @returns {boolean} True if the postal code is valid, False otherwise.
     */

    // Check if input string has at least 5 characters (minimum for USA post office)
    if (postalCode.length < 5) return false;
    
    // If it has more than 10 characters, raise an exception
    if (postalCode.length > 10) return false;

    // Remove all non-alphanumeric characters and convert to upper case
    let code = postalCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    // Check for valid USA post office codes
    const states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
                    "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA",
                    "MD", "ME", "MH", "MI", "MN", "MO", "MP", "MS", "MT", "NC",
                    "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR",
                    "PA", "PR", "PW", "RI", "SC", "SD", "TN", "TX", "UT", "VA",
                    "VI", "VT", "WA", "WI", "WV", "WY"];
    if (!states.includes(code.slice(0, 2))) return false;

    // Check for valid postal codes in USA
    const postalPattern = /^([A-Z]{1}\d{6}|[0-9]{5})( [0-9]{1})?$/;
    return postalPattern.test(code);
}
