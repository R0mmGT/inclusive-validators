function validate(phoneNumber) {
    // Step 1: Basic input validation
    if (typeof phoneNumber !== 'string') return false;
    
    // Step 2: Remove all non-digit characters except leading +
    const cleaned = phoneNumber.trim();
    
    // Step 3: Check if it's empty after trimming
    if (cleaned.length === 0) return false;
    
    // Step 4: Validate basic structure
    // Allow: optional + at start, digits, spaces, dots, hyphens, parentheses
    // This covers most international formats
    const basicPattern = /^\+?[\d\s\-().]+$/;
    if (!basicPattern.test(cleaned)) return false;
    
    // Step 5: Extract digits and count them
    const digitsOnly = cleaned.replace(/\D/g, '');
    
    // Step 6: Validate digit length
    // ITU-T E.164 standard: max 15 digits, min varies by country but at least 4
    if (digitsOnly.length < 4 || digitsOnly.length > 15) return false;
    
    // Step 7: Validate country codes (optional but helpful)
    // Ensure proper country code if international format (+ present)
    if (cleaned.startsWith('+')) {
        // Country codes are 1-3 digits (with rare exceptions)
        // The + should be followed by 1-3 digits for country code
        const countryCodeMatch = cleaned.match(/^\+\s*(\d{1,3})/);
        if (!countryCodeMatch) return false;
        
        // Check if number starts with valid country code pattern
        const countryCode = countryCodeMatch[1];
        
        // Some known problematic patterns (adjustable)
        // Country codes shouldn't start with 0
        if (countryCode.startsWith('0')) return false;
        
        // Very short country codes need specific handling
        if (countryCode.length === 1 && !['1', '7'].includes(countryCode)) {
            return false;
        }
    }
    
    // Step 8: Additional sanity checks
    // Check for sequences of 4+ identical digits which are often invalid
    if (/(\d)\1{3,}/.test(digitsOnly)) return false;
    
    // Step 9: Check for valid area/city code patterns (loose check)
    // Ensure the number after country code isn't all zeros
    const numberWithoutCountryCode = cleaned.startsWith('+') 
        ? digitsOnly.slice(cleaned.match(/^\+\s*\d{1,3}/)[0].replace(/\D/g, '').length)
        : digitsOnly;
    
    // Area code shouldn't be all zeros
    if (/^0+$/.test(numberWithoutCountryCode.substring(0, Math.min(3, numberWithoutCountryCode.length)))) {
        return false;
    }
    
    // Step 10: Final digit validation
    // At least one digit after any country/area code
    if (numberWithoutCountryCode.length < 3) return false;
    
    return true;
}
