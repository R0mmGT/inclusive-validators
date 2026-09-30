function validate(phoneNumber) {
    // Handle edge cases: null, undefined, non-string input
    if (typeof phoneNumber !== 'string') {
        return false;
    }
    
    // Trim whitespace from both ends
    const trimmed = phoneNumber.trim();
    
    // Check if string is empty after trimming
    if (trimmed.length === 0) {
        return false;
    }
    
    // Acceptable formats:
    // 1. (123) 456-7890
    // 2. 123-456-7890
    // 3. 123.456.7890
    // 4. 123 456 7890
    // 5. 1234567890
    // 6. +1 (123) 456-7890 (international format with country code)
    
    // Regular expression breakdown:
    // ^(\+\d{1,3}\s?)?                    - Optional country code (+1, +44, etc.)
    // (\(?\d{3}\)?[\s.-]?)                - Area code with optional parentheses and separator
    // \d{3}[\s.-]?                        - First 3 digits with optional separator
    // \d{4}$                              - Last 4 digits at end of string
    
    const phoneRegex = /^(\+\d{1,3}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
    
    // Additional validation: count digits to ensure exactly 10 (or 11-13 with country code)
    const digitCount = trimmed.replace(/\D/g, '').length;
    
    // Must have exactly 10 digits (US/Canada) or 10-13 digits with country code
    if (digitCount < 10 || digitCount > 13) {
        return false;
    }
    
    return phoneRegex.test(trimmed);
}
