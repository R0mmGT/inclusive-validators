function validate(name) {
    // Early rejections for invalid inputs
    if (typeof name !== 'string' || name.length === 0) {
        return false;
    }

    // Trim and check for minimum/maximum length (global reasonable bounds)
    const trimmed = name.trim();
    if (trimmed.length < 1 || trimmed.length > 100) {
        return false;
    }

    // Allow letters from any alphabet, apostrophes, hyphens, spaces, and periods
    // Unicode categories used:
    // \p{L} - any letter from any language
    // \p{M} - combining marks (accents, etc.)
    // Common name punctuation: apostrophe, hyphen, space, period
    const namePattern = /^[\p{L}\p{M}'\- .]+$/u;

    if (!namePattern.test(trimmed)) {
        return false;
    }

    // Additional sanity checks
    // Reject names that are only punctuation/whitespace characters
    const onlyPunctuation = /^[\p{Z}'\- .]+$/u;
    if (onlyPunctuation.test(trimmed)) {
        return false;
    }

    // Reject names that start or end with punctuation (except apostrophe in some names like O'Connor)
    // Allow starting with letter or apostrophe (for names like 's-Hertogenbosch Dutch convention)
    // Allow ending with letter or apostrophe (for names like D')
    const validStart = /^[\p{L}\p{M}']/u.test(trimmed);
    const validEnd = /[\p{L}\p{M}']$/u.test(trimmed);

    if (!validStart || !validEnd) {
        return false;
    }

    // Reject consecutive punctuation (except double hyphen in some names)
    const consecutivePunctuation = /['\- .]{2,}/u;
    if (consecutivePunctuation.test(trimmed)) {
        return false;
    }

    // Check for at least one letter character (not just combining marks)
    const hasLetter = /\p{L}/u.test(trimmed);
    if (!hasLetter) {
        return false;
    }

    // Accept the name
    return true;
}
