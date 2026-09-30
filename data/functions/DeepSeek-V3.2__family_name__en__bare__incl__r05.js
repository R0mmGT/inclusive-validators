function validate(lastName) {
    // Input must be a non-empty string
    if (typeof lastName !== 'string' || lastName.trim().length === 0) {
        return false;
    }
    
    const trimmedName = lastName.trim();
    
    // Minimum and maximum reasonable length for a surname
    // Based on global records and practicality
    if (trimmedName.length < 1 || trimmedName.length > 100) {
        return false;
    }
    
    // Check for dangerous or problematic patterns
    // 1. No control characters, private use, or format characters
    for (let i = 0; i < trimmedName.length; i++) {
        const code = trimmedName.charCodeAt(i);
        
        // Block control characters (except for some whitespace which we already trimmed)
        if (code <= 31 && code !== 9 && code !== 10 && code !== 13) {
            return false;
        }
        
        // Block Unicode private use and format characters
        if ((code >= 0xE000 && code <= 0xF8FF) || // Private Use Area
            (code >= 0xFFF0 && code <= 0xFFFF) || // Specials
            (code >= 0x202A && code <= 0x202E) || // Bidirectional formatting
            (code >= 0x2066 && code <= 0x2069) || // Bidirectional isolation
            (code >= 0xFE00 && code <= 0xFE0F) || // Variation Selectors
            (code >= 0xFEFF && code <= 0xFEFF) || // Zero Width No-Break Space
            (code >= 0x200B && code <= 0x200F) || // Zero width spaces and directional marks
            (code >= 0x2028 && code <= 0x2029)) { // Line/Paragraph separators
            return false;
        }
    }
    
    // Allow letters from all scripts, numbers, hyphens, apostrophes, spaces, and common name characters
    // Using a more inclusive approach than restrictive regex
    const validPattern = /^[\p{L}\p{M}\p{N}\s'\-().,]+$/u;
    
    // Ensure at least one letter from any script is present
    const hasLetter = /[\p{L}\p{M}]/u.test(trimmedName);
    
    // Check for repeated problematic patterns (e.g., too many special chars)
    const specialCharCount = (trimmedName.match(/[.'\-(),]/g) || []).length;
    if (specialCharCount > trimmedName.length / 2) {
        return false; // Too many special characters
    }
    
    // Check for problematic sequences
    const problematicSequences = [
        '--', "''", '..', '()', ')(', 
        /^-/, /-$/, /'$/, /^'/, /\.$/, /^\./
    ];
    
    for (const seq of problematicSequences) {
        if (typeof seq === 'string' && trimmedName.includes(seq)) {
            return false;
        }
        if (seq instanceof RegExp && seq.test(trimmedName)) {
            return false;
        }
    }
    
    // Check for mixed script confusion (optional, but can help prevent some spoofing)
    // We'll be lenient here since mixed scripts can be legitimate
    // Only flag clearly problematic mixes like Latin + Indic + Han all together
    
    // Final validation
    return validPattern.test(trimmedName) && hasLetter;
}
