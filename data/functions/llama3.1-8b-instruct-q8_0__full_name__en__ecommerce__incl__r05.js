/**
 * Validates if a given string is a valid full name of a person.
 *
 * A valid full name consists of two parts: a first name and a last name or a suffix (such as Jr., Sr., etc.) separated by a space.
 * The function does not enforce any specific length, character set, or grammar rules for the individual names,
 * so it will return true for a wide range of culturally valid full names.
 *
 * @param {string} fullName The string to be validated.
 * @return {boolean} True if the string is a valid full name, false otherwise.
 */
function validate(fullName) {
    // If the string is empty or only contains spaces, it's not a valid name
    if (!fullName.trim()) return false;

    // Split the input into parts. The split() method will divide a String object into an array where each word is an array item.
    let parts = fullName.split(" ");

    // A valid full name must have two or more parts (separated by spaces).
    if (parts.length < 2) return false;

    // Each part of the name should not be too short (contains a single character, e.g. 'A', ',')
    for (let part of parts) {
        if (part.trim().length <= 1 || /\s/.test(part)) return false;
    }

    // The first and last names are valid if they only contain letters.
    let firstName = parts[0];
    let lastName = parts[parts.length - 1];

    if (/[^a-zA-Z\s]/.test(firstName) || /[^\w\s,-]/.test(lastName)) return false;

    // If all checks passed, the name is valid
    return true;
}
