function validate(address) {
    // Check if input is a non-empty string
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmed = address.trim();
    
    // 1. Basic length sanity check (too short or excessively long)
    if (trimmed.length < 4 || trimmed.length > 200) {
        return false;
    }
    
    // 2. Should contain at least one digit (most addresses have a number)
    if (!/\d/.test(trimmed)) {
        return false;
    }
    
    // 3. Should contain at least two letters (for street name, locality, etc.)
    const letterMatches = trimmed.match(/[a-zA-Z\u00C0-\u017F]/g);
    if (!letterMatches || letterMatches.length < 2) {
        return false;
    }
    
    // 4. Should not consist only of numbers and basic punctuation
    if (/^[\d\s\-\.,]+$/.test(trimmed)) {
        return false;
    }
    
    // 5. Should have at least one space or common address separator
    if (!/[\s\-\/,]/.test(trimmed)) {
        return false;
    }
    
    // 6. Check for obviously invalid patterns (e.g., repeated characters, no meaningful words)
    const words = trimmed.split(/[\s\-\/,]+/).filter(w => w.length > 1);
    const meaningfulWords = words.filter(w => /[a-zA-Z\u00C0-\u017F]{2,}/.test(w));
    if (meaningfulWords.length < 1) {
        return false;
    }
    
    // 7. Basic profanity/obvious invalid content filter (example patterns)
    const invalidPatterns = [
        /test\s+address/i,
        /example\s+street/i,
        /asdfghjkl/i,
        /qwertyuiop/i,
        /xxxx+/i,
        /\b\d{10,}\b/ // Too many consecutive digits (likely not an address)
    ];
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) {
            return false;
        }
    }
    
    // 8. Allow only reasonable characters (alphanumeric, basic punctuation, unicode letters)
    if (/[<>{}[\]\\|`~]/.test(trimmed)) {
        return false;
    }
    
    // 9. Must not start or end with only punctuation
    if (/^[\/\-\.,\s]+/.test(trimmed) || /[\/\-\.,\s]+$/.test(trimmed)) {
        return false;
    }
    
    // 10. Should not contain URL-like patterns
    if (/(https?:\/\/|www\.)/i.test(trimmed)) {
        return false;
    }
    
    // If all checks pass
    return true;
}
