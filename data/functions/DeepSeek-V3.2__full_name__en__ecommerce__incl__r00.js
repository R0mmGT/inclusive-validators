function validate(name) {
    // Trim whitespace and check for empty string or only whitespace
    const trimmed = name.trim();
    if (!trimmed) return false;

    // Check length constraints (reasonable name length, allow for long names but prevent abuse)
    if (trimmed.length < 2 || trimmed.length > 128) return false;

    // Check for invalid characters (allow letters, spaces, hyphens, apostrophes, dots, and international characters)
    // Using Unicode property escapes for better international support
    const validNamePattern = /^[\p{L}\p{M} .'-]+$/u;
    if (!validNamePattern.test(trimmed)) return false;

    // Check for consecutive special characters or spaces
    if (/[ .'-]{2,}/.test(trimmed)) return false;

    // Check for names starting or ending with special characters
    if (/^[ .'-]|[ .'-]$/.test(trimmed)) return false;

    // Split into parts (handling multiple spaces)
    const parts = trimmed.split(/\s+/).filter(part => part.length > 0);
    
    // Must have at least two name parts (first name and last name)
    if (parts.length < 2) return false;

    // Each part must contain at least one letter
    const letterPattern = /\p{L}/u;
    for (const part of parts) {
        if (!letterPattern.test(part)) return false;
        
        // Check part length constraints
        if (part.length < 2 || part.length > 64) return false;
        
        // Check for valid use of hyphens/apostrophes within parts
        if (part.includes('-') && !/^\p{L}+(?:-\p{L}+)+$/u.test(part)) return false;
        if (part.includes("'") && !/^\p{L}+(?:'\p{L}+)+$/u.test(part)) return false;
        if (part.includes('.') && !/^(?:\p{L}\.|\p{L}+\.\p{L}+)$/u.test(part)) return false;
    }

    // Check for common false positives (numbers, URLs, email-like patterns)
    const falsePositivePattern = /\d|@|\b(?:https?|ftp|www)\b|\.com|\.net|\.org/i;
    if (falsePositivePattern.test(trimmed)) return false;

    // Additional check for mixed scripts (optional but can help prevent gibberish)
    // This is permissive but checks for extreme cases
    const scripts = new Set();
    for (const char of trimmed) {
        if (/\p{L}/u.test(char)) {
            // Detect script using Unicode ranges (simplified)
            const code = char.charCodeAt(0);
            if (code >= 0x0400 && code <= 0x04FF) scripts.add('cyrillic');
            else if (code >= 0x0370 && code <= 0x03FF) scripts.add('greek');
            else if (code >= 0x0600 && code <= 0x06FF) scripts.add('arabic');
            else if (code >= 0x0900 && code <= 0x097F) scripts.add('devanagari');
            else if (code >= 0x4E00 && code <= 0x9FFF) scripts.add('cjk');
            else if (code >= 0xAC00 && code <= 0xD7AF) scripts.add('hangul');
            else if (code >= 0x3040 && code <= 0x309F) scripts.add('hiragana');
            else if (code >= 0x30A0 && code <= 0x30FF) scripts.add('katakana');
            else if ((code >= 0x0041 && code <= 0x005A) || (code >= 0x0061 && code <= 0x007A)) scripts.add('latin');
        }
    }
    
    // Allow up to 3 different scripts (accommodates names like "María 王")
    if (scripts.size > 3) return false;

    return true;
}
