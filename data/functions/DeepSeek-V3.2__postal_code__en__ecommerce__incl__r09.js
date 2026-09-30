function validate(postalCode) {
    // Handle null, undefined, non-string inputs, or empty strings
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    // Trim whitespace and convert to uppercase for consistency
    const code = postalCode.trim().toUpperCase();
    
    // Check for empty string after trimming
    if (code.length === 0) {
        return false;
    }
    
    // Common international postal code patterns
    const patterns = [
        // US ZIP (5 digits or 5+4)
        /^\d{5}(-\d{4})?$/,
        // Canada (A1A 1A1 format)
        /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/,
        // UK (various formats like AA1A 1AA, A1A 1AA, A1 1AA, etc.)
        /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/,
        // Australia (4 digits)
        /^\d{4}$/,
        // Germany (5 digits)
        /^\d{5}$/,
        // France (5 digits)
        /^\d{5}$/,
        // Japan (〒123-4567 or 123-4567)
        /^(〒\s?)?\d{3}-\d{4}$/,
        // India (6 digits)
        /^\d{6}$/,
        // Brazil (5 digits + optional -3 digits)
        /^\d{5}(-\d{3})?$/,
        // Italy (5 digits)
        /^\d{5}$/,
        // Spain (5 digits)
        /^\d{5}$/,
        // Netherlands (4 digits + 2 letters, optional space)
        /^\d{4}\s?[A-Z]{2}$/,
        // Sweden (5 digits)
        /^\d{5}$/,
        // Switzerland (4 digits)
        /^\d{4}$/,
        // China (6 digits)
        /^\d{6}$/,
        // South Korea (5 digits or 3-3)
        /^\d{5}$|^\d{3}-\d{3}$/,
        // Mexico (5 digits)
        /^\d{5}$/,
        // Argentina (4 digits with optional letters)
        /^[A-Z]?\d{4}[A-Z]{0,3}$/,
        // Russia (6 digits)
        /^\d{6}$/,
        // Poland (2 digits + dash + 3 digits)
        /^\d{2}-\d{3}$/,
        // Czech Republic (3 digits + space + 2 digits)
        /^\d{3}\s?\d{2}$/,
        // Denmark (4 digits)
        /^\d{4}$/,
        // Finland (5 digits)
        /^\d{5}$/,
        // Norway (4 digits)
        /^\d{4}$/,
        // Austria (4 digits)
        /^\d{4}$/,
        // Portugal (4 digits + dash + 3 digits)
        /^\d{4}-\d{3}$/,
        // Ireland (various formats, but most follow A65 F4E2 pattern)
        /^[A-Z\d]{3}\s?[A-Z\d]{4}$/,
        // Turkey (5 digits)
        /^\d{5}$/,
        // South Africa (4 digits)
        /^\d{4}$/,
        // New Zealand (4 digits)
        /^\d{4}$/,
        // Philippines (4 digits)
        /^\d{4}$/,
        // Singapore (6 digits)
        /^\d{6}$/,
        // Malaysia (5 digits)
        /^\d{5}$/,
        // Thailand (5 digits)
        /^\d{5}$/,
        // Vietnam (6 digits)
        /^\d{6}$/,
        // Indonesia (5 digits)
        /^\d{5}$/,
        // Israel (7 digits)
        /^\d{7}$/,
        // Egypt (5 digits)
        /^\d{5}$/,
        // Saudi Arabia (5 digits)
        /^\d{5}$/,
        // UAE (not universally used, but some emirates use codes)
        /^[A-Z\d]{3,}$/,
        // Generic fallback: alphanumeric with dashes/spaces, 3-10 chars
        /^[A-Z\d\s\-]{3,10}$/
    ];
    
    // Check against all patterns
    for (const pattern of patterns) {
        if (pattern.test(code)) {
            return true;
        }
    }
    
    return false;
}
