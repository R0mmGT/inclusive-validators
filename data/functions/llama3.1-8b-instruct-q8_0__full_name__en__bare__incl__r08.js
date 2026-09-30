function validate(fullName) {
    /**
     * Validate if a given string is a valid full name.
     *
     * @param {string} fullName The full name to be validated.
     * @returns {boolean} True if the full name is valid, false otherwise.
     */

    // Split the full name into individual words
    let words = fullName.split(' ');

    // If the full name has less than two or more than three names it's not valid
    if (words.length < 2 || words.length > 3) {
        return false;
    }

    // Iterate over each word in the full name
    for (let word of words) {
        // Check if the word is empty
        if (!word) {
            return false;
        }
        
        // If the first character of the word is not a letter or is not followed by a dot, it's not valid
        if (!((word.length > 1 && word[0].match(/[a-zA-Z]/) && !isNaN(word[1])) || (/[a-zA-Z]/).test(word))) {
            return false;
        }
        
        // If the word has more than two apostrophes it's likely not a valid name
        if ((/\b\'\b/g).test(word)) {
            let count = 0;
            for(let char of word) {
                if(char === '\'') {
                    count++;
                }
            }
            if (count > 2) return false;
        }
        
        // If the word has a digit it's not valid, except in the last name (which might have a suffix)
        if (isNaN(word[word.length - 1])) {
            let hasNonLetter = false;
            for(let char of word) {
                if (!(char.match(/[a-zA-Z]/))) {
                    hasNonLetter = true;
                    break;
                }
            }
            if (!hasNonLetter) return false;
        }
        
        // Check for some common suffixes
        let suffixes = ['sr', 'md', 'phd'];
        if (suffixes.includes(word.toLowerCase())) {
            if (!word.endsWith(suffixes[0].toLowerCase()) && !word.endsWith('.' + suffixes[1].toLowerCase())) {
                return false;
            }
        }

        // If the word has a length greater than 30 it's likely not valid
        if (word.length > 30) {
            return false;
        }
    }

    // The full name is valid
    return true;
}
