function validate(name) {
    // Basic validation: name must be a non-empty string
    if (typeof name !== 'string' || name.trim() === '') {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Check for invalid characters (allow letters, spaces, hyphens, and apostrophes)
    const validNameRegex = /^[a-zA-Z\u00C0-\u017F\s'.-]+$/;
    if (!validNameRegex.test(trimmedName)) {
        return false;
    }
    
    // Split into name parts
    const nameParts = trimmedName.split(/\s+/);
    
    // Must have at least two parts (first name and last name)
    if (nameParts.length < 2) {
        return false;
    }
    
    // Each part must be at least 2 characters long (except for initials with period)
    for (let part of nameParts) {
        // Remove any period for length checking (allow initials like "J.R.R.")
        const cleanPart = part.replace(/\./g, '');
        
        // Check if it's a valid name part
        if (cleanPart.length < 1) {
            return false;
        }
        
        // If not an initial (like "J."), require at least 2 characters
        if (!part.includes('.') && cleanPart.length < 2) {
            return false;
        }
        
        // Check for consecutive special characters
        if (/(['.-])\1/.test(part)) {
            return false;
        }
        
        // Check for special characters at beginning/end of name part
        if (/^['.-]|['.-]$/.test(cleanPart)) {
            return false;
        }
    }
    
    // Check for reasonable total length (adjust as needed)
    if (trimmedName.length > 100) {
        return false;
    }
    
    // Check for excessive consecutive spaces (should be handled by split, but just in case)
    if (/\s\s+/.test(trimmedName)) {
        return false;
    }
    
    return true;
}
