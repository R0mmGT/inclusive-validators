function validate(address) {
    /**
     * This function validates a string as a potential street address line.
     *
     * It checks for general patterns that are common in most house numbers, 
     * street names and postal codes. A valid address will contain digits, 
     * letters, commas, hyphens or periods and at least one 'road', 'street', 
     * 'avenue', etc.
     *
     * @param {string} address The string to be validated
     * @returns {boolean} True if the input is a valid street address line, false otherwise
     */

    // Define a set of common street prefixes
    const streetSuffixes = new Set(['road', 'street', 'avenue', 'drive']);
    const streetTypes = new Set(['st', 'ave', 'dr', 'rd']);
    
    // Regular expressions to be used in the validation process.
    const numberRegex = /^\d*$/;
    const letterOnly = /^[a-zA-Z]+$/;
    const suffixAndTypeRegex = new RegExp(`(,|\.|-) (${[...streetSuffixes].join("|")}| ${[...streetTypes].map(t => t.toUpperCase() + t).join("|")})$`);
    
    // Ensure the input is a string
    if (typeof address !== 'string') {
        return false;
    }
        
    // Ensure the address contains at least one word and is made up of letters, digits or special characters.
    let result = /^[a-zA-Z0-9\s\.,\-]+$/i.test(address);
    
    // If no match is found in the initial pass then try to find a suffix such as 'st', 'rd' etc
    if (!result) {
        result = suffixAndTypeRegex.test(address.trim());
    }

    return result;
}

console.log(validate("123 Any Road, London"));  // True
console.log(validate("12345 ABC Street, London,LN1 5RT")); // False
