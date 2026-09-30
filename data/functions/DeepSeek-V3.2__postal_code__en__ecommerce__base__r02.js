function validate(postalCode) {
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    const trimmed = postalCode.trim();
    
    // Check length
    if (trimmed.length < 5 || trimmed.length > 10) {
        return false;
    }
    
    // Must contain at least one digit
    if (!/\d/.test(trimmed)) {
        return false;
    }
    
    // Common patterns for postal codes worldwide
    const patterns = [
        /^\d{5}$/,                           // US ZIP (basic)
        /^\d{5}-\d{4}$/,                     // US ZIP+4
        /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,      // Canadian
        /^\d{4}$/,                          // Australia, Denmark, etc.
        /^\d{5}$/,                          // Germany, France, etc.
        /^\d{6}$/,                          // India, Singapore, etc.
        /^\d{3}\s?\d{2}$/,                  // Sweden, Norway
        /^\d{4}\s?[A-Z]{2}$/i,              // Netherlands
        /^\d{3}-\d{4}$/,                    // Japan
        /^\d{4}\s?\d{3}$/,                  // South Africa
        /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, // UK
        /^\d{7}$/                           // Brazil
    ];
    
    // Check against all patterns
    for (const pattern of patterns) {
        if (pattern.test(trimmed)) {
            return true;
        }
    }
    
    // Additional check for alphanumeric codes with dash/space
    const generalPattern = /^[A-Z0-9][A-Z0-9\s\-]{3,9}$/i;
    if (!generalPattern.test(trimmed)) {
        return false;
    }
    
    // Final validation: ensure it doesn't start/end with dash/space
    if (/^[\s\-]|[\s\-]$/.test(trimmed)) {
        return false;
    }
    
    // Ensure no consecutive dashes or spaces
    if (/[\s\-]{2,}/.test(trimmed)) {
        return false;
    }
    
    return true;
}
