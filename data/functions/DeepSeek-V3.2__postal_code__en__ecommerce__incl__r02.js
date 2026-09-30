function validate(postalCode) {
    // Handle null, undefined, non-string types, and trim whitespace
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    const code = postalCode.trim();
    
    // Empty string is not valid
    if (code.length === 0) {
        return false;
    }
    
    // Check for some extreme edge cases first
    // Maximum reasonable length check (based on real postal codes)
    if (code.length > 20) {
        return false;
    }
    
    // Must contain at least one alphanumeric character
    if (!/[A-Za-z0-9]/.test(code)) {
        return false;
    }
    
    // Check for some obviously invalid patterns
    // Cannot consist only of the same character repeated
    if (/^(.)\1+$/.test(code)) {
        return false;
    }
    
    // Basic pattern validation covering most countries
    
    // Pattern 1: US/Canada style - A1A 1A1 or 12345 or 12345-6789
    const usCanadaPattern = /^(\d{5}(-\d{4})?|[A-Z]\d[A-Z]\s?\d[A-Z]\d)$/i;
    
    // Pattern 2: UK style - AA9A 9AA, A9 9AA, A99 9AA, AA9 9AA, AA99 9AA
    const ukPattern = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
    
    // Pattern 3: Australian style - 4 digits
    const australiaPattern = /^\d{4}$/;
    
    // Pattern 4: Japanese style - 3 digits hyphen 4 digits (〒123-4567)
    const japanPattern = /^(\d{3}-\d{4}|〒\d{3}-\d{4})$/;
    
    // Pattern 5: German style - 5 digits
    const germanyPattern = /^\d{5}$/;
    
    // Pattern 6: French style - 5 digits
    const francePattern = /^\d{5}$/;
    
    // Pattern 7: Italian style - 5 digits
    const italyPattern = /^\d{5}$/;
    
    // Pattern 8: Spanish style - 5 digits
    const spainPattern = /^\d{5}$/;
    
    // Pattern 9: Brazilian style - 5 digits hyphen 3 digits (12345-678)
    const brazilPattern = /^\d{5}-\d{3}$/;
    
    // Pattern 10: Indian style - 6 digits
    const indiaPattern = /^\d{6}$/;
    
    // Pattern 11: Chinese style - 6 digits
    const chinaPattern = /^\d{6}$/;
    
    // Pattern 12: Russian style - 6 digits
    const russiaPattern = /^\d{6}$/;
    
    // Pattern 13: Generic patterns for other countries
    const genericPatterns = [
        /^\d{3}$/,              // Iceland, etc.
        /^\d{4}$/,              // Norway, Sweden, etc.
        /^\d{5}$/,              // Most EU countries
        /^\d{6}$/,              // Many Asian countries
        /^\d{7}$/,              // Thailand
        /^\d{8}$/,              // Iran
        /^[A-Z]{2}\d{4}$/i,     // New Zealand (AA1234)
        /^[A-Z]{3}\s?\d{4}$/i,  // Argentina (C1234AAA style simplified)
        /^\d{4}[A-Z]{2}$/i,     // Netherlands (1234AB)
        /^[A-Z]\d{4}[A-Z]{3}$/i,// Ireland (A65 F4E2 simplified)
        /^[A-Z]{1,2}\d{1,2}\s?\d{1,2}[A-Z]{1,3}$/i, // Flexible European pattern
        /^\d{3}\s?\d{2}$/,      // Scandinavian (123 45)
        /^[A-Z\d]{3,10}$/i      // Fallback: alphanumeric 3-10 chars
    ];
    
    // Check all patterns
    const patterns = [
        usCanadaPattern,
        ukPattern,
        australiaPattern,
        japanPattern,
        germanyPattern,
        francePattern,
        italyPattern,
        spainPattern,
        brazilPattern,
        indiaPattern,
        chinaPattern,
        russiaPattern,
        ...genericPatterns
    ];
    
    return patterns.some(pattern => pattern.test(code));
}
