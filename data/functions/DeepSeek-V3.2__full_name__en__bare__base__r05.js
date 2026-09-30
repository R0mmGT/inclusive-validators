function validate(name) {
    // Check if input is a non-empty string
    if (typeof name !== 'string' || name.trim() === '') {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Check for minimum and maximum length constraints
    if (trimmedName.length < 2 || trimmedName.length > 100) {
        return false;
    }
    
    // Split into parts and ensure we have at least first and last name
    const nameParts = trimmedName.split(/\s+/);
    if (nameParts.length < 2) {
        return false;
    }
    
    // Validate each name part
    for (let part of nameParts) {
        // Each part should be at least 2 characters (except for valid initials with period)
        if (part.length === 1) {
            return false;
        }
        
        // Check for valid characters: letters, hyphens, apostrophes, and periods
        const validPartRegex = /^[A-Za-zÀ-ÿ]+([-'.][A-Za-zÀ-ÿ]+)*$/;
        if (!validPartRegex.test(part)) {
            return false;
        }
        
        // Check for excessive special characters
        const specialCharCount = (part.match(/[-'.]/g) || []).length;
        if (specialCharCount > 2) {
            return false;
        }
        
        // Check for consecutive special characters
        if (/[-'.][-'.]/.test(part)) {
            return false;
        }
        
        // Name should not start or end with special character
        if (/^[-'.]|[-'.]$/.test(part)) {
            return false;
        }
        
        // Initial with period should be single letter followed by period
        if (part.includes('.') && !/^[A-Za-z]\.$/.test(part)) {
            return false;
        }
    }
    
    // Check for common invalid patterns
    const invalidPatterns = [
        /^\d/,                     // Starts with digit
        /\d/,                      // Contains any digit
        /[@#$%^&*()_+={}\[\]:;"<>?\\|~`]/,  // Invalid symbols
        /(.)\1{4,}/,               // 5 or more consecutive identical characters
        /\b(test|example|user|admin)\b/i,  // Common invalid names
        /\b(a|an|the|and|or|but)\b/i       // Common words that aren't names
    ];
    
    for (let pattern of invalidPatterns) {
        if (pattern.test(trimmedName)) {
            return false;
        }
    }
    
    // Check capitalization (optional, but recommended for full names)
    // Allow exceptions for names like "de la Cruz" or "van der Berg"
    const firstCharValid = /^[A-ZÀ-Ý]/.test(nameParts[0]);
    const lastCharValid = /^[A-ZÀ-Ý]/.test(nameParts[nameParts.length - 1]);
    
    if (!firstCharValid || !lastCharValid) {
        return false;
    }
    
    return true;
}
