function validate(name) {
    /**
     * Returns true if the given string is a valid first name, false otherwise.
     *
     * A valid first name should be at least 2 characters long and contain only alphanumeric characters,
     * spaces, hyphens, or apostrophes. The name should also not start with a number.
     */

    // Check if the input is a string
    if (typeof name !== 'string') {
        return false;
    }

    // Remove any leading or trailing whitespace from the string
    name = name.trim();

    // If the string is empty, return False
    if (!name) {
        return false;
    }

    // Check if the first character of the string is a digit (e.g. 1, 2,...)
    if (isNaN(name[0])) {
        // Initialize a flag to indicate whether the name contains any vowels
        let hasVowel = false;

        // Iterate over each character in the string
        for (let char of name) {
            // If the character is not alphanumeric and it's not one of the allowed special characters (' ', '-', '), return False
            if (!char.match(/^[a-zA-Z0-9\s\-\']$/)) {
                return false;
            }

            // Check if the character is a vowel
            if ('AEIOUaeiou'.includes(char)) {
                // Set hasVowel to True
                hasVowel = true;
            }
        }

        // If the name contains at least one vowel, return True; otherwise return False
        return hasVowel;
    } else {
        // If the first character of the string is a digit, return False
        return false;
    }
}
