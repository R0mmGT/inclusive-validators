function validate(postalCode) {
    // Handle edge cases first
    if (typeof postalCode !== 'string' || !postalCode) {
        return false;
    }
    
    const trimmed = postalCode.trim();
    
    // Common global postal code patterns
    const patterns = {
        // US: 5 digits or 5+4 format
        US: /^\d{5}(?:-\d{4})?$/,
        // Canada: A1A 1A1 format
        CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ][ ]?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
        // UK: Various formats like AA9A 9AA, A9A 9AA, A9 9AA, A99 9AA, AA9 9AA, AA99 9AA
        UK: /^[A-Z]{1,2}\d[A-Z\d]?[ ]?\d[A-Z]{2}$/i,
        // Australia: 4 digits
        AU: /^\d{4}$/,
        // Germany: 5 digits
        DE: /^\d{5}$/,
        // France: 5 digits
        FR: /^\d{5}$/,
        // Japan: 7 digits
        JP: /^\d{7}$/,
        // India: 6 digits
        IN: /^\d{6}$/,
        // Brazil: 8 digits with optional hyphen
        BR: /^\d{5}-\d{3}$/,
        // Mexico: 5 digits
        MX: /^\d{5}$/,
        // Spain: 5 digits
        ES: /^\d{5}$/,
        // Italy: 5 digits
        IT: /^\d{5}$/,
        // Netherlands: 4 digits + 2 letters
        NL: /^\d{4}[ ]?[A-Z]{2}$/i,
        // Sweden: 5 digits with optional space
        SE: /^\d{3}[ ]?\d{2}$/,
        // China: 6 digits
        CN: /^\d{6}$/,
        // Russia: 6 digits
        RU: /^\d{6}$/,
        // South Korea: 5 or 6 digits
        KR: /^\d{5,6}$/,
        // Generic fallback: 3-10 alphanumeric characters with optional spaces/hyphens
        GENERIC: /^[A-Z0-9][A-Z0-9\s\-]{2,9}$/i
    };
    
    // Check against country-specific patterns
    for (const pattern of Object.values(patterns)) {
        if (pattern.test(trimmed)) {
            return true;
        }
    }
    
    return false;
}
