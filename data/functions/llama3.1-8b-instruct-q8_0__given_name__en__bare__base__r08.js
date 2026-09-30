/**
 * Validate a given string as a valid first name.
 *
 * A valid first name should:
 *   - Start with a capital letter (Uppercase or Title case)
 *   - Not end with a punctuation mark, except for an apostrophe (e.g., O'Neil)
 *   - Consist only of letters and whitespace characters
 *
 * @param {string} input The string to be validated
 * @returns {boolean} True if the string is a valid first name, False otherwise.
 */
function validate(input) {
    // Check if the string starts with a capital letter
    let startsWithCapital = input && input[0] === input[0].toUpperCase();
    
    // Check if the rest of the string (except for whitespace) only contains letters,
    // and it does not end with a punctuation mark except for an apostrophe.
    // The last condition is implemented using two boolean variables, one checking
    // for any character that is not a letter or an apostrophe, and another checking
    // if there are any apostrophes at the end of the string (one single ').
    let containsOnlyLetters = !input.replace(/\s/g, '').trim().split('').some(c => !/[a-zA-Z' ]/.test(c));
    let endsWithApostrophe = input && /$/.test(input) && /$/.test(input.substring(0,input.length-1)) ? true : false || 
                           input && /\.$/.test(input.split(' ').pop()) && !(/\.$/.test(input.split(' ').slice(-2).join(' ')));

    // Return True if the string starts with a capital letter,
    // contains only letters (except for whitespace), and does not end
    // with punctuation marks except for an apostrophe.
    return startsWithCapital && containsOnlyLetters && endsWithApostrophe;
}
