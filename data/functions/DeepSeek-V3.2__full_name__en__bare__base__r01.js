function validate(name) {
    // Trim whitespace from beginning and end
    const trimmed = name.trim();
    
    // Check for empty string or only whitespace
    if (!trimmed) return false;
    
    // Split by one or more whitespace characters
    const parts = trimmed.split(/\s+/);
    
    // Must have at least two parts (first and last name)
    if (parts.length < 2) return false;
    
    // Check each part
    for (const part of parts) {
        // Each part must start with an uppercase letter
        if (!/^[A-Z][a-z]*$/.test(part)) {
            // Allow for names with hyphens (like Mary-Ann)
            if (!/^[A-Z][a-z]*(-[A-Z][a-z]*)+$/.test(part)) {
                // Allow for names with apostrophes (like O'Connor)
                if (!/^[A-Z][a-z]*'[A-Z][a-z]*$/.test(part)) {
                    return false;
                }
            }
        }
        
        // Each part must be at least 2 characters long
        // (allow for rare single-letter names like "J" with at least one letter after apostrophe/hyphen)
        const baseLength = part.replace(/[-']/g, '').length;
        if (baseLength < 1) return false;
        
        // Check for consecutive special characters or ending with them
        if (/[-']{2,}/.test(part) || /[-']$/.test(part) || /^[-']/.test(part)) {
            return false;
        }
    }
    
    // Must not contain numbers or most special characters
    if (/[0-9]|[@#$%^&*()_+=[\]{}|\\:;"<>,.?/~`]/.test(trimmed)) {
        return false;
    }
    
    return true;
}
