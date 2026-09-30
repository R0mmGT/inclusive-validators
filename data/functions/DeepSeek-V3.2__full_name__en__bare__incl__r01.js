function validate(name) {
    if (typeof name !== 'string') return false;
    
    const trimmedName = name.trim();
    
    // Basic validation
    if (trimmedName.length < 2) return false;
    if (trimmedName.length > 150) return false; // Reasonable max length for names
    
    // Check for minimum requirements: should contain letters and may contain certain special characters
    const containsLetters = /[\p{L}]/u.test(trimmedName);
    if (!containsLetters) return false;
    
    // Check for invalid characters
    // Allow letters (including all Unicode letters), spaces, hyphens, apostrophes, periods, and commas
    const validCharsRegex = /^[\p{L}\s\-\'\.\,]+$/u;
    if (!validCharsRegex.test(trimmedName)) return false;
    
    // Check for consecutive special characters or special characters at start/end
    const invalidPatterns = [
        /^[\s\-\'\.\,]/,  // Starts with special character
        /[\s\-\'\.\,]$/,  // Ends with special character
        /[\s\-\'\.\,]{2,}/ // Consecutive special characters
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedName)) return false;
    }
    
    // Check that there are at least 2 name parts (at least first and last name)
    const nameParts = trimmedName.split(/[\s]+/).filter(part => part.length > 0);
    
    // Some cultures may have single-word names, but for a "full name" we typically expect at least 2 parts
    if (nameParts.length < 2) return false;
    
    // Check each part has at least one letter and reasonable length
    for (const part of nameParts) {
        const cleanPart = part.replace(/[\-\'\.\,]/g, ''); // Remove allowed special chars
        if (cleanPart.length < 1) return false;
        if (cleanPart.length > 70) return false; // Individual part shouldn't be too long
        if (!/[\p{L}]/u.test(cleanPart)) return false; // Each part should have at least one letter
    }
    
    // Check for mixed script usage that might indicate gibberish
    const scripts = [];
    for (const char of trimmedName) {
        if (/\p{L}/u.test(char)) {
            const script = getScript(char);
            if (script && !scripts.includes(script)) {
                scripts.push(script);
            }
        }
    }
    
    // If multiple scripts are detected, ensure they're commonly mixed (like Latin + Japanese)
    if (scripts.length > 1) {
        const commonMixes = [
            ['Latin', 'Hiragana'],
            ['Latin', 'Katakana'],
            ['Latin', 'Han'],
            ['Hiragana', 'Katakana'],
            ['Hiragana', 'Han'],
            ['Katakana', 'Han']
        ];
        
        let isCommonMix = false;
        for (const [script1, script2] of commonMixes) {
            if (scripts.includes(script1) && scripts.includes(script2)) {
                isCommonMix = true;
                break;
            }
        }
        
        if (!isCommonMix && scripts.length > 2) {
            return false;
        }
    }
    
    return true;
}

// Helper function to detect script of a character
function getScript(char) {
    const code = char.codePointAt(0);
    
    // Latin
    if ((code >= 0x0041 && code <= 0x005A) || 
        (code >= 0x0061 && code <= 0x007A) ||
        (code >= 0x00C0 && code <= 0x00FF) ||
        (code >= 0x0100 && code <= 0x017F) ||
        (code >= 0x0180 && code <= 0x024F)) {
        return 'Latin';
    }
    
    // Cyrillic
    if ((code >= 0x0400 && code <= 0x04FF) || 
        (code >= 0x0500 && code <= 0x052F)) {
        return 'Cyrillic';
    }
    
    // Greek
    if (code >= 0x0370 && code <= 0x03FF) return 'Greek';
    
    // Hebrew
    if (code >= 0x0590 && code <= 0x05FF) return 'Hebrew';
    
    // Arabic
    if ((code >= 0x0600 && code <= 0x06FF) || 
        (code >= 0x0750 && code <= 0x077F) ||
        (code >= 0x08A0 && code <= 0x08FF)) {
        return 'Arabic';
    }
    
    // Devanagari
    if (code >= 0x0900 && code <= 0x097F) return 'Devanagari';
    
    // Bengali
    if (code >= 0x0980 && code <= 0x09FF) return 'Bengali';
    
    // Chinese, Japanese, Korean (CJK Unified Ideographs)
    if ((code >= 0x4E00 && code <= 0x9FFF) || 
        (code >= 0x3400 && code <= 0x4DBF)) {
        return 'Han';
    }
    
    // Hiragana
    if (code >= 0x3040 && code <= 0x309F) return 'Hiragana';
    
    // Katakana
    if (code >= 0x30A0 && code <= 0x30FF) return 'Katakana';
    
    // Korean Hangul
    if (code >= 0xAC00 && code <= 0xD7AF) return 'Hangul';
    
    // Thai
    if (code >= 0x0E00 && code <= 0x0E7F) return 'Thai';
    
    // Georgian
    if (code >= 0x10A0 && code <= 0x10FF) return 'Georgian';
    
    // Armenian
    if (code >= 0x0530 && code <= 0x058F) return 'Armenian';
    
    return null;
}
