function validate(address) {
    // Basic type and existence check
    if (typeof address !== 'string' || address.trim() === '') {
        return false;
    }
    
    const trimmed = address.trim();
    
    // Check for minimum and maximum reasonable length
    // Too short might be incomplete, too long might be malicious
    if (trimmed.length < 5 || trimmed.length > 200) {
        return false;
    }
    
    // Should contain at least some letters or numbers
    // to avoid pure punctuation/symbol strings
    const hasAlphanumeric = /[a-zA-Z0-9]/.test(trimmed);
    if (!hasAlphanumeric) {
        return false;
    }
    
    // Should not be just whitespace characters
    if (/^\s+$/.test(trimmed)) {
        return false;
    }
    
    // Check for excessive repeated characters which might indicate spam
    const excessiveRepeats = /(.)\1{10,}/.test(trimmed);
    if (excessiveRepeats) {
        return false;
    }
    
    // Check for potentially malicious patterns
    // Multiple URLs or email addresses might indicate spam
    const urlPattern = /https?:\/\/[^\s]+|www\.[^\s]+/gi;
    const urlMatches = trimmed.match(urlPattern);
    if (urlMatches && urlMatches.length > 2) {
        return false;
    }
    
    const emailPattern = /\S+@\S+\.\S+/g;
    const emailMatches = trimmed.match(emailPattern);
    if (emailMatches && emailMatches.length > 2) {
        return false;
    }
    
    // Check for excessive special characters (might be code injection attempt)
    const specialCharRatio = (trimmed.match(/[^\w\s]/g) || []).length / trimmed.length;
    if (specialCharRatio > 0.5) { // More than 50% special characters
        return false;
    }
    
    // Check for newlines or tabs (single line address shouldn't have these)
    if (/[\n\r\t]/.test(trimmed)) {
        return false;
    }
    
    // Check for control characters (excluding normal whitespace)
    if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(trimmed)) {
        return false;
    }
    
    // Should have at least one number (house/building number)
    // This is common in most address formats worldwide
    const hasNumber = /\d/.test(trimmed);
    if (!hasNumber) {
        // Some addresses might not have numbers (like "Rural Route 5")
        // But for an online store, having a number is usually important
        // We'll be lenient but warn about this edge case in documentation
    }
    
    return true;
}
