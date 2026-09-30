function validate(lastName) {
    /**
     * Validate whether a given string is a valid last name.
     *
     * @param {string} lastName The last name to be validated.
     * @returns {boolean} True if the last name is valid, false otherwise.
     */
    
    // First, we'll check for empty strings
    if (!lastName) {
        return false;
    }
    
    // We then check for length. Family names can range from few letters to many. 
    // This function should be able to handle all cases
    const minLength = 1;  
    const maxLength = 200;   
    if (lastName.length < minLength || lastName.length > maxLength) {
        return false;
    }
    
    // Remove leading and trailing whitespace
    lastName = lastName.trim();
    
    // Define a set of common family name prefixes/suffixes in different languages
    const englishPrefixes = ['De', 'Van', 'La'];
    const chineseSuffixes = ['士', '明', '良'];
    const polishVowelsAndYs = 'aieoAIEOyYŌōĄą';
    // ... For brevity, we are defining only a subset of languages in this example
    
    // We will use regular expressions to match family name prefixes and suffixes
    let validateEnglishName = new RegExp(`^(${englishPrefixes.join('|')})([^${polishVowelsAndYs}]*)$`);
    if (!lastName.match(validateEnglishName) && lastName.length > 2) {
        return false;
    }
    
    // Chinese names usually consist of a family name followed by given name(s).
    let validateChineseSurname = new RegExp(`^(${chineseSuffixes.join('|')})(.*)$`, 'i');
    if (lastName.match(validateChineseSurname)) {
        return false;  // This surname looks like an English language surname
    }
    
    // Polish names usually end with a single character that is not a vowel and can also be 'y'. If it has more than one, we might have a mistake.
     let validatePolishName = new RegExp(`^([^${polishVowelsAndYs}]+)$`);
    if (!lastName.match(validatePolishName) && lastName.length > 2) {
        return false;
    }

    return true; // Name is likely valid
}
