function validate(phoneNumber) {
    // Helper function to normalize the phone number
    const normalize = (str) => {
        // Remove all non-digit characters except leading '+'
        let normalized = '';
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if (char === '+' && normalized === '') {
                normalized += '+';
            } else if (char >= '0' && char <= '9') {
                normalized += char;
            }
        }
        return normalized;
    };
    
    // Helper function to check if number contains only valid characters
    const isValidChars = (str) => {
        // Allow digits, spaces, hyphens, parentheses, dots, and plus at start
        const validChars = /^[+\-\s().\d]+$/;
        return validChars.test(str);
    };
    
    // Basic sanity checks
    if (typeof phoneNumber !== 'string') return false;
    if (phoneNumber.trim() === '') return false;
    
    const trimmed = phoneNumber.trim();
    
    // Check for valid characters
    if (!isValidChars(trimmed)) return false;
    
    // Check for reasonable length (ITU-T E.164: max 15 digits plus optional '+')
    const normalized = normalize(trimmed);
    if (normalized.startsWith('+')) {
        // International format: '+' followed by 1-15 digits
        const digitsOnly = normalized.substring(1);
        if (digitsOnly.length < 1 || digitsOnly.length > 15) return false;
        if (!/^\d+$/.test(digitsOnly)) return false;
    } else {
        // National format: 3-15 digits (very conservative ranges)
        if (normalized.length < 3 || normalized.length > 15) return false;
        if (!/^\d+$/.test(normalized)) return false;
    }
    
    // Additional common sense checks
    // Check for obvious invalid patterns
    if (normalized.replace('+', '').replace(/0/g, '').length === 0) {
        // All zeros (or just zeros after plus)
        return false;
    }
    
    // Check for consecutive unusual repeating patterns (like 1111111111)
    const repeatingPattern = /(\d)\1{9,}/; // Same digit repeated 10+ times
    if (repeatingPattern.test(normalized.replace('+', ''))) {
        return false;
    }
    
    return true;
}
