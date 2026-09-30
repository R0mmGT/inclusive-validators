function validate(name) {
    // Early rejections for edge cases
    if (typeof name !== 'string' || name.length === 0) {
        return false;
    }
    
    // Remove extra whitespace and normalize Unicode characters
    const trimmedName = name.trim().replace(/\s+/g, ' ');
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Check for minimum and maximum reasonable length (1-128 characters including spaces)
    if (trimmedName.length > 128 || trimmedName.length < 2) {
        return false;
    }
    
    // Check for at least one space (since it's a "full name")
    if (!trimmedName.includes(' ')) {
        return false;
    }
    
    // Split into parts and validate each part
    const parts = trimmedName.split(' ');
    
    // Check for minimum and maximum number of parts (reasonable range: 2-6 names)
    if (parts.length < 2 || parts.length > 6) {
        return false;
    }
    
    // Validate each part
    for (let part of parts) {
        // Each part should be at least 1 character (after validation)
        if (part.length === 0) {
            return false;
        }
        
        // Check for minimum and maximum part length (reasonable: 1-30 characters)
        if (part.length > 30 || part.length < 1) {
            return false;
        }
        
        // Basic character validation - allow letters, hyphens, apostrophes, and common name symbols
        // This regex allows Unicode letters from any language, hyphens, apostrophes, and periods
        const namePartRegex = /^[\p{L}\p{M}'-]+(?:\.\p{L}+)?$/u;
        
        if (!namePartRegex.test(part)) {
            // Additional check for hyphenated names or names with apostrophes in the middle
            const complexNameRegex = /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u;
            if (!complexNameRegex.test(part)) {
                return false;
            }
        }
        
        // Check for consecutive special characters
        if (/[-']{2,}/.test(part)) {
            return false;
        }
        
        // Check for names starting or ending with special characters (except dots for initials)
        if (part.match(/^[ '-]/) || part.match(/[-']$/)) {
            return false;
        }
    }
    
    // Check for repeated identical parts (e.g., "John John")
    const uniqueParts = new Set(parts.map(p => p.toLowerCase()));
    if (uniqueParts.size < parts.length) {
        return false;
    }
    
    return true;
}
