function validate(phoneNumber) {
    // Remove all whitespace characters
    const cleaned = phoneNumber.replace(/\s+/g, '');
    
    // Check if it's a 10-digit number without country code
    const tenDigitPattern = /^\d{10}$/;
    if (tenDigitPattern.test(cleaned)) {
        return true;
    }
    
    // Check for US/Canada format with country code (+1)
    const usCanadaPattern = /^\+1\d{10}$/;
    if (usCanadaPattern.test(cleaned)) {
        return true;
    }
    
    // Check for common separators: (123) 456-7890 or 123-456-7890
    const separatorPattern = /^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
    if (separatorPattern.test(phoneNumber)) {
        return true;
    }
    
    // Check for country code with separators: +1 (123) 456-7890
    const usSeparatorPattern = /^\+1\s*(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
    if (usSeparatorPattern.test(phoneNumber)) {
        return true;
    }
    
    // Check for optional + and country code (1-3 digits) followed by 10 digits
    const internationalPattern = /^\+\d{1,3}\s*(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
    if (internationalPattern.test(phoneNumber)) {
        return true;
    }
    
    return false;
}
