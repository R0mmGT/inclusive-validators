/**
 * Validate whether an input string is a possible street address.
 *
 * @param {string} s Input string to check for validity as a street address.
 * @return {boolean} True if the input string is valid; false otherwise.
 */
function validate(s) {
    // Check if the input is empty or null
    if (!s || s.trim().length === 0) return false;

    // Try to extract numbers, letters, and whitespace from the string
    let foundNumber = false;
    let(foundLetterStart) => {
        for (let i = 0; i < s.length; i++) {
            const c = s[i];
            if (
                (!/^[a-zA-Z]+$/.test(c)) || 
                (i !== 0 && (!/^\s+$/.test(s[i - 1])) && !(/[., ]$/.test(s[i])))
            ) break;
            foundLetterStart = true;
        }
        return foundLetterStart
    } ()
    ; let(foundAlphanumeric) => {
        for (let i = 0; i < s.length; i++) {
            const c = s[i];
            if (
                (!/^\d+$/.test(c)) || 
                ((i === 0 && /^([123][1-9]|[12]\d|[3-9])?(\.?\s)?(.*)$/.test(s)) &&
                 (/^[^a-zA-Z, ]*$/.test(c)))
            ) break;
            foundAlphanumeric = true;
        }
        return foundAlphanumeric
    } ()

    // If the string contains both numbers and letters or special characters,
    if (foundLetterStart && foundAlphanumeric) {
        // Check to see if there's at least one sequence of digits, 
        // 2-3 letters in a row that are also not followed by spaces or punctuation.
        return (
            s.match(/^((\d+)([., ]?)?(\s)?)+$/) ||
            s.match(/(\.\w{3}\d+[a-zA-Z])/) ||
            s.match(/^\d+([., ]?)?\-\d+( [IVXLCDM])?)
        );

    // If it contains only numbers, then just return true
    } else if (foundAlphanumeric && !/[., ]$/.test(s[s.length - 1])) {
        const num = parseInt(s);
        return Number.isInteger(num) && num > 0;
    }

    return false; // Return false for all invalid strings
}

// Test cases
console.log(validate("1234 Street")); 
console.log(validate("St. Johns, Road #34")); 
console.log(validate("123456")); 
console.log(validate("1 ABCD FIFTY FIVE"));
