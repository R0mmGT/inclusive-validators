function validate(address) {
    // Check if input is a non-empty string
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmed = address.trim();
    
    // Basic length constraints (reasonable for street addresses)
    if (trimmed.length < 5 || trimmed.length > 100) {
        return false;
    }
    
    // Must contain at least one digit (for house/building number)
    if (!/\d/.test(trimmed)) {
        return false;
    }
    
    // Must contain at least one letter (for street name)
    if (!/[a-zA-Z]/.test(trimmed)) {
        return false;
    }
    
    // Should not contain obviously invalid patterns
    const invalidPatterns = [
        /^[^a-zA-Z0-9]+$/, // Only symbols
        /^\d+$/, // Only numbers
        /^[a-zA-Z\s]+$/, // Only letters and spaces (no numbers)
        /test.*street/i, // Common test patterns
        /example.*address/i,
        /xxx|xxx\s+street|fake|dummy/i // Obvious fake indicators
    ];
    
    if (invalidPatterns.some(pattern => pattern.test(trimmed))) {
        return false;
    }
    
    // Should have reasonable word count (2-8 words typical for addresses)
    const words = trimmed.split(/\s+/).filter(word => word.length > 0);
    if (words.length < 2 || words.length > 10) {
        return false;
    }
    
    // Check for excessive special characters
    const specialCharCount = (trimmed.match(/[^\w\s]/g) || []).length;
    if (specialCharCount > 5) {
        return false;
    }
    
    // Check for consecutive special characters
    if (/[^\w\s]{2,}/.test(trimmed)) {
        return false;
    }
    
    // Basic address format validation (number typically comes first or last)
    // Common patterns: "123 Main St", "Main St 123", "123 Main St Apt 4B"
    const addressRegex = /^(\d+\s+[a-zA-Z0-9\s.,'-]+|[a-zA-Z0-9\s.,'-]+\s+\d+)$/;
    if (!addressRegex.test(trimmed)) {
        return false;
    }
    
    return true;
}
