function validate(address) {
    // Check basic requirements
    if (typeof address !== 'string') return false;
    if (address.length < 5) return false;
    
    // Remove leading/trailing whitespace for validation
    const trimmed = address.trim();
    if (trimmed.length === 0) return false;
    
    // Must contain at least one number (for house/building number)
    if (!/\d/.test(trimmed)) return false;
    
    // Must contain at least one letter (for street name)
    if (!/[a-zA-Z]/.test(trimmed)) return false;
    
    // Common street address patterns (not exhaustive but covers major cases)
    const patterns = [
        // Standard: "123 Main St", "456 Oak Ave Apt 4B"
        /^\d+\s+[a-zA-Z0-9\s\.,#\-]+$/,
        // With unit/suite: "789 Pine Rd, Suite 100", "321 Elm St #5"
        /^\d+\s+[a-zA-Z0-9\s\.,#\-]+(?:,\s*(?:Apt|Suite|Unit|#|No\.?)\s*\S+)?$/,
        // PO Box addresses
        /^P\.?O\.?\s+Box\s+\d+/i,
        // Rural routes: "RR 2 Box 15", "HC 73 Box 123"
        /^(?:RR|RFD|HC)\s+\d+\s+Box\s+\d+/i,
    ];
    
    // Check if address matches any valid pattern
    for (const pattern of patterns) {
        if (pattern.test(trimmed)) {
            // Additional validation - must have minimum components
            const parts = trimmed.split(/\s+/);
            if (parts.length < 2) return false;
            
            // Ensure it doesn't contain obviously invalid content
            const invalidWords = /^(test|example|asdf|qwerty|12345|invalid)/i;
            if (invalidWords.test(trimmed)) return false;
            
            // Check for excessive special characters (more than allowed for addresses)
            const specialCharCount = (trimmed.match(/[^\w\s]/g) || []).length;
            if (specialCharCount > 5) return false;
            
            return true;
        }
    }
    
    return false;
}
