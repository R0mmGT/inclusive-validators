function validate(phoneStr) {
    // Remove any whitespace from the input
    const cleaned = phoneStr.replace(/\s+/g, '');
    
    // Common regex patterns for phone number validation
    const patterns = [
        // +1-XXX-XXX-XXXX (international US/Canada)
        /^\+1\d{10}$/,
        // 1-XXX-XXX-XXXX (domestic with country code)
        /^1\d{10}$/,
        // XXX-XXX-XXXX (domestic without country code)
        /^\d{10}$/,
        // With common separators: (XXX) XXX-XXXX or XXX-XXX-XXXX
        /^\(\d{3}\)\d{3}-\d{4}$/,
        // +1 (XXX) XXX-XXXX
        /^\+1\(\d{3}\)\d{3}-\d{4}$/,
        // With dots: XXX.XXX.XXXX
        /^\d{3}\.\d{3}\.\d{4}$/,
        // With spaces: XXX XXX XXXX or XXX XXX XXXX
        /^\d{3} \d{3} \d{4}$/,
        // +1 XXX XXX XXXX
        /^\+1 \d{3} \d{3} \d{4}$/
    ];
    
    // Check if the cleaned string matches any pattern
    for (const pattern of patterns) {
        if (pattern.test(cleaned)) {
            return true;
        }
    }
    
    // Also check the original string (in case it had valid formatting with spaces)
    for (const pattern of patterns) {
        if (pattern.test(phoneStr)) {
            return true;
        }
    }
    
    return false;
}
