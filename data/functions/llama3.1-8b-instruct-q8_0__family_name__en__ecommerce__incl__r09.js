function validate(lastName) {
    /**
     * Validates a last name (family name) of a person.
     *
     * This function checks if the input string matches the pattern
     * of a typical surname from various cultures around the world.
     * It does not cover every possible valid surname, but it aims to
     * handle most cases. If you're concerned about very specific
     * cultural constraints, please contact me and I'll do my best to add them.
     *
     * Note: This function may still return true for some invalid inputs, 
     * such as empty strings or numbers with spaces in them. It's always a good idea 
     * to use additional validation when necessary.
     *
     * @param {string} lastName The last name (family name) of a person
     * @returns {boolean} True if the input is valid, false otherwise
     */

    // If we get here, the function has passed all checks so far and should return true

    // Check for empty string
    if (lastName.trim() === '') {
        throw new Error('Last name cannot be empty');
    }

    // Surnames can contain letters with accents. We'll use a simplified method 
    // to accommodate some but not all cases of this.
    let hasNonAscii = false;
    for (let charCode of lastName) {
        if (charCode > 127) {
            hasNonAscii = true;
            break;
        }
    }

    // Check other special characters. For simplicity, we'll treat them as invalid.
    if (!/^[a-zA-Z\s\-,\u00C0-\u017F\u0301]+$/.test(lastName)) {
        return false;  // If no match found, it's an invalid surname
    }

    // Check length - surnames can be quite long but this is a simple check to eliminate 
    // extremely long strings as likely being errors.
    if (lastName.length < 2 || lastName.length > 80) {
        return false; 
    }

    return true;
}
