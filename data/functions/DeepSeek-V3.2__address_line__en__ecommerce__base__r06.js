function validate(address) {
    // Check if input is a non-empty string
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Basic length constraints (reasonable for street addresses)
    if (trimmedAddress.length < 5 || trimmedAddress.length > 200) {
        return false;
    }
    
    // Must contain at least one number (house/building number)
    if (!/\d/.test(trimmedAddress)) {
        return false;
    }
    
    // Must contain at least one letter (street name)
    if (!/[a-zA-Z]/.test(trimmedAddress)) {
        return false;
    }
    
    // Should not contain obviously invalid patterns
    const invalidPatterns = [
        /test/i,
        /example/i,
        /asdf/i,
        /qwerty/i,
        /xxxx/i,
        /1234567890{5,}/, // Excessive consecutive numbers
        /[a-zA-Z]{20,}/, // Excessive consecutive letters (likely nonsense)
        /^\d+$/, // Only numbers
        /^[a-zA-Z\s]+$/, // Only letters and spaces
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedAddress)) {
            return false;
        }
    }
    
    // Should contain at least one space (separating number from street)
    if (!/\s/.test(trimmedAddress)) {
        return false;
    }
    
    // Check for reasonable structure: number followed by text or text followed by number
    const segments = trimmedAddress.split(/\s+/);
    let hasNumberSegment = false;
    let hasTextSegment = false;
    
    for (const segment of segments) {
        if (/^\d+[a-zA-Z]?$/.test(segment) || /^\d+[-\/]\d+/.test(segment)) {
            hasNumberSegment = true;
        }
        if (/^[a-zA-Z]+/.test(segment) && segment.length > 1) {
            hasTextSegment = true;
        }
    }
    
    if (!hasNumberSegment || !hasTextSegment) {
        return false;
    }
    
    // Check for excessive special characters
    const specialCharCount = (trimmedAddress.match(/[^\w\s]/g) || []).length;
    if (specialCharCount > 5) {
        return false;
    }
    
    // Check for consecutive special characters
    if (/[^\w\s]{3,}/.test(trimmedAddress)) {
        return false;
    }
    
    return true;
}
