function validate(phoneString) {
    if (typeof phoneString !== 'string') {
        return false;
    }
    
    const trimmed = phoneString.trim();
    
    // Common phone number formats to support:
    // (123) 456-7890
    // 123-456-7890
    // 123.456.7890
    // 123 456 7890
    // +1 (123) 456-7890
    // +1-123-456-7890
    // 1234567890 (10 digits)
    
    // Remove all non-digit characters except leading plus sign
    const digitsOnly = trimmed.replace(/[^\d+]/g, '');
    
    // Check if it has a leading + (international format)
    if (digitsOnly.startsWith('+')) {
        // For international numbers, require at least 11 digits total (including country code)
        // and allow up to 15 digits (E.164 standard maximum)
        const withoutPlus = digitsOnly.substring(1);
        return /^\d{10,15}$/.test(withoutPlus);
    }
    
    // For domestic US numbers (without country code)
    const digits = digitsOnly.replace(/\D/g, '');
    
    // Must have exactly 10 digits
    if (!/^\d{10}$/.test(digits)) {
        return false;
    }
    
    // Check area code validity (first digit cannot be 0 or 1)
    const areaCode = digits.substring(0, 3);
    if (areaCode[0] === '0' || areaCode[0] === '1') {
        return false;
    }
    
    // Check exchange code validity (first digit cannot be 0 or 1)
    const exchangeCode = digits.substring(3, 6);
    if (exchangeCode[0] === '0' || exchangeCode[0] === '1') {
        return false;
    }
    
    // Additional validation: NANP restrictions
    // Area code cannot be in N11 format (NXX where middle digit is 1)
    if (areaCode[1] === '1') {
        return false;
    }
    
    return true;
}
