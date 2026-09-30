function validate(lastName) {
    // Check if input is a string
    if (typeof lastName !== 'string') {
        return false;
    }

    // Remove leading/trailing whitespace and check if string is empty
    const trimmed = lastName.trim();
    if (trimmed.length === 0) {
        return false;
    }

    // Common last name patterns:
    // 1. Can contain letters (including accented characters)
    // 2. Can contain hyphens, apostrophes, spaces (for compound names)
    // 3. Can contain periods (for abbreviations like "St.")
    // 4. Minimum length is usually 1 character, but realistically at least 2
    // 5. Should not start or end with punctuation (except for O', D', etc.)
    // 6. Should not contain numbers or special symbols other than specified

    // Define valid characters
    const validPattern = /^[\p{L}\p{M}](?:['’\-. ]?[\p{L}\p{M}])+$/u;
    
    // Check the pattern
    if (!validPattern.test(trimmed)) {
        return false;
    }

    // Additional common-sense checks
    // Should not contain consecutive punctuation
    if (/['’\-. ]{2,}/.test(trimmed)) {
        return false;
    }

    // Should not start with punctuation unless it's O' or similar
    // Allow patterns like O'Brien, D'Angelo
    if (/^[^a-zA-ZÀ-ÿ]/.test(trimmed) && !/^[OD]'/.test(trimmed)) {
        return false;
    }

    // Should not end with punctuation
    if (/['’\-. ]$/.test(trimmed)) {
        return false;
    }

    // Should have at least 1 letter (beyond the minimum length check)
    if (!/[\p{L}\p{M}]/.test(trimmed)) {
        return false;
    }

    // Length check (reasonable bounds for last names)
    // Some cultures have very short names, some have long compound names
    if (trimmed.length < 1 || trimmed.length > 50) {
        return false;
    }

    // Return true if all checks pass
    return true;
}
