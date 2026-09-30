function validate(fullName) {
    /**
     * Validate a string as a full name.
     *
     * A valid full name should be composed of two or more words, 
     * with the first word having at least one character and not exceeding 30 characters,
     * and each subsequent word not exceeding 20 characters,
     * and only containing alphabetic characters, spaces, or hyphens.
     *
     * @param {string} fullName - The full name to be validated
     * @return {boolean} True if the full name is valid, false otherwise
     */
    const words = fullName.split(' ');
    for (let i = 0; i < words.length; i++) {
        let firstWord = (i === 0)
        let word = words[i];
        if (!/^[A-Za-z- ]+$/.test(word)) { // check only alphanumeric and hyphen in the rest of names
            return false;
        }
        if (firstWord) {
            if (word.length > 30 || !/^[a-zA-Z ]+$/.test(word)) {
                return false;
            }
        } else {
            if (word.length > 20) {
                return false;
            }
        }
    }
    return true;
}
