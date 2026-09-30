function validate(phoneNumber) {
    // Remove all non-digit characters except leading +
    const cleaned = phoneNumber.trim();
    
    // Empty string is invalid
    if (!cleaned) return false;
    
    // Check if it starts with optional + followed by digits and possibly spaces/dashes/parentheses
    // The pattern allows: optional +, then digits, spaces, dashes, dots, parentheses
    const basicPattern = /^\+?[\d\s\-\(\)\.]+$/;
    if (!basicPattern.test(cleaned)) return false;
    
    // Extract only digits and leading +
    const digitsOnly = cleaned.replace(/[^\d\+]/g, '');
    
    // Must contain at least 3 digits (shortest valid phone numbers are 3 digits, e.g., 911)
    const digitCount = digitsOnly.replace('+', '').length;
    if (digitCount < 3) return false;
    
    // If starts with +, the part after + must be 1-15 digits (ITU-T E.164 allows up to 15)
    if (digitsOnly.startsWith('+')) {
        const afterPlus = digitsOnly.substring(1);
        return afterPlus.length >= 1 && afterPlus.length <= 15 && /^\d+$/.test(afterPlus);
    }
    
    // If no +, must be all digits and reasonable length (1-15 digits)
    return /^\d+$/.test(digitsOnly) && digitCount >= 3 && digitCount <= 15;
}
