function validate(lastName) {
    // Check if input is a string
    if (typeof lastName !== 'string') {
        return false;
    }
    
    // Remove leading/trailing whitespace
    const trimmed = lastName.trim();
    
    // Check for empty string after trimming
    if (trimmed.length === 0) {
        return false;
    }
    
    // Check minimum and reasonable maximum length
    // Minimum of 1 character, maximum of 100 characters
    if (trimmed.length < 1 || trimmed.length > 100) {
        return false;
    }
    
    // Define a broad set of valid characters for global names
    const validPattern = /^[\p{L}\p{M}\s\-'.]+$/u;
    
    // Test the pattern
    if (!validPattern.test(trimmed)) {
        return false;
    }
    
    // Check for reasonable name structure
    const invalidPatterns = [
        /^\s+$/,                         // Only whitespace
        /^[\.\-'\s]+$/,                  // Only separators/punctuation
        /\.{2,}/,                        // Multiple consecutive dots
        /'{2,}/,                         // Multiple consecutive apostrophes
        /-{2,}/,                         // Multiple consecutive hyphens
        /\s{2,}/                         // Multiple consecutive spaces
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) {
            return false;
        }
    }
    
    // Additional contextual validations
    
    // Check for mixed script (optional, can be commented out if too restrictive)
    // This helps prevent random character combinations while still allowing legitimate names
    const scripts = new Set();
    for (const char of trimmed) {
        const codePoint = char.codePointAt(0);
        // Simple script detection (approximate)
        if ((codePoint >= 0x0041 && codePoint <= 0x007A) || // Basic Latin
            (codePoint >= 0x00C0 && codePoint <= 0x024F)) { // Latin Extended
            scripts.add('latin');
        } else if (codePoint >= 0x0400 && codePoint <= 0x04FF) { // Cyrillic
            scripts.add('cyrillic');
        } else if (codePoint >= 0x0370 && codePoint <= 0x03FF) { // Greek
            scripts.add('greek');
        } else if (codePoint >= 0x0600 && codePoint <= 0x06FF) { // Arabic
            scripts.add('arabic');
        } else if (codePoint >= 0x0900 && codePoint <= 0x097F) { // Devanagari
            scripts.add('devanagari');
        } else if (codePoint >= 0x4E00 && codePoint <= 0x9FFF) { // CJK Unified Ideographs
            scripts.add('cjk');
        } else if (codePoint >= 0xAC00 && codePoint <= 0xD7AF) { // Hangul Syllables
            scripts.add('hangul');
        } else if (codePoint >= 0x3040 && codePoint <= 0x309F) { // Hiragana
            scripts.add('hiragana');
        } else if (codePoint >= 0x30A0 && codePoint <= 0x30FF) { // Katakana
            scripts.add('katakana');
        }
    }
    
    // If we detect more than 3 different scripts, it's likely invalid
    if (scripts.size > 3) {
        return false;
    }
    
    // Check for common problematic patterns
    const problematicPatterns = [
        /123/,                          // Numbers
        /test/i,                        // Test strings
        /admin/i,                       // Admin strings
        /root/i,                        // System references
        /<script/i,                     // Script tags
        /SELECT|INSERT|UPDATE|DELETE/i, // SQL keywords
        /javascript:/i                  // JavaScript protocol
    ];
    
    for (const pattern of problematicPatterns) {
        if (pattern.test(trimmed)) {
            return false;
        }
    }
    
    // Allow all other names
    return true;
}
