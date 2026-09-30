function validate(name) {
    // Basic sanity checks
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    
    // Length constraints (1-50 characters is reasonable for first names)
    if (trimmed.length < 1 || trimmed.length > 50) return false;
    
    // Should not contain numbers
    if (/\d/.test(trimmed)) return false;
    
    // Should not contain special characters except hyphens, apostrophes, or spaces
    // Common name patterns: letters, hyphens, apostrophes, spaces, and some accented characters
    if (!/^[\p{L}\s'-]+$/u.test(trimmed)) return false;
    
    // Should not start or end with hyphen, apostrophe, or space
    if (/^[\s'-]|[\s'-]$/.test(trimmed)) return false;
    
    // Should not have consecutive special characters
    if (/['\-]{2,}/.test(trimmed)) return false;
    
    // Should have at least one letter
    if (!/\p{L}/u.test(trimmed)) return false;
    
    // Should not be just whitespace (redundant with length check but safe)
    if (trimmed.length === 0) return false;
    
    return true;
}
