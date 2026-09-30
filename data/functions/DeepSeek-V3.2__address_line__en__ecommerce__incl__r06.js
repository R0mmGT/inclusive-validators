function validate(address) {
    if (typeof address !== 'string') return false;
    
    const trimmed = address.trim();
    if (trimmed.length === 0) return false;
    
    // Basic sanity checks
    // 1. Address should have reasonable length (global standard)
    if (trimmed.length < 4 || trimmed.length > 200) return false;
    
    // 2. Should contain at least some alphanumeric characters
    //    (not just symbols or whitespace)
    const hasAlphanumeric = /[a-zA-Z0-9]/.test(trimmed);
    if (!hasAlphanumeric) return false;
    
    // 3. Should not consist entirely of numbers (not a valid street address)
    const onlyNumbers = /^\d+$/.test(trimmed.replace(/\s/g, ''));
    if (onlyNumbers) return false;
    
    // 4. Should not contain obviously invalid patterns
    const invalidPatterns = [
        /test\s*(address)?/i,
        /example\s*(address)?/i,
        /asdfghjkl/i,
        /qwertyuiop/i,
        /1234567890/,
        /aaaaaaaa+/i,
        /xxxxxx+/i,
        /^\s*\.+\s*$/, // Only dots
        /^\s*\-+\s*$/, // Only dashes
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) return false;
    }
    
    // 5. Should have reasonable structure
    //    - At least one letter (in any script) or number followed by more content
    //    - Allow for international characters
    const hasValidStructure = /[\p{L}\p{N}].*[\p{L}\p{N}]/u.test(trimmed);
    if (!hasValidStructure) return false;
    
    // 6. Check for minimum number of meaningful characters
    //    (excluding excessive whitespace, punctuation)
    const meaningfulChars = trimmed.replace(/[\s\p{P}]/gu, '');
    if (meaningfulChars.length < 3) return false;
    
    // 7. Should not contain excessive repeated characters (likely spam)
    const hasExcessiveRepeats = /(.)\1{10,}/.test(trimmed);
    if (hasExcessiveRepeats) return false;
    
    // 8. Should not contain dangerous patterns (potential script injection)
    const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /data:/i,
        /on\w+\s*=/i,
        /vbscript:/i,
        /expression\s*\(/i,
        /<\?php/i,
        /<\/?\w+[^>]*>/i, // HTML tags
    ];
    
    for (const pattern of dangerousPatterns) {
        if (pattern.test(trimmed)) return false;
    }
    
    return true;
}
