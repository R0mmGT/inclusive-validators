function validate(postalCode) {
    // Basic type and length check
    if (typeof postalCode !== 'string' || postalCode.length < 5 || postalCode.length > 10) {
        return false;
    }
    
    // Trim whitespace
    const trimmed = postalCode.trim();
    
    // Common patterns for various countries
    const patterns = [
        // US (5 digits or 5-4 format)
        /^\d{5}(-\d{4})?$/,
        // Canada (A1A 1A1 format)
        /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
        // UK (various formats like AA1 1AA, A1 1AA, A1A 1AA, AA11 1AA, AA1A 1AA)
        /^[A-Za-z]{1,2}\d[A-Za-z\d]?[ -]?\d[A-Za-z]{2}$/,
        // Australia (4 digits)
        /^\d{4}$/,
        // Germany (5 digits)
        /^\d{5}$/,
        // France (5 digits)
        /^\d{5}$/,
        // Japan (3 digits dash 4 digits)
        /^\d{3}-\d{4}$/,
        // Brazil (5 digits dash 3 digits)
        /^\d{5}-\d{3}$/,
        // India (6 digits)
        /^\d{6}$/,
        // Netherlands (4 digits, 2 letters, optional space)
        /^\d{4}[ -]?[A-Za-z]{2}$/,
        // Spain (5 digits)
        /^\d{5}$/,
        // Italy (5 digits)
        /^\d{5}$/,
    ];
    
    // Check against all patterns
    return patterns.some(pattern => pattern.test(trimmed));
}
