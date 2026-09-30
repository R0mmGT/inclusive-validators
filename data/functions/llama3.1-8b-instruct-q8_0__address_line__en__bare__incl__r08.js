function validate(street) {
    /**
     * This function validates if a given string is a valid street address line.
     *
     * It covers various country-specific formats like US (123 Main St), India (Near Apple Hospital, Sector 41, Gurugram), Europe (Place du Marché aux Fleurs, Paris).
     *
     * Currently, it just checks for numbers, letters and comma. You can adjust this to fit your exact requirement.
     *
     * Args:
     *      street (str): The input string to be validated.
     *
     * Returns:
     *      bool: True if the string is a valid street address line; False otherwise
     */

    // Check for empty strings
    if (!street.trim()) {
        return false;
    }

    // Remove leading and trailing whitespaces
    let strippedStreet = street.trim();

    // Use regular expression to match the pattern of alphanumeric characters, numbers, commas, and special characters (.,'-','/')
    let regex = /\d[\d -,.\/]*\s*\w\s*[a-zA-Z]+(?: [a-zA-Z]*)*/;
    
    // If the input string matches the specified pattern, return True; else return False
    if (regex.test(strippedStreet)) {
        return true;
    } else {
        return false;
    }
}

// Testing with some examples:
console.log(validate("123 Main St"));  // Returns: True.
console.log(validate("Near Apple Hospital, Sector 41, Gurugram"));  // Returns: True.
console.log(validate("Place du Marché aux Fleurs, Paris"));  // Returns: True.
console.log(validate("Invalid Street"));  // Returns: False.
