function validate(phoneString) {
    // Trim whitespace from both ends
    const trimmed = phoneString.trim();
    
    // Early return for empty or very short strings
    if (!trimmed || trimmed.length < 7) {
        return false;
    }
    
    // Remove common formatting characters but keep plus and digits
    const cleaned = trimmed.replace(/[\s\-\(\)\.]/g, '');
    
    // Check if it contains only valid characters (digits and optional leading +)
    if (!/^\+?\d+$/.test(cleaned)) {
        return false;
    }
    
    // Determine if number starts with country code indicator '+'
    const hasPlus = cleaned.startsWith('+');
    
    // Get the actual digits without the plus
    const digitsOnly = hasPlus ? cleaned.substring(1) : cleaned;
    
    // Validate length based on international vs local format
    if (hasPlus) {
        // International format: country code (1-3 digits) + subscriber number (typically 8-12 digits)
        // Minimum total with plus: 1 country code digit + 6 subscriber digits = 7 digits
        // Maximum reasonable: 3 country code + 12 subscriber = 15 digits
        if (digitsOnly.length < 7 || digitsOnly.length > 15) {
            return false;
        }
    } else {
        // Local format: typically 7-12 digits (US: 10, UK: 10-11, etc.)
        if (digitsOnly.length < 7 || digitsOnly.length > 12) {
            return false;
        }
    }
    
    return true;
}
