function validate(lastName) {
    // Check if the input is a string
    if (typeof lastName !== 'string') {
        return false;
    }

    // Remove leading and trailing whitespace
    lastName = lastName.trim();

    // Disallow empty strings
    if (!lastName) {
        return false;
    }

    // Allow only letters, spaces, hyphens, and apostrophes
    for (let char of lastName) {
        let codePoint = char.charCodeAt(0);
        if ((codePoint < 65 || codePoint > 90) && (codePoint < 97 || codePoint > 122) && char !== ' ' && char !== '-' && char !== '\'') {
            return false;
        }
    }

    // Check for consecutive repeated characters
    let hasRepeats = false;
    for (let i = 0; i < lastName.length - 1; i++) {
        if (lastName[i] === lastName[i + 1]) {
            hasRepeats = true;
            break;
        }
    }
    if (!hasRepeats) {
        return false;
    }

    // Last name should not contain consecutive repeated characters
    let prevCharCodePoint, repeatsFound = false;
    for (let i = 0; i < lastName.length - 1; i++) {
        let currentCharCodePoint = lastName.charCodeAt(i + 1);
        if (prevCharCodePoint === currentCharCodePoint && !repeatsFound) {
            repeatsFound = true;
        } else if (repeatsFound) {
            return false;
        }
        prevCharCodePoint = currentCharCodePoint;
    }

    // Last name should not be too long or short
    if (lastName.length < 1 || lastName.length > 100) {
        return false;
    }

    return true;
}
