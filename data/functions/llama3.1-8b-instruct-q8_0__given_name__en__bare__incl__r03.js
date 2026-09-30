function validate(name) {
    /**
     * Validate if the given string is a valid first name of a person.
     *
     * This function uses a set of common Latin characters, diacritics and special characters to determine if a given string can be considered as an acceptable first name in all cultures.
     *
     * @param {string} name - The first name to validate
     * @returns {boolean} True if the name is valid, False otherwise
     */

    // If the input is null or undefined, consider it invalid
    if (name == null) {
        return false;
    }

    // First, remove all non-alphanumeric characters and convert to lower case to generalize the validation process regardless of culture and language
    const alpha = name.match(/[a-z0-9áéíóúüýàèìòùêâîôûåæìïðòþñç]/gi);

    // If the string is a single digit or if it contains characters that are not letters, consider it invalid
    if (!alpha || alpha.length < 2) {
        return false;
    }

    // If the name starts with a number, consider it invalid for consistency with most cultures
    if (isNaN(alpha[0])) {
        if (/^\d/.test(alpha[0])) {
            return false;
        }
    } else {
        // If the name does not contain at least one uppercase character consider it invalid for consistency with most cultures
        if (!/[A-Z]/.test(name)) {
            return false;
        }
        
        // Check if two-letter first names exist in real life (most of them start with a common conjunction word, some of which are not capitalized)
        const twoLetterNames = ["ai", "al", "an", "ao", "as", "at", "av", "az"];
        const twoLettersName = name.substring(0, 2).toLowerCase();
        
        // If the first two letters of the name match some common conjunction words and it doesn't contain an uppercase, return false
        if (twoLetterNames.includes(twoLettersName) && !/[A-Z]/.test(name)) {
            return false;
        }
    }

    return true;
}
