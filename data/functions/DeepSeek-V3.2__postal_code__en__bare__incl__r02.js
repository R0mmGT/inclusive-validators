function validate(postalCode) {
    // First, ensure the input is a non-empty string
    if (typeof postalCode !== 'string' || postalCode.trim() === '') {
        return false;
    }
    
    // Trim whitespace from both ends
    const code = postalCode.trim();
    
    // Common global postal code patterns
    const patterns = [
        // United States: 5 digits or 5+4 format
        /^\d{5}(-\d{4})?$/,
        // Canada: A1A 1A1 format
        /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
        // United Kingdom: Various formats like AA1A 1AA, A1A 1AA, A1 1AA, etc.
        /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
        // Australia: 4 digits
        /^\d{4}$/,
        // Germany: 5 digits
        /^\d{5}$/,
        // France: 5 digits
        /^\d{5}$/,
        // Japan: 3 digits dash 4 digits or 7 digits
        /^\d{3}-\d{4}$|^\d{7}$/,
        // India: 6 digits
        /^\d{6}$/,
        // Brazil: 5 digits dash 3 digits
        /^\d{5}-\d{3}$/,
        // Mexico: 5 digits
        /^\d{5}$/,
        // Netherlands: 4 digits, 2 letters (with optional space)
        /^\d{4} ?[A-Z]{2}$/i,
        // Spain: 5 digits
        /^\d{5}$/,
        // Italy: 5 digits
        /^\d{5}$/,
        // South Korea: 5 digits or 3 digits dash 3 digits
        /^\d{5}$|^\d{3}-\d{3}$/,
        // China: 6 digits
        /^\d{6}$/,
        // Russia: 6 digits
        /^\d{6}$/,
        // Sweden: 3 digits space 2 digits
        /^\d{3} ?\d{2}$/,
        // Norway: 4 digits
        /^\d{4}$/,
        // Denmark: 4 digits
        /^\d{4}$/,
        // Finland: 5 digits
        /^\d{5}$/,
        // Poland: 2 digits dash 3 digits
        /^\d{2}-\d{3}$/,
        // Czech Republic: 3 digits space 2 digits
        /^\d{3} ?\d{2}$/,
        // Austria: 4 digits
        /^\d{4}$/,
        // Switzerland: 4 digits
        /^\d{4}$/,
        // Portugal: 4 digits dash 3 digits
        /^\d{4}-\d{3}$/,
        // Ireland: Various formats
        /^[A-Z]{1,2}\d[\dA-Z]? ?\d[A-Z]{2}$/i,
        // New Zealand: 4 digits
        /^\d{4}$/,
        // South Africa: 4 digits
        /^\d{4}$/,
        // Argentina: 4 digits or letter, 4 digits, 3 letters
        /^\d{4}$|^[A-Z]\d{4}[A-Z]{3}$/i,
        // Turkey: 5 digits
        /^\d{5}$/,
        // Taiwan: 3 digits dash 3 digits or 3 digits
        /^\d{3}-\d{3}$|^\d{3}$|^\d{5}$/,
        // Thailand: 5 digits
        /^\d{5}$/,
        // Israel: 7 digits
        /^\d{7}$/,
        // Egypt: 5 digits
        /^\d{5}$/,
        // Philippines: 4 digits
        /^\d{4}$/,
        // Malaysia: 5 digits
        /^\d{5}$/,
        // Singapore: 6 digits
        /^\d{6}$/,
        // Hong Kong: No postal code system, but some services use empty or specific codes
        // For practical purposes, we'll accept empty string or any format
        /^$|^.{1,10}$/
    ];
    
    // Special case for countries without postal codes or very flexible formats
    // Some countries don't use postal codes at all or have very flexible formats
    const flexibleCountries = [
        // Ireland (already in patterns but more flexible)
        // Hong Kong (already handled)
        // Panama, Guyana, etc. - accept alphanumeric codes
        /^[A-Z0-9 -]{3,10}$/i
    ];
    
    // Check against all patterns
    for (const pattern of patterns) {
        if (pattern.test(code)) {
            return true;
        }
    }
    
    // Check flexible patterns if strict patterns don't match
    for (const pattern of flexibleCountries) {
        if (pattern.test(code)) {
            return true;
        }
    }
    
    // Additional heuristic for alphanumeric codes (common in some countries)
    // Accept codes that are 2-10 characters with letters, numbers, spaces, or dashes
    if (/^[A-Z0-9][A-Z0-9 -]{1,9}$/i.test(code)) {
        // But reject codes that are clearly not postal codes
        // (e.g., single characters, only spaces, etc.)
        if (!/^\s+$/.test(code) && code.length >= 2) {
            return true;
        }
    }
    
    // If no pattern matches, it's likely not a valid postal code
    return false;
}
