function validate(name) {
    // Check if input is a string and not empty
    if (typeof name !== 'string' || name.trim() === '') {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Remove excessive spaces (more than one consecutive space)
    const normalizedName = trimmedName.replace(/\s+/g, ' ');
    
    // Check for minimum and maximum length constraints
    if (normalizedName.length < 2 || normalizedName.length > 100) {
        return false;
    }
    
    // Split into name parts
    const nameParts = normalizedName.split(' ');
    
    // Must have at least two parts (first and last name)
    if (nameParts.length < 2) {
        return false;
    }
    
    // Check each name part
    for (let part of nameParts) {
        // Each part must be at least 1 character
        if (part.length < 1) {
            return false;
        }
        
        // Each part must start with a letter
        if (!/^[A-Za-z]/.test(part)) {
            return false;
        }
        
        // Can contain letters, hyphens, apostrophes, and periods (for middle initials)
        if (!/^[A-Za-z][A-Za-z.'-]*$/.test(part)) {
            return false;
        }
        
        // Cannot have consecutive special characters
        if (/[.'-]{2,}/.test(part)) {
            return false;
        }
        
        // Cannot end with a special character (except period for middle initial)
        if (part.length > 1 && /[.'-]$/.test(part)) {
            return false;
        }
        
        // Middle initial must be a single character followed by period
        if (part.includes('.') && !/^[A-Za-z]\.$/.test(part)) {
            return false;
        }
    }
    
    // Check for common invalid patterns
    const invalidPatterns = [
        /^\d/, // Starts with digit
        /\d/, // Contains any digit
        /[^\w\s.'-]/, // Contains invalid characters
        /^(Mr|Mrs|Ms|Dr|Prof)\.?$/, // Only a title
        /^(Mr|Mrs|Ms|Dr|Prof)\.?\s+[A-Za-z]/ // Title without proper name structure
    ];
    
    for (let pattern of invalidPatterns) {
        if (pattern.test(normalizedName)) {
            return false;
        }
    }
    
    // Basic check for at least two non-initial name parts
    const nonInitialParts = nameParts.filter(part => !/^[A-Za-z]\.$/.test(part));
    if (nonInitialParts.length < 2) {
        return false;
    }
    
    return true;
}
