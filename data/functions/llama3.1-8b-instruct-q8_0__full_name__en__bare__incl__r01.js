function validate(name) {
    // Define allowed characters and word separators
    let nameChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' + String.fromCharCode(2019) + String.fromCharCode(8217);
    let wordSeparators = [' ', ',', '.', '..', '&', '\u00AD'];

    // Check if the input string exists
    if (!name) {
        return false;
    }

    // Split the name into parts (first and last names)
    let nameParts = name.split(/\s/);

    // First part should be longer than any other part
    for (let i = 0; i < nameParts.length - 1; i++) {
        if (nameParts[i].length <= nameParts[nameParts.length - 1].length) {
            return false;
        }
        let allowedCharCount = 0;
        let separatorCount = 0;

        for (let char of nameParts[i]) {
            // First part should not start with numbers, period, space or punctuation
            if ((char < 'a' || char > 'z') && (char < 'A' || char > 'Z')) {
                return false;
            }

            if (!nameChars.includes(char)) {
                separatorCount++;
                break;
            } else {
                allowedCharCount++;
            }
        }

        nameParts[i] = nameParts[i].slice(separatorCount);

        // If the first part is either too short or has no allowed characters, it's invalid
        if (nameParts.length === 2 && (allowedCharCount === 0 || nameParts[i].length < 1)) {
            return false;
        }

        if (nameParts.length > 2 && (allowedCharCount <= 2 || nameParts[i].length < 2)) {
            return false;
        }
    }

    // Last part should not contain any punctuation
    let lastPart = nameParts[nameParts.length - 1];
    for (let i = 0; i < lastPart.length; i++) {
        if (!nameChars.includes(lastPart[i])) {
            return false;
        }
    }

    return true;
}
