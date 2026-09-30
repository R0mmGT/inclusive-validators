function validate(postalCode) {
    // Handle null, undefined, non-string, or empty input
    if (typeof postalCode !== 'string' || postalCode.trim().length === 0) {
        return false;
    }
    
    const code = postalCode.trim();
    
    // Common global patterns for postal codes
    const patterns = [
        // US ZIP codes (5 digits or 5+4 format)
        /^\d{5}(-\d{4})?$/,
        // Canadian postal codes (A1A 1A1 format)
        /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
        // UK postcodes (complex pattern covering various formats)
        /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,
        // Australian postcodes (4 digits)
        /^\d{4}$/,
        // German PLZ (5 digits)
        /^\d{5}$/,
        // French postal codes (5 digits)
        /^\d{5}$/,
        // Japanese postal codes (7 digits, may include hyphen)
        /^\d{3}-\d{4}$|^\d{7}$/,
        // Brazilian CEP (8 digits, may include hyphen)
        /^\d{5}-\d{3}$|^\d{8}$/,
        // Indian PIN codes (6 digits)
        /^\d{6}$/,
        // Chinese postal codes (6 digits)
        /^\d{6}$/,
        // Russian postal codes (6 digits)
        /^\d{6}$/,
        // Italian CAP (5 digits)
        /^\d{5}$/,
        // Spanish Código Postal (5 digits)
        /^\d{5}$/,
        // Netherlands postcode (4 digits + 2 letters, may include space)
        /^\d{4} ?[A-Z]{2}$/i,
        // Swedish postnummer (5 digits, may include space)
        /^\d{3} ?\d{2}$/,
        // Swiss PLZ (4 digits)
        /^\d{4}$/,
        // South Korean postal codes (5 digits or 5-3 format)
        /^\d{5}(-\d{3})?$/,
        // Mexican Código Postal (5 digits)
        /^\d{5}$/,
        // Argentina CPA (varies, but commonly 4 digits or letter+4digits)
        /^[A-Z]?\d{4}[A-Z]{0,3}$/i,
        // Basic fallback for many countries: 4-6 digits
        /^\d{4,6}$/
    ];
    
    // Test against all patterns
    for (const pattern of patterns) {
        if (pattern.test(code)) {
            return true;
        }
    }
    
    // Additional validation for countries with specific rules
    if (validateCountrySpecific(code)) {
        return true;
    }
    
    return false;
}

function validateCountrySpecific(code) {
    // Validate Canadian postal code format more strictly
    const canadianPattern = /^[A-Z]\d[A-Z] \d[A-Z]\d$/i;
    if (canadianPattern.test(code)) {
        const letters = code.toUpperCase();
        // First character should not be D, F, I, O, Q, U, W, Z
        const firstLetter = letters.charAt(0);
        const invalidFirstLetters = ['D', 'F', 'I', 'O', 'Q', 'U', 'W', 'Z'];
        if (invalidFirstLetters.includes(firstLetter)) {
            return false;
        }
        // Third character should not be D, F, I, O, Q, U
        const thirdLetter = letters.charAt(2);
        const invalidThirdLetters = ['D', 'F', 'I', 'O', 'Q', 'U'];
        if (invalidThirdLetters.includes(thirdLetter)) {
            return false;
        }
        // Last character should not be D, F, I, O, Q, U
        const lastLetter = letters.charAt(letters.length - 1);
        if (invalidThirdLetters.includes(lastLetter)) {
            return false;
        }
        return true;
    }
    
    // Validate UK postcode more thoroughly
    const ukPattern = /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i;
    if (ukPattern.test(code.toUpperCase())) {
        // Additional UK validation could include:
        // - Area codes validation
        // - District codes validation
        // - Sector codes validation
        // For simplicity, we accept the basic pattern
        return true;
    }
    
    return false;
}
