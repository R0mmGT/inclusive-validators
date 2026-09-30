function validate(name) {
    // Remove leading/trailing whitespace and check if empty
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Check total length (reasonable bounds for human names)
    if (trimmedName.length < 2 || trimmedName.length > 128) {
        return false;
    }
    
    // Split into name parts
    const parts = trimmedName.split(/\s+/);
    if (parts.length < 2) {
        return false;
    }
    
    // Validate each part
    for (let part of parts) {
        // Check length of each part
        if (part.length < 1 || part.length > 64) {
            return false;
        }
        
        // Check for invalid characters while allowing:
        // - Letters from any alphabet (Unicode letter categories)
        // - Hyphens, apostrophes, dots (common in names)
        // - Allow digits (some cultures use them, like "John 2nd")
        const validPattern = /^[\p{L}\p{M}\d'’\-.]+$/u;
        if (!validPattern.test(part)) {
            return false;
        }
        
        // Check for repeated special characters
        if (/(['’\-.])\1{2,}/.test(part)) {
            return false;
        }
        
        // Check if part starts or ends with special character (with exceptions)
        if (/^['’\-.]/.test(part) || /['’\-.]$/.test(part)) {
            // Allow starting with apostrophe in names like 'O'Connor'
            if (!(part.startsWith("'") || part.startsWith("’"))) {
                return false;
            }
            // Never allow ending with special character
            return false;
        }
        
        // Check for consecutive special characters (except hyphen-apostrophe combinations)
        if (/['’\-.]{2,}/.test(part.replace(/['’]-/g, '').replace(/['’]\./g, ''))) {
            return false;
        }
    }
    
    // Additional heuristic: at least one part should contain a letter
    const hasLetter = parts.some(part => /\p{L}/u.test(part));
    if (!hasLetter) {
        return false;
    }
    
    // Additional check: not all parts are the same
    const allSame = parts.every(part => part === parts[0]);
    if (allSame) {
        return false;
    }
    
    return true;
}
