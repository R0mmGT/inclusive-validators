function validate(phone) {
    // Remove any whitespace
    phone = phone.trim();
    
    // Check for empty string
    if (!phone) return false;
    
    // Pattern for US/Canada phone numbers:
    // Optional country code (1), optional parentheses around area code
    // Area code: 3 digits
    // Optional separator: space, dot, or dash
    // First 3 digits
    // Optional separator: space, dot, or dash  
    // Last 4 digits
    const patterns = [
        /^1?\s?\(\d{3}\)\s?\d{3}[-.\s]?\d{4}$/,      // 1 (123) 456-7890
        /^1?[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/,  // 1-123-456-7890 or 123-456-7890
        /^\d{10}$/,                                   // 1234567890
        /^1\s?\d{3}\s?\d{3}\s?\d{4}$/                // 1 123 456 7890
    ];
    
    // Check if any pattern matches
    for (let pattern of patterns) {
        if (pattern.test(phone)) {
            return true;
        }
    }
    
    return false;
}
