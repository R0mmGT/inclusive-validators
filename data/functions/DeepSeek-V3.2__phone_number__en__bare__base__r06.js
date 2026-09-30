function validate(phone) {
    // Trim whitespace from beginning and end
    phone = phone.trim();
    
    // If empty string, return false
    if (phone.length === 0) return false;
    
    // Define patterns for valid phone numbers
    const patterns = [
        // (123) 456-7890 or (123)456-7890
        /^\(\d{3}\)\s?\d{3}-\d{4}$/,
        
        // 123-456-7890
        /^\d{3}-\d{3}-\d{4}$/,
        
        // 123.456.7890
        /^\d{3}\.\d{3}\.\d{4}$/,
        
        // 123 456 7890
        /^\d{3}\s\d{3}\s\d{4}$/,
        
        // 1234567890 (10 digits without separators)
        /^\d{10}$/,
        
        // +1 (123) 456-7890
        /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}-\d{4}$/,
        
        // 1-123-456-7890
        /^\d{1}-\d{3}-\d{3}-\d{4}$/,
        
        // +11234567890 (E.164 format without separators)
        /^\+\d{11,15}$/,
        
        // 1 (123) 456-7890
        /^\d{1}\s?\(\d{3}\)\s?\d{3}-\d{4}$/,
        
        // 1.123.456.7890
        /^\d{1}\.\d{3}\.\d{3}\.\d{4}$/
    ];
    
    // Check if phone matches any valid pattern
    for (let pattern of patterns) {
        if (pattern.test(phone)) {
            // Additional validation for North American numbers
            if (phone.includes('+1') || phone.match(/^1[-\s\.(]/) || phone.match(/^\(\d{3}\)/)) {
                // Extract digits only for area code validation
                const digits = phone.replace(/\D/g, '');
                // If it's a US/Canada number with country code 1
                if (digits.startsWith('1') && digits.length === 11) {
                    const areaCode = digits.substring(1, 4);
                    // Valid area codes are 200-999 (excluding specific reserved ranges)
                    const areaCodeNum = parseInt(areaCode, 10);
                    if (areaCodeNum < 200 || areaCodeNum > 999) return false;
                }
            }
            return true;
        }
    }
    
    return false;
}
