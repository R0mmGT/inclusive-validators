function validate(postalCode) {
    // Handle null/undefined/empty input
    if (typeof postalCode !== 'string' || postalCode.trim() === '') {
        return false;
    }
    
    // Remove all whitespace for validation
    const code = postalCode.replace(/\s/g, '');
    
    // Common postal code patterns by country/region
    const patterns = [
        // US (5 digits or 5+4 format)
        /^\d{5}(-\d{4})?$/,
        // Canada (A1A 1A1 format)
        /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
        // UK (complex pattern covering various formats)
        /^(GIR\s?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
        // Australia (4 digits)
        /^\d{4}$/,
        // Germany (5 digits)
        /^\d{5}$/,
        // France (5 digits)
        /^\d{5}$/,
        // Italy (5 digits)
        /^\d{5}$/,
        // Spain (5 digits)
        /^\d{5}$/,
        // Netherlands (4 digits + 2 letters)
        /^\d{4}\s?[A-Z]{2}$/i,
        // Brazil (5 digits + dash + 3 digits)
        /^\d{5}-\d{3}$/,
        // India (6 digits)
        /^\d{6}$/,
        // Japan (3 digits + dash + 4 digits)
        /^\d{3}-\d{4}$/,
        // China (6 digits)
        /^\d{6}$/,
        // South Korea (5 digits or 3+3 format)
        /^\d{5}$|^\d{3}-\d{3}$/,
        // Mexico (5 digits)
        /^\d{5}$/,
        // Russia (6 digits)
        /^\d{6}$/,
        // Sweden (3 digits + space + 2 digits)
        /^\d{3}\s?\d{2}$/,
        // Switzerland (4 digits)
        /^\d{4}$/,
        // Argentina (4 digits or 4+3 format)
        /^[A-Z]\d{4}[A-Z]{3}$|^\d{4}$/i,
        // Austria (4 digits)
        /^\d{4}$/,
        // Belgium (4 digits)
        /^\d{4}$/,
        // Denmark (4 digits)
        /^\d{4}$/,
        // Finland (5 digits)
        /^\d{5}$/,
        // Norway (4 digits)
        /^\d{4}$/,
        // Poland (2 digits + dash + 3 digits)
        /^\d{2}-\d{3}$/,
        // Portugal (4 digits + dash + 3 digits)
        /^\d{4}-\d{3}$/,
        // Czech Republic (3 digits + space + 2 digits)
        /^\d{3}\s?\d{2}$/,
        // Hungary (4 digits)
        /^\d{4}$/,
        // Slovakia (3 digits + space + 2 digits)
        /^\d{3}\s?\d{2}$/,
        // Ireland (complex format)
        /^([A-Z]\d{2}|[A-Z]{2}\d{2}|[A-Z]\d[A-Z]|[A-Z]{2}\d[A-Z]|[A-Z]\d{2}[A-Z]|[A-Z]{2}\d{2}[A-Z])\s?\d[A-Z]{2}$/i,
        // New Zealand (4 digits)
        /^\d{4}$/,
        // Singapore (6 digits)
        /^\d{6}$/,
        // South Africa (4 digits)
        /^\d{4}$/,
        // Taiwan (3 digits or 3+2 format)
        /^\d{3}$|^\d{3}-\d{2}$/,
        // Thailand (5 digits)
        /^\d{5}$/,
        // Turkey (5 digits)
        /^\d{5}$/,
        // Ukraine (5 digits)
        /^\d{5}$/,
        // Vietnam (6 digits)
        /^\d{6}$/,
        // General fallback: 3-10 alphanumeric characters
        /^[A-Z0-9\s-]{3,10}$/i
    ];
    
    // Test against all patterns
    for (const pattern of patterns) {
        if (pattern.test(code)) {
            return true;
        }
    }
    
    return false;
}
