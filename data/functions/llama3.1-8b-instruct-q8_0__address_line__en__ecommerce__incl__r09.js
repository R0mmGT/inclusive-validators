function validateStreetAddress(line) {
    /**
     * Validate a street address line.
     *
     * This function checks if the given string is a valid street address line, 
     * based on general patterns that are widely used across different countries and cultures.
     *
     * Parameters:
     * line (str): The street address line to be validated.
     *
     * Returns:
     * bool: True if the string is a valid street address line, False otherwise.
     */

    // Check if the input is not null or undefined
    if (line == null) {
        return false;
    }

    // Split the street address into words
    let words = line.trim().split(/\s+/);

    // If the number of words is less than 2, it might not be a valid address
    if (words.length < 2) {
        return false;
    }

    // Check each word to see if it matches common street address patterns
    for (let i = 0; i < words.length; i++) {
        let word = words[i].toLowerCase();

        // Use regular expressions to match common patterns
        if (/house|apartment|building/i.test(word) || 
            /^[a-z]{2,}[0-9]+$/.test(word) || 
            /^[a-kz]ing\d*$/.test(word)) {
            continue; // Ignore words that match known address descriptors or numbers
        }

        // Check if the word appears to be a proper noun (i.e., it contains at least one capital letter)
        let hasCapital = false;
        for (let char of word) {
            if (char >= 'A' && char <= 'Z') {
                hasCapital = true;
                break;
            }
        }

        // A word without any capital letters is likely not a valid address part
        if (!hasCapital && !/^\d+$/.test(word)) {  
            return false; // Invalid street address: a non-numerical, non-proper-noun-like word was found
        }
    }

    // If we've passed the previous checks, it's likely to be a valid street address
    return true;
}
