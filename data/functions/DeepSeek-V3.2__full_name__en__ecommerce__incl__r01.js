function validate(name) {
    // Check if input is a non-empty string
    if (typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Check for excessive length (practical limit while being generous)
    if (trimmedName.length > 200) {
        return false;
    }
    
    // Check for presence of at least one letter character
    if (!/[A-Za-z\u00C0-\u024F\u0400-\u04FF\u0370-\u03FF\u0600-\u06FF\u4E00-\u9FFF\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/.test(trimmedName)) {
        return false;
    }
    
    // Split by common separators: spaces, hyphens, apostrophes, periods (for initials)
    const parts = trimmedName.split(/[\s\-'.]+/).filter(part => part.length > 0);
    
    // Must have at least 2 parts for a full name (given name + family name)
    if (parts.length < 2) {
        return false;
    }
    
    // Check each part
    for (const part of parts) {
        // Each part should contain valid name characters
        // Allow letters, some special characters common in names, and various scripts
        if (!/^[\p{L}\p{M}'\-\.]+$/u.test(part)) {
            return false;
        }
        
        // Should not consist only of special characters
        if (/^[\-'\.]+$/.test(part)) {
            return false;
        }
        
        // Should have at least one letter
        if (!/\p{L}/u.test(part)) {
            return false;
        }
        
        // Check for excessive repetition (like "aaaaaaa")
        if (/([A-Za-z])\1{4,}/.test(part)) {
            return false;
        }
        
        // Check for suspicious patterns (like "test123")
        if (/[0-9]/.test(part)) {
            return false;
        }
    }
    
    // Check for obviously fake names
    const lowerName = trimmedName.toLowerCase();
    const fakePatterns = [
        'test', 'example', 'admin', 'user', 'fake', 'asdf', 'qwerty', 
        'xxxx', 'aaaa', 'abc', '123', 'no name', 'your name', 'full name'
    ];
    
    for (const pattern of fakePatterns) {
        if (lowerName.includes(pattern)) {
            return false;
        }
    }
    
    // Allow names with initials (like "J. R. R. Tolkien")
    // Count parts that are single letters (potentially initials)
    const singleLetterParts = parts.filter(part => part.length === 1 && /[A-Za-z]/.test(part)).length;
    const nonInitialParts = parts.length - singleLetterParts;
    
    // Must have at least 2 non-initial parts OR at least 1 non-initial part with at least 2 initials
    if (nonInitialParts < 1) {
        return false;
    }
    
    // Reject names that look like email addresses or URLs
    if (trimmedName.includes('@') || trimmedName.includes('://') || trimmedName.includes('www.')) {
        return false;
    }
    
    // Reject names with excessive special characters
    const specialCharCount = (trimmedName.match(/[^\p{L}\p{M}\s\-'.]/gu) || []).length;
    if (specialCharCount > 3) {
        return false;
    }
    
    // Additional validation for mixed script names (optional but helpful)
    // Check if name contains characters from multiple different scripts
    const scripts = new Set();
    for (const char of trimmedName) {
        const code = char.charCodeAt(0);
        if (char.match(/\p{L}/u)) {
            // Rough script detection
            if (code >= 0x4E00 && code <= 0x9FFF) scripts.add('cjk');
            else if (code >= 0x0400 && code <= 0x04FF) scripts.add('cyrillic');
            else if (code >= 0x0370 && code <= 0x03FF) scripts.add('greek');
            else if (code >= 0x0600 && code <= 0x06FF) scripts.add('arabic');
            else if (code >= 0x0900 && code <= 0x097F) scripts.add('devanagari');
            else if (code >= 0x0041 && code <= 0x007A) scripts.add('latin');
            else if (code >= 0x00C0 && code <= 0x024F) scripts.add('latin');
        }
    }
    
    // If multiple scripts are detected, ensure it's not excessive mixing
    if (scripts.size > 2) {
        return false;
    }
    
    return true;
}
