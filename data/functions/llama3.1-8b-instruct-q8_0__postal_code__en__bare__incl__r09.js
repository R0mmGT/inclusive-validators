/**
 * Validates whether a given string is a valid international postal code.
 *
 * @param {string} postalCode - The postal code to be validated.
 * @returns {boolean} True if the postal code is valid, false otherwise.
 */
function validate(postalCode) {
    // Remove any whitespace from the postal code
    postalCode = postalCode.replace(/\s+/g, '');

    // Check if the length of the postal code is valid (typically between 3 and 10 characters)
    if (postalCode.length < 3 || postalCode.length > 10) {
        return false;
    }

    // Check if the postal code contains any letters
    if (/^[a-zA-Z]+$/.test(postalCode)) {
        return false;  // Postal codes should only contain numbers and special characters, not letters.
    }

    // Check for country-specific postal code formats (e.g. 'XX XXX' or 'XXXXX' in Canada)
    const patterns = [
        /^[A-Z]{0,2}[0-9RBCDFGHJKLMNPQRSTVWXY]{1,4}[0-9][ABDHLNOQRUWZ]{2}$/i,
        /^[ABDHLNOQRUWZ]{2}\d{3}$/
    ];

    // Check each pattern against the postal code
    for (const pattern of patterns) {
        if (pattern.test(postalCode)) {
            return true;  // Postal code valid
        }
    }

    // If none of the above patterns match, the postal code is likely invalid
    return false;
}
