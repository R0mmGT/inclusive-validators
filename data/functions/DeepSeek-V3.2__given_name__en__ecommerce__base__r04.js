function validate(name) {
    // Check if input is a string
    if (typeof name !== 'string') {
        return false;
    }

    // Trim whitespace and check length
    const trimmed = name.trim();
    if (trimmed.length < 1 || trimmed.length > 50) {
        return false;
    }

    // Check for invalid characters
    const validNamePattern = /^[\p{L}'-]+$/u;
    if (!validNamePattern.test(trimmed)) {
        return false;
    }

    // Check for consecutive special characters or starting/ending with them
    const invalidPatterns = [
        /''/,   // consecutive apostrophes
        /--/,   // consecutive hyphens
        /^'/,   // starts with apostrophe
        /^-/,   // starts with hyphen
        /'$/,   // ends with apostrophe
        /-$/    // ends with hyphen
    ];
    
    if (invalidPatterns.some(pattern => pattern.test(trimmed))) {
        return false;
    }

    // Check for at least one letter
    const hasLetter = /[\p{L}]/u.test(trimmed);
    if (!hasLetter) {
        return false;
    }

    return true;
}
