function validate(phoneString) {
    if (typeof phoneString !== 'string' || phoneString.trim() === '') {
        return false;
    }
    
    const cleaned = phoneString.replace(/\s+/g, '');
    
    const patterns = [
        /^\+1\d{10}$/,           // +11234567890
        /^1\d{10}$/,             // 11234567890
        /^\d{10}$/,              // 1234567890
        /^\(\d{3}\)\d{3}-\d{4}$/, // (123)456-7890
        /^\d{3}-\d{3}-\d{4}$/,   // 123-456-7890
        /^\d{3}\.\d{3}\.\d{4}$/, // 123.456.7890
        /^\+\d{11,15}$/          // +44...
    ];
    
    return patterns.some(pattern => pattern.test(cleaned));
}
