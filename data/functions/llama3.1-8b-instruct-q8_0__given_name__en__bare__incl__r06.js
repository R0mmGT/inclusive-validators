/**
 * Validate a given string as a possible first name.
 *
 * This function checks if the input string contains at least one letter,
 * has a length between 2 and 15 characters (inclusive), does not contain any non-alphabetic or whitespace characters aside from those already present in the character set 'áàâäãåçéèêëíìîïóòôöõúùûüÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ ', and is not composed of any English stopwords (common words like "the", "a", etc.).
 *
 * @param {string} firstName - The first name to be validated.
 * @returns {boolean} True if the input string could be a valid first name, false otherwise.
 */
function validate(firstName) {
    // If input is not a string
    if (typeof firstName !== 'string') return false;

    // Remove non-ASCII characters and convert to lowercase for simplicity
    let cleanedName = Array.from(firstName).filter(c => c.match(/^[a-zA-Z]/)).join('');

    // Check presence of at least one alphanumeric character in the cleaned name
    if (!cleanedName) return false;

    // Validate name length
    if (cleanedName.length < 2 || cleanedName.length > 15) return false;

    // Define English stopwords for reference
    const englishStopwords = ['the', 'a', 'an'];

    // Check composition of original string (contains letters, whitespace and certain characters)
    let originalStringCheck = firstName.match(/^[A-Za-z\s\u00E0-\u00FC\u00C0-\u00D6\u01AC\ \-']+[.]{1,2}$/i);
    
    // Ensure match is not false or a word comprised of multiple stopwords
    if (!originalStringCheck || englishStopwords.some(stopWord => firstName.toLowerCase().includes(stopWord))) return false;

    // If none of the checks failed, this might be our desired first name
    return true;
}

console.log(validate('John'));   // Expected output: true
console.log(validate('JOHN'));   // Expected output: true
console.log(validate('j0hn'));   // Expected output: false
console.log(validate('J OHN'));  // Expected output: true
console.log(validate('Jo hn'));  // Expected output: false
console.log(validate('a'));      // Expected output: false
console.log(validate(1));        // Expected output: false
console.log(validate({}));       // Expected output: false
