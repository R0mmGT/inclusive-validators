function validate(name) {
    // Trim whitespace and check for empty string
    const trimmed = name.trim();
    if (!trimmed) return false;
    
    // Check for minimum length (at least one given name and one surname)
    if (trimmed.length < 3) return false;
    
    // Check for maximum reasonable length
    if (trimmed.length > 100) return false;
    
    // Check for multiple spaces, leading/trailing spaces (already trimmed)
    if (/\s{2,}/.test(trimmed)) return false;
    
    // Split into parts and check for at least two components
    const parts = trimmed.split(' ');
    if (parts.length < 2) return false;
    
    // Validate each part
    for (const part of parts) {
        // Each part must contain only letters, hyphens, or apostrophes
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'\-]+$/.test(part)) return false;
        
        // Each part must start and end with a letter
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]/.test(part)) return false;
        if (!/[A-Za-zÀ-ÖØ-öø-ÿ]$/.test(part)) return false;
        
        // No consecutive special characters
        if (/['\-]{2,}/.test(part)) return false;
        
        // Minimum part length (at least 2 characters for surnames, 1 for given names)
        // We'll be lenient here since some cultures have single-letter middle initials
        if (part.length < 1) return false;
        
        // Maximum part length (reasonable limit)
        if (part.length > 30) return false;
    }
    
    // At least one part should have length >= 2 (a proper name, not all initials)
    const hasProperName = parts.some(part => part.length >= 2);
    if (!hasProperName) return false;
    
    // Check for common invalid patterns
    const lowerName = trimmed.toLowerCase();
    if (lowerName === 'test' || 
        lowerName === 'unknown' || 
        lowerName === 'anonymous' ||
        /^\d/.test(trimmed) ||
        /\d/.test(trimmed)) {
        return false;
    }
    
    return true;
}
