function validate(name) {
    /**
     * Validates if a given string is a valid full name of a person.
     *
     * @param {string} name - The full name to be validated.
     *
     * @returns {boolean} True if the given name is a valid full name, false otherwise.
     */

    // Check if the input is null or not a string
    if (typeof name !== 'string') {
        return false;
    }

    // Remove any leading or trailing whitespace from the name
    name = name.trim();

    // If the length of the name is less than 2, it's likely invalid
    if (name.length < 2) {
        return false;
    }

    // Define allowed characters for a full name
    const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ \(\)');
    let hasFirstName = false;
    let hasLastName = false;

    // Iterate over each character in the name
    for (const c of name) {
        // If the character is not in the allowed set, return false
        if (!allowedChars.includes(c)) {
            return false;
        }

        // Check for first and last names by looking for a space or a special character
        if (c === ' ' && !hasFirstName && !hasLastName) {
            hasFirstName = true;
        } else if (['(', ')'].includes(c)) {
            hasLastName = true;
        }
    }

    // If the name contains at least two parts and each part does not contain any special characters except for a possible last name that may contain parentheses, return true
    if ((name.match(/\s/) || []).length > 1 && ['(', ')'].every(x => {
            const lastIndex = name.lastIndexOf(x);
            if (lastIndex === -1) return false;
            const firstPartLastName = name.substring(lastIndex + 1).replace(/\s/, '');
            return !firstPartLastName.replace(/[\(\)]/g, '').match(/\d+/));
        })) {
        return true;
    }

    // If all checks pass, the name is likely valid
    return true;
}
