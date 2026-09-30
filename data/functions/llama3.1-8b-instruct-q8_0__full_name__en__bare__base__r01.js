function validate(fullName) {
    /**
     * Validates a name.
     *
     * @param {string} fullName The Full Name To Validate
     * @return {boolean}
     */

    // A full name consists of at least two words (first and last names).
    let words = fullName.trim().split(/\s+/);

    if (words.length < 2) {
        return false;
    }

    for (let word of words) {
        // Check the length. Names are typically no shorter than 2 characters,
        // but some proper nouns might be single letters.
        if (word.length < 1) {
            return false;
        }

        // Remove spaces and punctuation
        let cleanWord = word.replace(/[^\w\s]/g, '');

        // Check for non-letter characters in names.
        if (!/^[a-zA-Z]+$/.test(cleanWord)) {
            return false;
        }
    }

    return true;
}
