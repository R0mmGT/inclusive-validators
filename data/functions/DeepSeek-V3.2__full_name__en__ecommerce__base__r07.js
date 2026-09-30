function validate(fullName) {
    // Check if input is a non-empty string
    if (typeof fullName !== 'string' || fullName.trim().length === 0) {
        return false;
    }
    
    const trimmedName = fullName.trim();
    
    // Check length constraints (reasonable for human names)
    if (trimmedName.length > 100 || trimmedName.length < 2) {
        return false;
    }
    
    // Split into name parts
    const nameParts = trimmedName.split(/\s+/);
    
    // Must have at least two parts (first and last name)
    if (nameParts.length < 2) {
        return false;
    }
    
    // Check each part
    for (let part of nameParts) {
        // Each part should start with an uppercase letter
        if (!/^[A-ZÀ-ÿ][a-zà-ÿ.'-]*$/.test(part)) {
            // Allow for hyphenated names like Mary-Ann
            if (!/^[A-ZÀ-ÿ][a-zà-ÿ'-]+-[A-ZÀ-ÿ][a-zà-ÿ'-]+$/.test(part)) {
                return false;
            }
        }
        
        // Check for valid characters (letters, apostrophes, hyphens, periods)
        if (!/^[A-Za-zÀ-ÿ.'-]+$/.test(part)) {
            return false;
        }
        
        // Check for repeated special characters or invalid patterns
        if (/(\.\.|--|''|\.-|-'|\.'|'\.)/.test(part)) {
            return false;
        }
        
        // Names shouldn't start or end with special characters (except apostrophe for certain names)
        if (/^[.-]|[.-]$/.test(part)) {
            return false;
        }
        
        // Apostrophe shouldn't be at the beginning (except for Irish names like O'Connor)
        if (part.startsWith("'")) {
            return false;
        }
        
        // Check part length
        if (part.length < 1 || part.replace(/[.'-]/g, '').length < 1) {
            return false;
        }
    }
    
    // Additional check: no more than 5 name parts (reasonable limit)
    if (nameParts.length > 5) {
        return false;
    }
    
    // Check for common invalid patterns
    const lowerName = trimmedName.toLowerCase();
    if (/\d/.test(trimmedName) || 
        /test|example|admin|user|first|last|name|asdf|qwerty/i.test(lowerName) ||
        /[^A-Za-zÀ-ÿ\s.'-]/.test(trimmedName)) {
        return false;
    }
    
    return true;
}
