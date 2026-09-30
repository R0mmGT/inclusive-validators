function validate(address) {
    /**
     * Validate a string as a potential street address.
     *
     * This function does a simple check to see if the input is not empty and
     * does not contain any of a list of words that are common in other contexts
     * but often found in addresses, like "The" and "On".
     *
     * It's worth noting that while this function will reduce the chance of an invalid
     * address being accepted, it is still possible for some fake addresses to pass.
     *
     * Parameters:
     * ----------
     * address : str
     *      The string to validate as a potential street address.
     *
     * Returns:
     * -------
     * bool
     *       True if the input is likely a valid street address, False otherwise.
    */

    // Split the input into individual words.
    let words = address.split(' ');

    // Create a list of common disqualifying words that are often not in addresses,
    // but could be in other contexts (like names or directions).
    let disqualifiers = ["The", "on", "of", "in", "at", "with", "from"];

    // Check if any of the disqualifying words appear as whole words in the input.
    for (let word of words) {
        if (disqualifiers.includes(word)) {
            return false;
        }
    }

    // If no disqualifying words were found, then assume that this string
    // is a valid address.  Note: This might still be broken or incorrect,
    // but the code is supposed to run for all countries and cultures.
    return true;
}
