function validate(name) {
    // Check if input is a non-empty string
    if (typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Check for minimum length (at least 2 characters)
    if (trimmedName.length < 2) {
        return false;
    }
    
    // Check for excessive length (unlikely for a real name)
    if (trimmedName.length > 100) {
        return false;
    }
    
    // Split by spaces to check name parts
    const nameParts = trimmedName.split(/\s+/);
    
    // Must have at least first and last name (2 parts)
    if (nameParts.length < 2) {
        return false;
    }
    
    // Check each name part
    for (let i = 0; i < nameParts.length; i++) {
        const part = nameParts[i];
        
        // Each part must be at least 2 characters (allowing single letters like "J" would be too permissive)
        if (part.length < 2) {
            return false;
        }
        
        // Each part should start with uppercase letter
        if (!/^[A-ZÀ-ÖØ-Þ]/.test(part)) {
            return false;
        }
        
        // Allow letters, hyphens, and apostrophes in the rest of the name part
        // Supports international characters, hyphenated names (like "Mary-Jane"), and names with apostrophes (like "O'Connor")
        if (!/^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ'-]*$/.test(part)) {
            return false;
        }
        
        // Check for consecutive special characters
        if (/['-]{2,}/.test(part)) {
            return false;
        }
        
        // Check for special characters at the end
        if (/['-]$/.test(part)) {
            return false;
        }
        
        // Check for special characters at the beginning (after the first capital letter)
        if (/^[A-ZÀ-ÖØ-Þ]['-]/.test(part)) {
            return false;
        }
    }
    
    return true;
}
