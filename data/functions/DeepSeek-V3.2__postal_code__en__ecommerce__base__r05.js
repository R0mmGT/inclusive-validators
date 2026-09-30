function validate(code) {
    // Ensure input is a string
    if (typeof code !== 'string') {
        return false;
    }
    
    // Trim whitespace and check length
    const trimmed = code.trim();
    const length = trimmed.length;
    
    // Validate common postal code patterns
    // US ZIP codes: 5 digits or 5+4 format
    const usPattern = /^\d{5}(-\d{4})?$/;
    
    // Canadian postal codes: A1A 1A1 format
    const caPattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    
    // UK postcodes: various formats like AA1A 1AA, A1A 1AA, A1 1AA, etc.
    const ukPattern = /^[A-Za-z]{1,2}\d[A-Za-z\d]?[ -]?\d[A-Za-z]{2}$/;
    
    // Generic patterns for other countries
    // 6-digit codes (common in many European countries)
    const sixDigitPattern = /^\d{6}$/;
    
    // 4-digit codes (common in many European countries)
    const fourDigitPattern = /^\d{4}$/;
    
    // Combined validation
    return usPattern.test(trimmed) || 
           caPattern.test(trimmed) || 
           ukPattern.test(trimmed) || 
           sixDigitPattern.test(trimmed) || 
           fourDigitPattern.test(trimmed);
}
