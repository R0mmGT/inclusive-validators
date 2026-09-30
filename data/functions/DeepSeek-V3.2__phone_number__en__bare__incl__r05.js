function validate(phoneNumber) {
    // Remove all whitespace and control characters
    const cleaned = phoneNumber.replace(/[\s\p{C}]/gu, '');
    
    // Handle empty strings after cleaning
    if (!cleaned) return false;
    
    // Common phone number patterns
    const patterns = [
        // International format: +[country code][number], e.g., +14155552671
        /^\+\d{1,4}\d{6,14}$/,
        
        // E.164 format without plus but with leading 00: 00[country code][number]
        /^00\d{1,4}\d{6,14}$/,
        
        // North American NANP: (XXX) XXX-XXXX or XXX-XXX-XXXX
        /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
        
        // UK format: various with 0-4 digit area code
        /^(?:(?:\(?0\d{1,4}\)?[-.\s]?)?\d{5,10})$/,
        
        // Australia format
        /^(?:\+?61|0)[2-478](?:[-.\s]?\d){8}$/,
        
        // India format
        /^(?:\+91|0)?[6-9]\d{9}$/,
        
        // Japan format
        /^(?:\+81|0)[\d\-\(\)]{10,13}$/,
        
        // Germany format
        /^(?:\+49|0)[1-9]\d{1,4}[\s\-]?\d{3,13}$/,
        
        // France format
        /^(?:\+33|0)[1-9]\d{8}$/,
        
        // Basic digit-only formats (8-15 digits)
        /^\d{8,15}$/,
        
        // Formats with dots/dashes as separators
        /^[\d\.\-\(\)\s\+]{8,20}$/,
        
        // Special cases for toll-free/emergency numbers
        /^(?:112|911|999|000|110|118|119)$/,
        
        // US toll-free: 800/888/877/866/855/844/833
        /^[2-9]\d{9}$/,
        /^[2-9]\d{2}[2-9]\d{6}$/,
        /^1?[2-9]\d{2}[2-9]\d{6}$/,
        /^1?\(?[2-9]\d{2}\)?[2-9]\d{2}\d{4}$/,
        /^[2-9]\d{2}-\d{3}-\d{4}$/,
        /^\(\d{3}\)\d{3}-\d{4}$/
    ];
    
    // Check against all patterns
    for (const pattern of patterns) {
        if (pattern.test(cleaned)) {
            // Additional validation: must contain at least 3 digits
            const digitCount = (cleaned.match(/\d/g) || []).length;
            if (digitCount >= 3 && digitCount <= 15) {
                return true;
            }
        }
    }
    
    // Additional check for mixed formats
    const hasValidChars = /^[\d\+\-\(\)\.\s]{6,20}$/.test(phoneNumber);
    const digitCount = (phoneNumber.match(/\d/g) || []).length;
    
    return hasValidChars && digitCount >= 6 && digitCount <= 15;
}
