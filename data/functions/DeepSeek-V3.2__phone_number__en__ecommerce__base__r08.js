function validate(phone) {
    // Handle null/undefined/empty input
    if (typeof phone !== 'string' || !phone.trim()) {
        return false;
    }
    
    const trimmedPhone = phone.trim();
    
    // Common phone number patterns:
    // 1. (XXX) XXX-XXXX
    // 2. XXX-XXX-XXXX
    // 3. XXX.XXX.XXXX
    // 4. XXXXXXXXXX (10 digits)
    // 5. +1 XXX XXX XXXX (international US format)
    // 6. 1-XXX-XXX-XXXX
    
    // Remove all non-digit characters except leading +
    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    
    // Check if it starts with US country code but has extra numbers
    if ((trimmedPhone.startsWith('+1') || trimmedPhone.startsWith('1-')) && digitsOnly.length === 11) {
        // Remove leading '1' for US country code
        const withoutCountryCode = digitsOnly.substring(1);
        return /^\d{10}$/.test(withoutCountryCode);
    }
    
    // Check for exactly 10 digits
    if (digitsOnly.length !== 10) {
        return false;
    }
    
    // Validate common formats
    const patterns = [
        /^\(\d{3}\) \d{3}-\d{4}$/,          // (123) 456-7890
        /^\d{3}-\d{3}-\d{4}$/,             // 123-456-7890
        /^\d{3}\.\d{3}\.\d{4}$/,           // 123.456.7890
        /^\d{10}$/,                        // 1234567890
        /^\d{3} \d{3} \d{4}$/              // 123 456 7890
    ];
    
    // Check if the trimmed phone matches any valid pattern
    return patterns.some(pattern => pattern.test(trimmedPhone));
}
