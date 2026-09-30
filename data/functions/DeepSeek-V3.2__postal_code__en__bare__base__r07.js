function validate(postalCode) {
    // Remove any whitespace from both ends
    const code = postalCode.trim();
    
    // Basic validation - must be between 5 and 10 characters
    if (code.length < 5 || code.length > 10) {
        return false;
    }
    
    // Must contain only alphanumeric characters and hyphens
    if (!/^[A-Za-z0-9\-]+$/.test(code)) {
        return false;
    }
    
    // Must contain at least one digit
    if (!/\d/.test(code)) {
        return false;
    }
    
    // Cannot start or end with a hyphen
    if (code.startsWith('-') || code.endsWith('-')) {
        return false;
    }
    
    // Cannot have consecutive hyphens
    if (code.includes('--')) {
        return false;
    }
    
    // For US ZIP codes: 5 digits or 5 digits + 4 digits with hyphen
    if (/^\d{5}(-\d{4})?$/.test(code)) {
        return true;
    }
    
    // For Canadian postal codes: A1A 1A1 format (letters and digits alternating)
    const canadianFormat = code.replace(/\s/g, '').toUpperCase();
    if (/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(canadianFormat)) {
        return true;
    }
    
    // For UK postcodes: Various complex formats
    const ukPatterns = [
        /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/, // Standard format
        /^[A-Z]{1,2}\d{1,2}\s*\d[A-Z]{2}$/,     // Format with 1-2 digits after letters
        /^[A-Z]\d\s*\d[A-Z]{2}$/,               // Single letter format
        /^[A-Z]{2}\d\s*\d[A-Z]{2}$/             // Double letter format
    ];
    
    const ukCode = code.toUpperCase().replace(/\s/g, '');
    for (const pattern of ukPatterns) {
        if (pattern.test(ukCode)) {
            return true;
        }
    }
    
    // For other international formats (simplified validation)
    // Must have at least one letter and one digit
    const hasLetter = /[A-Za-z]/.test(code);
    const hasDigit = /\d/.test(code);
    
    if (hasLetter && hasDigit) {
        // Additional check: letters and digits should be reasonably distributed
        const letters = code.replace(/[^A-Za-z]/g, '').length;
        const digits = code.replace(/[^0-9]/g, '').length;
        
        // Valid if it has reasonable proportion of letters to digits
        if (letters >= 1 && digits >= 1 && (letters + digits) >= code.length * 0.6) {
            return true;
        }
    }
    
    // Simple numeric postal codes (like many European countries)
    if (/^\d{4,9}$/.test(code)) {
        return true;
    }
    
    return false;
}
