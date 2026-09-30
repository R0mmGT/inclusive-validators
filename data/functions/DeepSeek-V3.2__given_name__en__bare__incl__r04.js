function validate(name) {
    // Check if input is a non-empty string
    if (typeof name !== 'string' || name.length === 0) {
        return false;
    }

    // Trim whitespace and check if result is non-empty
    const trimmed = name.trim();
    if (trimmed.length === 0) {
        return false;
    }

    // Length constraints (generous to accommodate various cultures)
    // Minimum: 1 character (common in some cultures, e.g., Chinese "X")
    // Maximum: 128 characters (accommodates long compound names)
    if (trimmed.length > 128) {
        return false;
    }

    // Character validation - accept a wide range of Unicode letters and symbols
    // This includes:
    // - Letters from all scripts (Latin, Cyrillic, Arabic, Chinese, etc.)
    // - Combining marks (for accented characters, diacritics)
    // - Hyphens, apostrophes, spaces (common in compound names)
    // - Various name connectors used across cultures
    const validNamePattern = /^[\p{L}\p{M}](?:[\p{L}\p{M} \-'.]|\p{Pd})*[\p{L}\p{M}]$/u;
    
    // Alternative pattern for single-character names
    const singleCharPattern = /^[\p{L}\p{M}]$/u;
    
    // Validate against patterns
    if (!validNamePattern.test(trimmed) && !singleCharPattern.test(trimmed)) {
        return false;
    }

    // Additional sanity checks
    // 1. No consecutive special characters
    if (/[\-'. ]{2,}/.test(trimmed)) {
        return false;
    }

    // 2. Cannot start or end with special characters (except single character case)
    // (This is already covered by regex but being explicit)
    if (trimmed.length > 1 && /^[\-'. ]/.test(trimmed)) {
        return false;
    }
    if (trimmed.length > 1 && /[\-'. ]$/.test(trimmed)) {
        return false;
    }

    // 3. Check for excessive repeated characters (more than 3 times)
    if (/(.)\1{3,}/.test(trimmed)) {
        return false;
    }

    // 4. Ensure at least one letter character exists
    // (This is already covered by regex but being explicit)
    if (!/\p{L}/u.test(trimmed)) {
        return false;
    }

    // 5. Reject names that are only numbers or symbols
    if (/^\d+$/.test(trimmed.replace(/[\-'. ]/g, ''))) {
        return false;
    }

    return true;
}
