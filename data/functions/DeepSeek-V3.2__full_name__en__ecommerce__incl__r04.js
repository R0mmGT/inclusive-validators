function validate(name) {
    if (typeof name !== 'string') {
        return false;
    }

    const trimmedName = name.trim();
    
    // Basic validation
    if (trimmedName.length < 2) {
        return false;
    }
    
    if (trimmedName.length > 255) {
        return false;
    }
    
    // Check for empty name
    if (trimmedName === '') {
        return false;
    }
    
    // Check for consecutive spaces
    if (trimmedName.includes('  ')) {
        return false;
    }
    
    // Split into parts
    const parts = trimmedName.split(/\s+/);
    
    // Must have at least two parts (first name and last name)
    if (parts.length < 2) {
        return false;
    }
    
    // Each part must meet requirements
    for (const part of parts) {
        // Each part should be at least 1 character
        if (part.length < 1) {
            return false;
        }
        
        // Should start with a letter (including accented/international characters)
        if (!/^\p{L}/u.test(part)) {
            return false;
        }
        
        // Should contain only letters, apostrophes, hyphens, or periods (common in names)
        if (!/^[\p{L}\p{M}'.-]+$/u.test(part)) {
            return false;
        }
        
        // Check for invalid sequences
        if (/(\.\.|--|'')/.test(part)) {
            return false;
        }
        
        // Check for punctuation at start/end (except apostrophe which can be at end in some cultures)
        if (/^[.-]|[.-]$/.test(part.replace(/'$/, ''))) {
            return false;
        }
        
        // Special handling for apostrophes
        if (part.includes("'") && !/\p{L}'\p{L}/u.test(part.replace(/'$/, ''))) {
            return false;
        }
    }
    
    // Check for titles (Mr., Dr., etc.) - these alone don't make a valid name
    const titles = ['mr', 'mrs', 'miss', 'ms', 'dr', 'prof', 'rev', 'sir', 'dame'];
    if (parts.length === 2 && titles.includes(parts[0].toLowerCase().replace(/\.$/, ''))) {
        return false;
    }
    
    // Check for excessive name parts (more than 5 might indicate error)
    if (parts.length > 6) {
        return false;
    }
    
    return true;
}
