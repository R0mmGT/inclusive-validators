function validate(phoneString) {
    if (typeof phoneString !== 'string' || phoneString.trim() === '') {
        return false;
    }
    
    const trimmedPhone = phoneString.trim();
    
    // Common patterns for phone number validation
    const patterns = [
        // (123) 456-7890 or (123)456-7890
        /^\(\d{3}\)\s?\d{3}-\d{4}$/,
        // 123-456-7890 or 123.456.7890 or 123 456 7890
        /^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/,
        // +1 (123) 456-7890 or +1 123-456-7890
        /^\+\d{1,3}\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
        // International: +44 20 1234 5678 or +44 2012345678
        /^\+\d{1,3}\s?\d{2,}[-.\s]?\d{3,}[-.\s]?\d{3,}$/,
        // 1234567890 (no separators)
        /^\d{10}$/,
        // 1-123-456-7890 or 1.123.456.7890 (with country code)
        /^1[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/
    ];
    
    // Check if any pattern matches
    for (const pattern of patterns) {
        if (pattern.test(trimmedPhone)) {
            // Additional validation: count digits
            const digitCount = (trimmedPhone.match(/\d/g) || []).length;
            // Most phone numbers have between 10-15 digits
            return digitCount >= 10 && digitCount <= 15;
        }
    }
    
    return false;
}
