function validate(lastName) {
    // Check if input is a non-empty string
    if (typeof lastName !== 'string' || lastName.trim().length === 0) {
        return false;
    }
    
    const trimmedLastName = lastName.trim();
    
    // Check maximum reasonable length (adjustable, but 150 chars accommodates most cases)
    if (trimmedLastName.length > 150) {
        return false;
    }
    
    // Check for null characters or other problematic control characters
    if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(trimmedLastName)) {
        return false;
    }
    
    // Core validation: allow letters, spaces, hyphens, apostrophes, and periods
    // Includes Unicode letters from all scripts (via \p{L}) and numbers for some cultural cases
    const validNamePattern = /^[\p{L}\p{M}'\-. 0-9]+$/u;
    
    // Additional patterns for specific cases
    const additionalPatterns = [
        /^[\p{L}\p{M}]+(?:[ '\-.][\p{L}\p{M}]+)*$/u,  // Multiple name parts with separators
        /^[\p{L}\p{M}]+['\-][\p{L}\p{M}]+$/u,        // Names like O'Reilly or Smith-Jones
        /^[\p{L}\p{M}]+ [\p{L}\p{M}]+$/u,            // Two-part names with space
        /^[\p{L}\p{M}]+\.[\p{L}\p{M}]+$/u,           // Names with periods (some cultures)
        /^[\p{L}\p{M}0-9]+$/u                        // Single word names with possible numbers
    ];
    
    // Check against main pattern or additional patterns
    if (validNamePattern.test(trimmedLastName)) {
        // Additional check: ensure it doesn't start or end with separators
        if (/^[ '\-.]|['\-.]$/.test(trimmedLastName)) {
            return false;
        }
        
        // Check for consecutive separators
        if (/['\-.]{2,}/.test(trimmedLastName)) {
            return false;
        }
        
        // Check for reasonable number of spaces (more than 5 suggests non-name text)
        if ((trimmedLastName.match(/ /g) || []).length > 5) {
            return false;
        }
        
        // Ensure at least one letter character exists
        if (!/[\p{L}\p{M}]/u.test(trimmedLastName)) {
            return false;
        }
        
        return true;
    }
    
    // Try additional patterns if main pattern fails
    for (const pattern of additionalPatterns) {
        if (pattern.test(trimmedLastName)) {
            return true;
        }
    }
    
    return false;
}
