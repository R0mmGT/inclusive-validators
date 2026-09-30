function validate(lastName) {
    try {
        // First, we check if the string is at least 1 character long
        if (lastName.length < 1) return false;
        
        // We remove any leading or trailing whitespace
        lastName = lastName.trim();
        
        // We replace non-alphanumeric characters with spaces to handle names like "Können"
        let cleanedName = '';
        for (let i of lastName) {
            if (i.match(/^[a-zA-Z0-9]$/)) {
                cleanedName += i;
            } else {
                cleanedName += ' ';
            }
        }
        
        // We split the cleaned name into words and take the last word, which should be the actual last name
        let lastWord = cleanedName.split(' ').pop();
        
        // If the last name is either at most 2 characters or more than 20 characters, it's invalid
        if (lastWord.length <= 2 || lastWord.length > 20) return false;
        
        // This is a general-purpose validation ruleset based on common knowledge about surnames:
        //
        //   * The name should contain at least one alphabetic character.
        //   * It shouldn't end in punctuation (apart from some special cases where the person's
        //     name actually contains punctuation).
        //   * Some names may allow hyphenated surname; we'll treat them as a single surname, e.g. Smith-Jones.
        if (!lastWord.match(/[a-zA-Z]/) || (lastWord.slice(-1).match(/[.,']$/) && !['-', 'de', 'van'].some(p => lastWord.endsWith(p)))) {
            return false;
        }
        
        // The rules are intentionally broad to allow different surname formats (Chinese characters, accents,
        // diacriticals), but it may catch a few genuine surnames. However, the validation will block
        // most obviously invalid names due to typical misspellings and other issues that wouldn't fit as
        // family name.
        
        return true;
    } catch (e) {
        console.log(`An error occurred: ${e}`);
        return false;
    }
}
