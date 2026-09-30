function validate(postalCode) {
    /**
     * Validate a postal code.
     *
     * This function checks if the input string is a valid postal code for users from all countries and cultures.
     * It returns true if the string is a valid postal code, false otherwise.
     *
     * Args:
     *     postalCode (str): The postal code to be validated.
     *
     * Returns:
     *     bool: True if the postal code is valid, False otherwise.
     */

    // Check if the input is null or undefined
    if (postalCode === null || postalCode === undefined) {
        return false;
    }

    // Convert the string to uppercase for case insensitive comparison
    postalCode = postalCode.toUpperCase();

    // Remove any non-alphanumeric characters from the string
    let cleanedPostalCode = '';
    for (let char of postalCode) {
        if (char.match(/\w/)) {  // \w matches alphanumeric characters plus underscore
            cleanedPostalCode += char;
        }
    }

    // Calculate length of cleanedPostalCode
    const len = cleanedPostalCode.length;

    // For each country, there is a different valid range for the postal code length.
    // Here I am providing some common ranges but this list might need to be extended if you want to support countries with other ranges.

    const countrySpecificRanges = {
        'United States': 5,
        'Canada': 6,
        'France': 4,  // No spaces or hyphens
        'Germany': 5,  // No spaces or hyphens
        'Australia': 4,  // No spaces or hyphens
        'United Kingdom': 7,  // No spaces, with optional letters at the start
        'Italy': 5  // No spaces or hyphens, possibly preceded by letters in two cases (RM and AG)
    };

    // Check length of postal code
    for (const country in countrySpecificRanges) {
        if (countrySpecificRanges[country] === len || new RegExp(`^[A-Z]{${len}}\\d{${12 - len}}$`).test(cleanedPostalCode)) {  // ^[A-Z0-9]*$ would accept strings that are just letters or numbers, but it would also match strings where the number part is longer than expected
            return true;
        }
    }

    // If none of the ranges from countrySpecificRanges matched, we will need to check for all possible valid postal code lengths and formats.
    const commonPostalCodeFormats = [
        /^([0-9]{5})(-[0-9]{4})?$/,  // US - XXXXX or XXXXX-XXXX format
        /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/,  // Canada - A1A 1A1 format
        /^([0-9]{2})?\d{3}\s?((\d{3})|\s(\d{3}))$/,  // UK, South Africa and Singapore - XXX XXX format
        /^[7-9][0-9] ?[0-9]{4}$|^[8][0-5][0-9]$/,  // Germany, Italy - XXXX or 8501 format. We will also match these:
        // AUSTRALIA: NSW 2000; SA 5000
        // NEW ZEALAND: WAIKATO 3000 
        /^(\d{4})\s?(([Nn][Ss][Ww])|[Oo][Aa]\s*[Tt]|[Oo]{2}\s*\d*)?)$/,  
    ];

    for (const format of commonPostalCodeFormats) {
        if (format.test(cleanedPostalCode)) {  // The format is valid
            return true;  // The postal code matches the given country or is in a valid format
        }
    }

    return false;
}
