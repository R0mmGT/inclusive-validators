function validate(postalCode) {
    // Trim whitespace and check for empty input
    const code = postalCode.trim();
    if (!code) return false;
    
    // US ZIP code pattern: 5 digits or 5 digits + hyphen + 4 digits
    const usPattern = /^\d{5}(-\d{4})?$/;
    
    // Canadian postal code pattern: A1A 1A1 format (alternating letter-digit)
    const caPattern = /^[A-Z]\d[A-Z] \d[A-Z]\d$/i;
    
    // UK postcode patterns
    const ukPatterns = [
        /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,  // Standard: SW1A 1AA
        /^[A-Z]{1,2}\d{1,2} \d[A-Z]{2}$/i,     // Alternative: EH12 7XX
        /^[A-Z]{1,2}\d \d[A-Z]{2}$/i,          // Single digit district: W1A 1AA
    ];
    
    return usPattern.test(code) || 
           caPattern.test(code) || 
           ukPatterns.some(pattern => pattern.test(code));
}
