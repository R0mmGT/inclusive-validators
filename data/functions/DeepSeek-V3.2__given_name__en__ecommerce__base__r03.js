function validate(name) {
    // Basic validation: name must be a non-empty string
    if (typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Reasonable length constraints for first names
    if (trimmedName.length < 2 || trimmedName.length > 50) {
        return false;
    }
    
    // Check for invalid characters
    // Allow letters (including international characters), hyphens, apostrophes, and spaces
    // Updated to include more comprehensive Unicode support
    const validNamePattern = /^[\p{L}\s'-]+$/u;
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }
    
    // Check for consecutive special characters or starting/ending with them
    const invalidPatterns = [
        /^[-'\s]/,  // Starts with hyphen, apostrophe, or space
        /[-'\s]$/,  // Ends with hyphen, apostrophe, or space
        /['-]{2,}/, // Two or more consecutive apostrophes or hyphens
        /\s{2,}/    // Two or more consecutive spaces
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedName)) {
            return false;
        }
    }
    
    // Ensure at least one letter exists (not just special characters)
    const hasLetter = /[\p{L}]/u.test(trimmedName);
    if (!hasLetter) {
        return false;
    }
    
    // Additional checks for common issues
    const lowercaseName = trimmedName.toLowerCase();
    
    // Reject names that are clearly not first names
    const invalidNames = [
        'admin', 'administrator', 'root', 'system', 'guest', 
        'test', 'user', 'null', 'undefined', 'unknown'
    ];
    
    if (invalidNames.includes(lowercaseName)) {
        return false;
    }
    
    // Reject names that look like email addresses or URLs
    if (trimmedName.includes('@') || trimmedName.includes('://') || 
        trimmedName.includes('.com') || trimmedName.includes('.net')) {
        return false;
    }
    
    // Reject names that contain numbers
    if (/\d/.test(trimmedName)) {
        return false;
    }
    
    // Allow capitalization but ensure it's not all caps (which might indicate shouting)
    // But don't reject if it's a valid short name like "AJ" or "Li"
    if (trimmedName === trimmedName.toUpperCase() && trimmedName.length > 2) {
        // Check if it's actually an acronym/initialism
        const words = trimmedName.split(/\s+/);
        const allShortWords = words.every(word => word.length <= 2);
        if (!allShortWords) {
            return false;
        }
    }
    
    // Check for reasonable structure - should not have too many parts
    const nameParts = trimmedName.split(/\s+/);
    if (nameParts.length > 3) {
        return false;
    }
    
    // Each part should be a reasonable length
    for (const part of nameParts) {
        // Remove special characters for length check
        const cleanPart = part.replace(/[-']/g, '');
        if (cleanPart.length > 25) {
            return false;
        }
    }
    
    return true;
}
