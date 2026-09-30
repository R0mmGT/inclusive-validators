function validate(name) {
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    
    // Basic validation
    if (trimmed.length < 2) return false; // At least two characters total
    if (trimmed.length > 150) return false; // Reasonable upper limit
    
    // Must contain at least one letter (any script) and allow spaces, hyphens, apostrophes, dots
    if (!/[\p{L}]/u.test(trimmed)) return false;
    
    // Check for valid characters (letters, spaces, hyphens, apostrophes, dots from any script)
    if (!/^[\p{L}\s\-'.]+$/u.test(trimmed)) return false;
    
    // Must have at least one space (separating name parts) but not at start/end
    if (!/\s/.test(trimmed)) return false;
    
    // No consecutive special characters or spaces
    if (/[\s\-'.]{2,}/.test(trimmed)) return false;
    
    // No adjacent special characters of different types
    if (/[\-'.][\s]|[\s][\-'.]/.test(trimmed)) return false;
    
    // Check each part (split by spaces)
    const parts = trimmed.split(/\s+/);
    
    if (parts.length < 2) return false; // At least two name parts
    
    // Each part must contain at least one letter
    for (const part of parts) {
        if (!/[\p{L}]/u.test(part)) return false;
        if (part.length < 1) return false; // Should not happen due to split, but safe check
    }
    
    return true;
}
