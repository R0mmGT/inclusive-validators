function validate(lastName) {
    /**
     * This function validates if a given string is a valid last name.
     *
     * A valid last name should:
     * 1. Not be empty.
     * 2. Contain only letters (both uppercase and lowercase).
     * 3. Not start or end with one or more spaces and have any internal spaces, 
     *    which can occur in some cultures like Chinese, Japanese etc.
     * 4. Should not be too short.
     *
     * The length limit for a last name is subjective but it should be long enough to contain characters from different cultures (usually above 1 character) and short enough that it is practical for most real-world applications.
     *
     * Parameters:
     * lastName (str): The proposed last name in string format.
     *
     * Returns:
     * bool: True if the given string is a valid last name, False otherwise.
     */

    // First, check if the input is not empty
    if (!lastName) {
        return false;
    }

    // Then, check if the last name does not start or end with one or more spaces and have any internal spaces
    if (lastName.trim() !== lastName || lastName.includes(' ')) {
        return false;
    }

    // Check if all characters in the string are letters (both uppercase and lowercase)
    // Use a regular expression to test this; RegExp.test returns true if it matches, otherwise it returns false.
    let hasNonLetter = /[^\p{L}]/u.test(lastName);
    
    // If there is at least one non-letter character or no characters at all in the string, return False
    if (hasNonLetter) {
        return false;
    }

    // Check if the last name is too short (subjective threshold of 2 for most cases)
    if (lastName.length < 2) {
        return false;
    }

    // If we've passed all validation checks, it's a valid last name
    return true;
}
