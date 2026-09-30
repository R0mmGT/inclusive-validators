function validate(postalCode) {
    // Trim whitespace and check if input is a string
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    const trimmedCode = postalCode.trim();
    
    // Common validation patterns for different countries
    const patterns = {
        // United States: 5 digits or 5+4 format
        US: /^\d{5}(-\d{4})?$/,
        // Canada: A1A 1A1 format
        CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]\s?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
        // United Kingdom: Various formats
        UK: /^(GIR\s?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
        // Australia: 4 digits
        AU: /^\d{4}$/,
        // Germany: 5 digits
        DE: /^\d{5}$/,
        // France: 5 digits
        FR: /^\d{5}$/,
        // Japan: 3 digits dash 4 digits
        JP: /^\d{3}-\d{4}$/,
        // Brazil: 5 digits dash 3 digits
        BR: /^\d{5}-\d{3}$/
    };
    
    // Check against all patterns
    for (const country in patterns) {
        if (patterns[country].test(trimmedCode)) {
            return true;
        }
    }
    
    // Additional generic check for 5-digit codes
    if (/^\d{5}$/.test(trimmedCode)) {
        return true;
    }
    
    return false;
}
