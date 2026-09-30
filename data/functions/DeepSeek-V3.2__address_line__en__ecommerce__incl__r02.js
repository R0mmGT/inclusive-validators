function validate(address) {
    if (typeof address !== 'string') {
        return false;
    }
    
    // Trim whitespace from both ends
    const trimmed = address.trim();
    
    // Basic validation checks
    if (trimmed.length === 0) {
        return false;
    }
    
    // Minimum and maximum length constraints
    if (trimmed.length < 3 || trimmed.length > 200) {
        return false;
    }
    
    // Check for at least one alphanumeric character (including international scripts)
    const hasMeaningfulContent = /[\p{L}\p{N}]/u.test(trimmed);
    if (!hasMeaningfulContent) {
        return false;
    }
    
    // Check for common invalid patterns
    const invalidPatterns = [
        // Only special characters or punctuation
        /^[^\p{L}\p{N}]+$/u,
        // Excessive repeated characters (e.g., "aaaaaaa" or "123-------")
        /(.)\1{10,}/,
        // Common placeholder or test patterns
        /^(?:test|example|asdf|qwerty|abc|xyz|123|address|street)(?:\s+|$)/i,
        // Excessive spaces or control characters
        /\s{10,}|\p{C}/u
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) {
            return false;
        }
    }
    
    // Check structure: should have some variation (not all identical words)
    const words = trimmed.split(/\s+/).filter(word => /[\p{L}\p{N}]/u.test(word));
    if (words.length < 1) {
        return false;
    }
    
    // Additional structural checks for more realistic addresses
    const hasLikelyAddressComponents = 
        // Contains a number (for house/building number)
        /\p{N}/u.test(trimmed) ||
        // Contains common address indicators in various languages
        /\b(?:strasse|straße|avenue|ave|street|st|road|rd|lane|ln|drive|dr|boulevard|blvd|way|plaza|plz|square|sq|alley|aly|route|rt|expressway|expwy|freeway|fwy|tunnel|tunl|bridge|brg)\b/iu.test(trimmed) ||
        // Contains common address words in various scripts
        /[\p{L}]{2,}\s+[\p{L}]{2,}/u.test(trimmed) ||
        // Contains number followed by text or text followed by number
        /\p{N}[^\p{N}]{2,}|[^\p{N}]{2,}\p{N}/u.test(trimmed);
    
    return hasLikelyAddressComponents;
}
