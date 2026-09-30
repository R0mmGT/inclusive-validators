function validate(postalCode) {
    // Remove all whitespace and convert to uppercase for consistent processing
    const code = postalCode.replace(/\s+/g, '').toUpperCase();
    
    // Handle empty or whitespace-only strings
    if (!code || code.length === 0) return false;
    
    // Check for common invalid patterns
    if (/[`~!@#$%^&*()_+=[\]{}|\\;:'",.<>/?]/.test(code)) return false;
    
    // Country-specific validation patterns
    const patterns = {
        // United States (5 digits or 5+4)
        'US': /^\d{5}(-\d{4})?$/,
        
        // Canada (A1A 1A1 format)
        'CA': /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
        
        // United Kingdom (complex pattern covering various formats)
        'UK': /^([A-Z]{1,2}\d[A-Z\d]?[ -]?\d[A-Z]{2}|GIR ?0A{2})$/i,
        
        // Australia (4 digits)
        'AU': /^\d{4}$/,
        
        // Germany (5 digits)
        'DE': /^\d{5}$/,
        
        // France (5 digits)
        'FR': /^\d{5}$/,
        
        // Spain (5 digits)
        'ES': /^\d{5}$/,
        
        // Italy (5 digits)
        'IT': /^\d{5}$/,
        
        // Japan (3+4 or 7 digits)
        'JP': /^\d{3}-\d{4}$/,
        
        // China (6 digits)
        'CN': /^\d{6}$/,
        
        // India (6 digits)
        'IN': /^\d{6}$/,
        
        // Brazil (5 digits with optional -3)
        'BR': /^\d{5}(-\d{3})?$/,
        
        // Mexico (5 digits)
        'MX': /^\d{5}$/,
        
        // Netherlands (4 digits + 2 letters)
        'NL': /^\d{4}[A-Z]{2}$/i,
        
        // South Korea (5 or 6 digits)
        'KR': /^\d{5}(-\d{1})?$/,
        
        // Russia (6 digits)
        'RU': /^\d{6}$/,
        
        // Sweden (5 digits)
        'SE': /^\d{5}$/,
        
        // Switzerland (4 digits)
        'CH': /^\d{4}$/,
        
        // Argentina (4 digits or 8 with format)
        'AR': /^[A-Z]\d{4}[A-Z]{3}$/i,
        
        // Generic fallback: alphanumeric, 3-10 characters, no special chars except hyphen
        'GENERIC': /^[A-Z0-9\-]{3,10}$/i
    };
    
    // Test against all country patterns
    for (const country in patterns) {
        if (patterns[country].test(code)) {
            return true;
        }
    }
    
    // Additional safety checks
    // Must contain at least one digit
    if (!/\d/.test(code)) return false;
    
    // Length check (most postal codes are between 4 and 10 characters without spaces)
    if (code.length < 3 || code.length > 12) return false;
    
    // Final fallback: alphanumeric with optional hyphen in the middle
    // This catches many other country formats not explicitly listed
    const generalPattern = /^[A-Z0-9]+([\-]?[A-Z0-9]+)*$/i;
    return generalPattern.test(code);
}
