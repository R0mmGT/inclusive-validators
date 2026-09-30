function validate(address) {
    // Input must be a non-empty string
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Basic length validation
    if (trimmedAddress.length < 3 || trimmedAddress.length > 200) {
        return false;
    }
    
    // Should contain at least some alphanumeric characters
    if (!/[a-zA-Z0-9]/.test(trimmedAddress)) {
        return false;
    }
    
    // Should not contain obviously invalid patterns
    const invalidPatterns = [
        /^test\b/i,
        /^example\b/i,
        /^xyz\b/i,
        /^aaa\b/i,
        /^123\b/i,
        /^\d+$/ // Only numbers
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedAddress)) {
            return false;
        }
    }
    
    // Check for excessive repetition (e.g., "aaaaaaa", "111111")
    if (/([a-zA-Z0-9])\1{5,}/.test(trimmedAddress)) {
        return false;
    }
    
    // Should have a reasonable structure for international addresses
    // At minimum: should contain some non-whitespace characters and not be just symbols
    const alphanumericCount = (trimmedAddress.match(/[a-zA-Z0-9]/g) || []).length;
    const symbolCount = (trimmedAddress.match(/[^\w\s]/g) || []).length;
    
    // Ensure there are more alphanumeric characters than just symbols
    if (alphanumericCount === 0 || symbolCount > alphanumericCount * 2) {
        return false;
    }
    
    // Accept a wide range of international characters
    // Allows letters from various scripts, numbers, common separators and symbols
    const validPattern = /^[\p{L}\p{N}\s\-\/\\.,#'°"`´+*&@!?();:\[\]{}§$€£¥©®™~|¦=±×÷^_<>%±]+$/u;
    
    if (!validPattern.test(trimmedAddress)) {
        return false;
    }
    
    // Ensure the address isn't just whitespace or control characters
    if (/^[\s\p{C}]+$/u.test(trimmedAddress)) {
        return false;
    }
    
    return true;
}
