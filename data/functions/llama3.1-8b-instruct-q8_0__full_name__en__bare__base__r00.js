function validate(fullName) {
    /**
     * This function checks if a given string is a valid full name of a person.
     * 
     * A valid full name should contain at least two words, with each word being composed of alphabetic characters only (including spaces and ').
     */

    // Split the full name into individual parts
    let parts = fullName.split(' ');

    // Check if there are at least two parts in the full name
    if (parts.length < 2) {
        return false;
    }

    // Iterate over each part of the full name
    for (let part of parts) {
        // If a part is empty or not an alphabetic string, the full name is invalid
        if (!part.match(/^[a-zA-Z]+$/) || !part.trim()) {
            return false;
        }
    }

    // If we have passed all checks, the full name is valid
    return true;
}
