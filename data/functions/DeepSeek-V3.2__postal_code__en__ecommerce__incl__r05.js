function validate(postalCode) {
    // Handle edge cases: null, undefined, non-string, empty string
    if (typeof postalCode !== 'string' || postalCode.trim() === '') {
        return false;
    }
    
    const code = postalCode.trim();
    
    // International postal code patterns by country/region
    const patterns = {
        // US: 5 digits or 5+4 format
        US: /^\d{5}(?:-\d{4})?$/,
        // Canada: A1A 1A1 format
        CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
        // UK: Multiple complex formats
        UK: /^(GIR\s?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
        // Australia: 4 digits
        AU: /^\d{4}$/,
        // Germany: 5 digits
        DE: /^\d{5}$/,
        // France: 5 digits
        FR: /^\d{5}$/,
        // Japan: 〒123-4567 or 123-4567
        JP: /^(〒?\d{3}-\d{4}|\d{7})$/,
        // India: 6 digits
        IN: /^\d{6}$/,
        // Brazil: 12345-678
        BR: /^\d{5}-\d{3}$/,
        // Mexico: 5 digits
        MX: /^\d{5}$/,
        // Spain: 5 digits
        ES: /^\d{5}$/,
        // Italy: 5 digits
        IT: /^\d{5}$/,
        // Netherlands: 1234 AB or 1234AB
        NL: /^\d{4}\s?[A-Z]{2}$/i,
        // Sweden: 123 45 or 12345
        SE: /^\d{3}\s?\d{2}$/,
        // China: 6 digits
        CN: /^\d{6}$/,
        // South Korea: 12345 or 123-456
        KR: /^\d{5}(?:\d{1})?$/,
        // Russia: 6 digits
        RU: /^\d{6}$/,
        // Generic fallback: 3-10 alphanumeric with optional spaces/hyphens
        GENERIC: /^[A-Z0-9][A-Z0-9\s\-]{2,14}[A-Z0-9]$/i
    };
    
    // Check against all country patterns
    for (const country in patterns) {
        if (patterns[country].test(code)) {
            return true;
        }
    }
    
    return false;
}
