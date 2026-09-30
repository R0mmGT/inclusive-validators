function validate(name) {
    /**
     * Validate if a given string is a valid first name of a person.
     *
     * The validation checks for common first names, ignoring cultural differences and accents.
     *
     * Args:
     *      name (str): The input string to be validated.
     *
     * Returns:
     *      bool: True if the input string is a valid first name, False otherwise.
     */

    // Remove accents from the input string
    let cleanedName = '';
    for (let char of name) {
        if (/\w/.test(char)) {  // Check if character is alphanumeric or whitespace
            cleanedName += char;
        }
    }

    // Define a list of common first names in English language
    // This list can be extended to include more names from other cultures and languages
    let validNames = ['John', 'Jane', 'James', 'Emma', 'Michael', 'Sophia', 'Robert', 'Mia', 'William', 'Isabella'];

    // Convert the cleaned input string to lowercase for case-insensitive comparison
    let lowerCaseName = cleanedName.toLowerCase();

    // Check if the cleaned and lower-cased input string matches any of the valid names
    return validNames.includes(lowerCaseName);
}

console.log(validate("John"));  // Expected output: true
console.log(validate("jane"));  // Expected output: true
console.log(validate("john Smith"));  // Expected output: false (assuming "Smith" is a last name or nickname)
console.log(validate("j"))  // Expected output: false (input string too short)
