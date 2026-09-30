function validate(address) {
    // Basic validation: non-empty, reasonable length, and contains expected address elements
    if (typeof address !== 'string') return false;
    
    const trimmed = address.trim();
    
    // Empty string or too short/too long for valid address
    if (trimmed.length === 0 || trimmed.length < 5 || trimmed.length > 100) return false;
    
    // Should contain at least one digit (for house/building number)
    if (!/\d/.test(trimmed)) return false;
    
    // Should contain at least one letter
    if (!/[a-zA-Z]/.test(trimmed)) return false;
    
    // Should not contain obviously invalid patterns
    const invalidPatterns = [
        /^[^a-zA-Z0-9]+$/, // Only special characters
        /^\d+$/, // Only numbers
        /^[a-zA-Z]+$/, // Only letters
        /test.*address/i, // Test addresses
        /example.*address/i, // Example addresses
        /^\s*\.+\s*$/, // Only dots
        /script:/i, // Script injection attempt
        /<.*>/, // HTML tags
        /\b(p\.?o\.?\s*box|post\s*office\s*box)\b/i // PO boxes (optional, depending on requirements)
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) return false;
    }
    
    // Basic format validation: should have number followed by street name pattern
    // This regex looks for: optional unit/apt, then number, then space, then text with possible directions/suffixes
    const addressPatterns = [
        /^\d+\s+\w+/, // Basic: number followed by word
        /^\d+\s+\w+\s+\w+/, // Number followed by multiple words
        /^(apt|unit|suite|#)\s*\d*\s*[\w\s]+/i, // Unit/Apt then address
        /^\d+\s+[nsew]\s+\w+/i, // Number with directional prefix
        /^\d+[a-zA-Z]?\s+\w+/ // Number with optional letter suffix (e.g., 123A Main)
    ];
    
    // Check if at least one valid address pattern matches
    for (const pattern of addressPatterns) {
        if (pattern.test(trimmed)) return true;
    }
    
    // Additional check for addresses that start with building name then number
    const buildingFirstPattern = /^[\w\s]+\s+\d+/;
    if (buildingFirstPattern.test(trimmed) && /\d+\s*[\w\s]+$/.test(trimmed)) {
        return true;
    }
    
    return false;
}
