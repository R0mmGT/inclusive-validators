function validate(name) {
    // Basic sanity checks
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    
    // Must contain at least one character after trimming
    if (trimmed.length === 0) return false;
    
    // Max reasonable length check (allowing for long names with spaces/hyphens)
    if (trimmed.length > 200) return false;
    
    // Check for invalid characters
    // Allow letters (including Unicode), spaces, hyphens, apostrophes, and dots
    // Using regex that matches common name characters across cultures
    const invalidCharRegex = /[^\p{L}\s\-'.]/u;
    if (invalidCharRegex.test(trimmed)) return false;
    
    // Check for consecutive special characters or special characters at edges
    const consecutiveSpecialRegex = /[\s\-'.]{2,}/;
    if (consecutiveSpecialRegex.test(trimmed)) return false;
    
    if (/^[\s\-'.]|[\s\-'.]$/.test(trimmed)) return false;
    
    // Must contain at least one letter
    const letterRegex = /\p{L}/u;
    if (!letterRegex.test(trimmed)) return false;
    
    // Must have at least two parts (many cultures have at least given and family names)
    // Split by spaces, hyphens, or apostrophes that might connect name parts
    const parts = trimmed.split(/[\s\-']+/).filter(part => part.length > 0);
    
    if (parts.length < 2) return false;
    
    // Each part must contain at least one letter
    for (const part of parts) {
        if (!letterRegex.test(part)) return false;
    }
    
    // Check for reasonable part lengths (some cultures have very short names)
    // Minimum 1 character per part, maximum 50
    for (const part of parts) {
        if (part.length < 1 || part.length > 50) return false;
    }
    
    return true;
}
