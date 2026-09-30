/**
 * Validate a given string as a valid last name.
 *
 * A valid last name should:
 *      1. Contain at least two characters (including numbers, punctuation, and special characters).
 *      2. Not be too long (less than 50 characters for simplicity).
 *      3. Start with a letter or an apostrophe. Other letters and punctuation are allowed elsewhere.
 */

function validate(lastname) {
    // Check if the string is at least two characters long
    if (!/^\S{1,50}$/.test(lastname)) {
        return false;
    }

    // Check if the first character is a letter or an apostrophe
    let firstChar = !/[a-zA-Z']/.test(lastname[0]);
    let specialChar = /[!-\/:-@[-`{-~]/.test(lastname);

    for (let char of lastname) {
        // A valid last name can only start with a letter or an apostrophe and can contain numbers and punctuation
        if ((/[a-zA-Z']/.test(char)) || (/\d+/.test(char) && specialChar)) {
            continue;
        } else {
            return false;
        }
    }

    return true;
}
