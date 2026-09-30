function validate(address) {
    // Check input type and empty/whitespace-only strings
    if (typeof address !== 'string') return false;
    if (address.trim().length === 0) return false;
    
    const trimmedAddress = address.trim();
    
    // Minimum and maximum length checks (reasonable bounds for a street address)
    if (trimmedAddress.length < 5) return false;
    if (trimmedAddress.length > 100) return false;
    
    // Must contain at least one digit (for house/building number)
    if (!/\d/.test(trimmedAddress)) return false;
    
    // Must contain at least one letter (for street name)
    if (!/[a-zA-Z]/.test(trimmedAddress)) return false;
    
    // Should not contain multiple consecutive spaces
    if (/\s{2,}/.test(trimmedAddress)) return false;
    
    // Should not start or end with punctuation (allowing common suffixes like "St." or "Ave.")
    // But check for clearly invalid starting/ending characters
    if (/^[.,;!?]/.test(trimmedAddress) || /[.,;!?]$/.test(trimmedAddress)) return false;
    
    // Basic pattern: typically starts with number, then space, then text
    // But also allow PO Boxes, apartment numbers, etc.
    // Common valid patterns:
    // 1. Starts with number (e.g., "123 Main St")
    // 2. Starts with "PO Box", "P.O. Box", etc.
    // 3. Starts with apartment indicator (e.g., "Apt 123", "Suite 100")
    
    const commonPatterns = [
        /^\d+\s+[a-zA-Z]/,                     // Starts with number then text
        /^[a-zA-Z]+\s+\d+/,                    // Starts with text then number (e.g., "PO Box 123")
        /^(apt|suite|unit|#|apartment|po\s*box|p\.o\.\s*box)\s+\d+/i, // Common prefixes
        /^\d+\s*[a-zA-Z]?\s*[-/#]?\s*\d*/,     // Complex numbers like "123-A", "123/456", "123B"
    ];
    
    // Check if address matches at least one common pattern
    const matchesPattern = commonPatterns.some(pattern => pattern.test(trimmedAddress));
    if (!matchesPattern) return false;
    
    // Should not contain obviously invalid characters (allow basic punctuation)
    const invalidChars = /[<>@#$%^&*()_+={}\[\]:;"'|\\`~]/.test(trimmedAddress);
    if (invalidChars) return false;
    
    // Allow common address abbreviations and suffixes
    const allowedSuffixes = /\b(st|street|ave|avenue|rd|road|dr|drive|ln|lane|blvd|boulevard|ct|court|pl|place|way|cir|circle|pike|sq|square|trl|trail|parkway|pkwy|terrace|ter|hwy|highway)\b/i;
    
    // Additional validation: should have at least 2 "parts" (number and street name)
    const parts = trimmedAddress.split(/\s+/);
    if (parts.length < 2) return false;
    
    return true;
}
