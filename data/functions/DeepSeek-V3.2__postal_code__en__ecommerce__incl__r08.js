function validate(postalCode) {
    if (typeof postalCode !== 'string') return false;
    
    // Common postal code patterns by country/region
    const patterns = [
        // US ZIP codes (5 digits or 5+4)
        /^\d{5}(-\d{4})?$/,
        
        // Canadian postal codes (A1A 1A1 format)
        /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
        
        // UK postcodes (complex but common patterns)
        /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,
        
        // Australian postcodes (4 digits)
        /^\d{4}$/,
        
        // German PLZ (5 digits)
        /^\d{5}$/,
        
        // French postal codes (5 digits)
        /^\d{5}$/,
        
        // Japanese postal codes (〒123-4567 or 123-4567)
        /^(\d{3}-\d{4})|(〒\d{3}-\d{4})$/,
        
        // Indian PIN codes (6 digits)
        /^\d{6}$/,
        
        // Brazilian CEP (8 digits with optional dash)
        /^\d{5}-?\d{3}$/,
        
        // Chinese postal codes (6 digits)
        /^\d{6}$/,
        
        // Mexican CP (5 digits)
        /^\d{5}$/,
        
        // Russian postal codes (6 digits)
        /^\d{6}$/,
        
        // Italian CAP (5 digits)
        /^\d{5}$/,
        
        // Spanish Código Postal (5 digits)
        /^\d{5}$/,
        
        // South Korean postal codes (5 digits or newer 5-3 format)
        /^(\d{5}|\d{5}-\d{3})$/,
        
        // Netherlands postcode (4 digits + 2 letters)
        /^\d{4} ?[A-Z]{2}$/i,
        
        // Swedish postnummer (5 digits with optional space)
        /^\d{3} ?\d{2}$/,
        
        // Swiss PLZ (4 digits)
        /^\d{4}$/,
        
        // Basic international fallback: 3-10 alphanumeric with optional spaces/dashes
        /^[A-Z0-9][A-Z0-9\s\-]{2,14}[A-Z0-9]$/i
    ];
    
    // Remove common prefixes and normalize spaces
    const normalized = postalCode
        .trim()
        .toUpperCase()
        .replace(/^(POSTAL CODE|POSTCODE|ZIP|ZIPCODE|CEP|CP|PIN|PLZ|CAP|〒|#)/i, '')
        .trim()
        .replace(/\s+/g, ' ');
    
    if (normalized.length === 0 || normalized.length > 20) return false;
    
    // Check against all patterns
    return patterns.some(pattern => pattern.test(normalized));
}
