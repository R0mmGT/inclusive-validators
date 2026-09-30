function validate(name) {
    // Trim whitespace and check minimum length
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed.length > 255) {
        return false;
    }
    
    // Check for presence of at least one letter (any script)
    if (!/\p{L}/u.test(trimmed)) {
        return false;
    }
    
    // Split into parts
    const parts = trimmed.split(/\s+/);
    if (parts.length < 1 || parts.length > 7) {
        return false;
    }
    
    // Validate each part
    for (let part of parts) {
        // Each part must contain at least one letter
        if (!/\p{L}/u.test(part)) {
            return false;
        }
        
        // Check for invalid patterns
        // Repeating dots or apostrophes
        if (/\.{2,}/.test(part) || /'{2,}/.test(part)) {
            return false;
        }
        
        // Check for mixed scripts in a single part (optional but prevents some garbled input)
        // This is commented out as it might reject legitimate names in some contexts
        /*
        const scripts = [];
        for (let char of part) {
            const script = getScript(char);
            if (script && !scripts.includes(script)) {
                scripts.push(script);
            }
        }
        if (scripts.length > 2) { // Allow mixing with Latin (common in transliterations)
            return false;
        }
        */
        
        // Check length of individual part
        if (part.length < 1 || part.length > 70) {
            return false;
        }
        
        // Valid characters: letters, apostrophes, hyphens, dots, spaces (already split)
        // Also includes various Unicode dashes and apostrophe-like characters
        if (!/^[\p{L}\p{M}'’ʼ‘‚‛.-]+$/u.test(part) && 
            !/^[\p{L}\p{M}][\p{L}\p{M}'’ʼ‘‚‛.-]*[\p{L}\p{M}]$/u.test(part)) {
            return false;
        }
    }
    
    // Check for repeating parts (like "John John")
    const uniqueParts = [...new Set(parts.map(p => p.toLowerCase()))];
    if (uniqueParts.length < parts.length) {
        return false;
    }
    
    // Additional pattern checks
    // No standalone initials unless part of multiple parts
    if (parts.length === 1 && /^\p{L}\.?$/u.test(trimmed)) {
        return false;
    }
    
    // Check for valid name patterns
    // At least one part should be more than 1 character (not all single initials)
    const longParts = parts.filter(p => p.length > 1 && /\p{L}{2,}/u.test(p));
    if (longParts.length === 0) {
        return false;
    }
    
    // No consecutive special characters
    if (/['’ʼ‘‚‛.-]{2,}/u.test(trimmed)) {
        return false;
    }
    
    // No name should start or end with special characters (except dots for initials)
    for (let part of parts) {
        if (/^['’ʼ‘‚‛-]/.test(part) || /['’ʼ‘‚‛-]$/.test(part)) {
            return false;
        }
    }
    
    return true;
}

// Helper function to get Unicode script (optional, commented out above)
/*
function getScript(char) {
    const code = char.charCodeAt(0);
    if (code >= 0x0041 && code <= 0x007A) return 'Latin';
    if (code >= 0x0400 && code <= 0x04FF) return 'Cyrillic';
    if (code >= 0x0370 && code <= 0x03FF) return 'Greek';
    if (code >= 0x0600 && code <= 0x06FF) return 'Arabic';
    if (code >= 0x0590 && code <= 0x05FF) return 'Hebrew';
    if (code >= 0x0900 && code <= 0x097F) return 'Devanagari';
    if (code >= 0x4E00 && code <= 0x9FFF) return 'Han';
    if (code >= 0x3040 && code <= 0x309F) return 'Hiragana';
    if (code >= 0x30A0 && code <= 0x30FF) return 'Katakana';
    if (code >= 0xAC00 && code <= 0xD7AF) return 'Hangul';
    // Add more scripts as needed
    return null;
}
*/
