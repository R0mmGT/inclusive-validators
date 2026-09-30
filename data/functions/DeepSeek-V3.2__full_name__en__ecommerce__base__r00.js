function validate(name) {
    // Basic validation: not empty and within reasonable length
    if (typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Remove multiple spaces and replace with single space
    const normalizedName = trimmedName.replace(/\s+/g, ' ');
    
    // Must contain at least one space (first name and last name)
    if (!normalizedName.includes(' ')) {
        return false;
    }
    
    // Split into parts
    const parts = normalizedName.split(' ');
    
    // Must have at least 2 parts (first and last name)
    if (parts.length < 2) {
        return false;
    }
    
    // Check each part
    for (let part of parts) {
        // Each part must start with a letter
        if (!/^[A-Za-z]/.test(part)) {
            return false;
        }
        
        // Each part should only contain letters, hyphens, or apostrophes
        if (!/^[A-Za-zÀ-ÿ'-]+$/.test(part)) {
            return false;
        }
        
        // Check for consecutive special characters
        if (/['-]{2,}/.test(part)) {
            return false;
        }
        
        // Part should not start or end with hyphen or apostrophe
        if (part.startsWith('-') || part.endsWith('-') || 
            part.startsWith("'") || part.endsWith("'")) {
            return false;
        }
        
        // Minimum length for each part (typically 2+ chars, but allow single letters for initials)
        if (part.length < 1) {
            return false;
        }
        
        // Check for mixed case (should not be all uppercase or all lowercase)
        if (part.length > 1) {
            const hasUpperCase = /[A-Z]/.test(part);
            const hasLowerCase = /[a-z]/.test(part);
            
            // Names should typically have mixed case (not ALL CAPS or all lowercase)
            // Allow proper capitalization (first letter uppercase, rest lowercase or mixed)
            const firstChar = part[0];
            const rest = part.slice(1);
            
            // First character should be uppercase
            if (!/[A-ZÀ-Ý]/.test(firstChar)) {
                return false;
            }
            
            // Rest should not be all uppercase
            if (rest.length > 0 && /^[A-ZÀ-Ý]+$/.test(rest)) {
                return false;
            }
        }
    }
    
    // Check for common false positives
    const lowerName = normalizedName.toLowerCase();
    const invalidPatterns = [
        /^test\s/i,
        /^example\s/i,
        /\d/, // No numbers
        /[^A-Za-zÀ-ÿ\s'-]/, // No other special characters
        /^(mr|mrs|ms|dr|prof)\s/i // No titles at beginning
    ];
    
    for (let pattern of invalidPatterns) {
        if (pattern.test(normalizedName)) {
            return false;
        }
    }
    
    return true;
}
