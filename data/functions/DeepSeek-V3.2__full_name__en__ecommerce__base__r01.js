function validate(fullName) {
    // Check if input is a non-empty string
    if (typeof fullName !== 'string' || fullName.trim().length === 0) {
        return false;
    }
    
    const name = fullName.trim();
    
    // Check for minimum and maximum length constraints
    if (name.length < 2 || name.length > 100) {
        return false;
    }
    
    // Split into parts and check for at least two name components
    const parts = name.split(/\s+/);
    if (parts.length < 2) {
        return false;
    }
    
    // Check each part
    for (let part of parts) {
        // Each part should be at least 2 characters
        if (part.length < 2) {
            return false;
        }
        
        // Should start with an uppercase letter
        if (!/^[A-ZÀ-ÖØ-Þ]/.test(part)) {
            return false;
        }
        
        // Should contain only letters, hyphens, apostrophes, or spaces
        // (already handled by split, but validate the content)
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'.-]+$/.test(part)) {
            return false;
        }
        
        // Should not contain consecutive special characters
        if (/[.'-]{2,}/.test(part)) {
            return false;
        }
        
        // Should not start or end with special characters (except hyphen in compound names)
        if (/^[.'-]|[.'-]$/.test(part)) {
            return false;
        }
    }
    
    return true;
}
