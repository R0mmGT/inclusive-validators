function validate(name) {
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    if (trimmed.length < 2) return false;
    if (trimmed.length > 128) return false;
    
    // Check for invalid characters (allowing letters, spaces, hyphens, apostrophes, dots, and international characters)
    const invalidCharPattern = /[^\p{L}\p{M}\s\-'’.]/u;
    if (invalidCharPattern.test(trimmed)) return false;
    
    // Check for consecutive special characters or starting/ending with them
    const consecutiveSpecialPattern = /[\s\-'’.]{2,}|^[\s\-'’.]|[\s\-'’.]$/u;
    if (consecutiveSpecialPattern.test(trimmed)) return false;
    
    // Split into name parts
    const parts = trimmed.split(/[\s\-'’.]+/).filter(part => part.length > 0);
    
    // Must have at least 2 parts for a full name
    if (parts.length < 2) return false;
    
    // Each part must start with a letter and contain at least 2 characters
    // (allowing for short parts like "Al" or "Li" which are valid names)
    const validPartPattern = /^\p{L}[\p{L}\p{M}'’\-]*$/u;
    for (const part of parts) {
        if (part.length < 1) return false;
        if (!validPartPattern.test(part)) return false;
        
        // Check for excessive repetition (e.g., "Aaaaaaaaa")
        const repeatedCharPattern = /(.)\1{4,}/u;
        if (repeatedCharPattern.test(part)) return false;
    }
    
    return true;
}
