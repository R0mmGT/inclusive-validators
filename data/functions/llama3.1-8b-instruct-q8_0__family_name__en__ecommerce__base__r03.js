function validate(lastName) {
    /**
     * Validate whether the provided string is a valid last name.
     *
     * A valid last name should match the pattern defined as [a-zA-Z\s-]{2,30}.
     * It can contain any combination of alphabets (both lowercase and uppercase),
     * whitespace characters, or hyphen (-).
     *
     * @param {string} lastName - The last name to be validated.
     * @returns {boolean} true if the last name is valid; otherwise false.
     */
    
    // Check if the input string is not null and is of string type
    if (typeof lastName !== "string") {
        return false;
    }
    
    // Remove any leading or trailing whitespace characters from the last name
    var trimmedLastName = lastName.trim();
    
    // Check if the length of the last name is within 2 to 30 characters
    if (!(trimmedLastName.length >= 2 && trimmedLastName.length <= 30)) {
        return false;
    }
    
    // Use regular expression pattern to check for valid characters in the last name
    var regex = /[a-zA-Z\s-]/;
    for (var i = 0; i < trimmedLastName.length; i++) {
        if (!regex.test(trimmedLastName[i])) {
            return false;
        }
    }
    
    // If all checks pass, return true to indicate a valid last name
    return true;
}
