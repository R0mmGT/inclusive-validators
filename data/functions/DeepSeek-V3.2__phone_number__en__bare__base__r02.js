function validate(phoneNumber) {
    // Remove all whitespace characters
    const cleaned = phoneNumber.replace(/\s/g, '');
    
    // Define valid patterns
    const patterns = [
        /^\+1\d{10}$/,            // +11234567890
        /^1\d{10}$/,              // 11234567890
        /^\d{10}$/,               // 1234567890
        /^\+1-\d{3}-\d{3}-\d{4}$/, // +1-123-456-7890
        /^1-\d{3}-\d{3}-\d{4}$/,   // 1-123-456-7890
        /^\d{3}-\d{3}-\d{4}$/,     // 123-456-7890
        /^\(\d{3}\)\d{3}-\d{4}$/,  // (123)456-7890
        /^\(\d{3}\) \d{3}-\d{4}$/, // (123) 456-7890
        /^\+1 \(\d{3}\) \d{3}-\d{4}$/ // +1 (123) 456-7890
    ];
    
    // Check if any pattern matches
    return patterns.some(pattern => pattern.test(cleaned));
}
