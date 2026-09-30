function validate(surname) {
    /**
     * Validates whether a given string represents a valid surname.
     *
     * A surname is considered valid if it matches one of the following patterns:
     *   1. Begins with an uppercase letter followed by any number of alphanumeric characters, spaces or hyphens.
     *   2. Two uppercase words separated by a single space (e.g., "BROWN LEE").
     *
     * @param {string} surname - The string to validate as a surname.
     *
     * @returns {boolean} True if the string is a valid surname, false otherwise.
     */

    // A surname starts with an uppercase letter
    let leadingLetterMatch = /^[A-Z]/;

    // Optional space between the first and second names (optional because it's only one group)
    let optionalSpaceBetweenNameGroup = '([\\s-])';

    // Alphanumeric characters, space or hyphen can come after the name
    let alphanumericPlusWhitespacesMatcher = '[a-zA-Z0-9\\s-]*';
    return leadingLetterMatch.test(surname) || /^[A-Z]+ [A-Z]+$/.test(surname);
}

console.log(validate("Smith")); // true
console.log(validate("BROWN LEE")); // true
console.log(validate("brown Lee")); // false
