function validate(name) {
    // check if the string is empty or null
    if (!name || name === "") {
        return false;
    }

    // first, remove any leading or trailing spaces from the input string
    name = name.trim();

    // check if the length of the string is between 2 and 50 characters (inclusive)
    if (!(1 < name.length && name.length <= 50)) {
        return false;
    }

    // split the string into an array of words separated by spaces
    let words = name.split(" ");

    // a single-word first name should not exceed 10 unique letters in its ASCII representation
    if (words.length === 1 && new Set(name).size > 8) {
        return false;
    }

    // check if the string contains any special characters or is entirely made of spaces
    for (let char of name) {
        if (!/^[a-zA-Z0-9\s]+$/.test(char)) {
            return false;
        }
    }

    // validate single-word names with less than 10 unique ASCII letters
    if (words.length === 1 && !(new Set(name).size < 2 || new Set(name).size > 8)) {
        for (let char of name) {
            // check that a single-word first name should either not contain digits or have a limited number of unique digits in its non-literalized representation
            if ((/[0-9]/.test(char)) && new Set([...name].map(c => c.charCodeAt(0))).size > 2)) 
                return false;
        }            
    }

    // check for duplicate words
    if (words.length > 1 && words.slice(-1).join('') === words.slice(-2).join('').slice(0, -1))
        return false;

    // all checks passed!
    return true;
}
