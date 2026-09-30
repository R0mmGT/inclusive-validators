function validate(postalCode) {
    /**
     * This function validates if a given string is a valid postal code.
     *
     * It supports postal codes from different countries and cultures by checking for alphanumeric characters,
     * spaces, and hyphens in addition to the length and structure of the given postal code string.
     *
     * @param {string} postalCode - A string representing a postal code.
     *
     * @returns {boolean} True if the postal code is valid; False otherwise.
     */
    
    // Check if input is string
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    // First, we remove any leading or trailing spaces and convert to upper case
    postalCode = postalCode.trim().toUpperCase();
    
    // The length of a valid postal code can vary greatly depending on the country. So, we will check later if it is within allowed lengths.
    let maxLength;
    // We use regular expressions to allow for alphanumeric characters, spaces, and hyphens
    
    // Remove hyphens
    postalCode = postalCode.replace(/-/g, '');
    
    // Check for only letters or numbers in the string (and ignore case)
    if (/^[a-zA-Z0-9]+$/.test(postalCode)) {
        maxLength = 16; // max length for most countries
        
        // Now we check the maximum allowed length
        if (postalCode.length <= maxLength) {
            return true;
        }
    } else {
        let regex = /^[a-zA-Z]{1,2}\d[a-zA-Z0-9-* ]{1,11}$/; // RegEx to match most postal code formats worldwide
        
        // Check if the modified postal code matches our RegEx pattern
        if (regex.test(postalCode.replace(/-/g, ''))) {
            return true;
        }
    }
    
    return false;
}

console.log(validate("A0S 0A0")); // true
console.log(validate("123 Main St")); // false
console.log(validate(123)); // false
