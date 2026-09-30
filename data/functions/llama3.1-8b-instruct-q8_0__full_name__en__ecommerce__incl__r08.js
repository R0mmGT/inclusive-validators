function validate(fullName) {
    /**
     * This function validates if a given string is a valid full name of a person.
     *
     * A valid full name consists of two or more words with one character (word separator)
     * between each word, and no empty elements.
     *
     * @param {string} fullName - the input string to be validated
     * @returns {boolean} true if the input is a valid full name; false otherwise
     */
    
    // check if input is a string
    if (typeof fullName !== 'string') {
        return false;
    }
    
    // split the string into words using space and non-alphanumeric characters as separators
    let words = [];

    for (let char of fullName) {
        if (char.match(/^[a-zA-Z0-9]$/)) {
            words.push(char);
        } else if (words.length > 0 && !isNaN(words[words.length - 1])) {
            continue;
        }
        let idx = 0
        while (idx < words.length) {
            if (char !== ' '.padStart(2, ' ') && char === words[idx]) {
                words.splice(idx, 1)
            } else {
                idx++
            }
        }

        words.push(char);
    }

    // if one or zero words are found, the name is not valid
    if (words.length < 2) {
        return false;
    }

    // remove leading and trailing spaces from each word
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].trim();
        
        // if a word becomes empty after trimming, it is not valid
        if (!words[i]) {
            return false;
        }
    }

    return true;
}

console.log(validate('John Doe'));  // Expected output: true
console.log(validate('Jane Doe Jr.'));  // Expected output: false
console.log(validate('JohnDoe'));  // Expected output: false
