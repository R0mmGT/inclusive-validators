function validate(phoneNumber) {
    // Trim whitespace from both ends
    const trimmed = phoneNumber.trim();
    
    // Define pattern: optional country code (1-3 digits) with optional +, 
    // optional area code in parentheses or without, 
    // 3 digits, separator (space, dot, or dash), 
    // 3 digits, separator, 4 digits
    // Also allows formats without separators
    const patterns = [
        /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
        /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{4}[-.\s]?\d{4}$/,
        /^\d{10}$/,
        /^\(\d{3}\)\s?\d{3}[-.\s]?\d{4}$/,
        /^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/
    ];
    
    // Check if any pattern matches
    for (const pattern of patterns) {
        if (pattern.test(trimmed)) {
            // Additional validation: ensure parentheses are balanced
            const openParen = (trimmed.match(/\(/g) || []).length;
            const closeParen = (trimmed.match(/\)/g) || []).length;
            if (openParen !== closeParen) return false;
            
            // Ensure phone number has 10 digits (excluding optional country code)
            const digitCount = trimmed.replace(/\D/g, '').length;
            const hasCountryCode = /^\+?\d{1,3}[-.\s]/.test(trimmed);
            
            if (hasCountryCode) {
                // With country code: total digits should be 10-13
                return digitCount >= 10 && digitCount <= 13;
            } else {
                // Without country code: exactly 10 digits
                return digitCount === 10;
            }
        }
    }
    
    return false;
}
