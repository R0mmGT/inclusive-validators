function validate(postalCode) {
    // Check if input is a string
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    // Remove all whitespace
    const cleanedCode = postalCode.replace(/\s+/g, '');
    
    // Check length requirements (5 digits for standard US ZIP codes)
    if (cleanedCode.length !== 5 && cleanedCode.length !== 9) {
        return false;
    }
    
    // Check if all characters are digits
    if (!/^\d+$/.test(cleanedCode)) {
        return false;
    }
    
    // For 9-digit codes (ZIP+4 format), ensure format is either 9 consecutive digits
    // or has a hyphen after 5 digits (we already removed whitespace)
    if (cleanedCode.length === 9) {
        return /^\d{9}$/.test(cleanedCode);
    }
    
    // For 5-digit codes
    return /^\d{5}$/.test(cleanedCode);
}
