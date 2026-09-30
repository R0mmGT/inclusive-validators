function validate(firstName) {
    /**
     * Validate a given name (first name).
     *
     * @param {string} firstName The name to be validated.
     * @returns {boolean} True if the name is valid, false otherwise.
     */
    // A first name should not exceed 20 characters
    let maxLength = 20;
    if (firstName.length > maxLength) {
        return false;  // Name too long
    }

    // The name must start with a letter
    if (!/^[a-zA-Z]/.test(firstName)) {
        return false;  // First character is not a letter
    }

    // Now check all other characters in the string
    for (let i = 0; i < firstName.length; ++i) {
        let charCode = firstName.charCodeAt(i);
        if (!(charCode >= 65 && charCode <= 90)
            && !(charCode >= 97 && charCode <= 122)) {
          return false;  // A letter was found in the string that was not a lowercase or uppercase character
        }
    }

    // If we have not returned False by now, then all checks are passed.
    // Thus, this should be a valid first name.
    return true;
}
