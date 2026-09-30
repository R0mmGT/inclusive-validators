function validate(phoneNumber) {
    // Define regex patterns for valid formats
    const patterns = [
        // (123) 456-7890 or (123)456-7890
        /^\(\d{3}\)\s?\d{3}-\d{4}$/,
        // 123-456-7890
        /^\d{3}-\d{3}-\d{4}$/,
        // 123.456.7890
        /^\d{3}\.\d{3}\.\d{4}$/,
        // 1234567890 (10 digits, no separators)
        /^\d{10}$/,
        // +1 (123) 456-7890 with optional spaces
        /^\+\s?1\s?\(\d{3}\)\s?\d{3}-\d{4}$/,
        // 1-123-456-7890
        /^1-\d{3}-\d{3}-\d{4}$/
    ];
    
    // Check if any pattern matches
    return patterns.some(pattern => pattern.test(phoneNumber));
}
