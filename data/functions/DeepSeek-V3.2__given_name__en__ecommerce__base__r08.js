function validate(name) {
    // Basic checks
    if (typeof name !== 'string') return false;
    if (name.length < 1 || name.length > 50) return false;
    
    // Trim whitespace and check if empty after trimming
    const trimmed = name.trim();
    if (trimmed.length === 0) return false;
    
    // Check for invalid characters - allow letters, spaces, hyphens, and apostrophes
    // using Unicode categories for better international support
    const validNameRegex = /^[\p{L}'\- ]+$/u;
    if (!validNameRegex.test(trimmed)) return false;
    
    // Check for consecutive special characters or starting/ending with them
    if (/['\-]{2,}/.test(trimmed)) return false; // No consecutive hyphens or apostrophes
    if (/^['\-]|['\-]$/.test(trimmed)) return false; // Cannot start or end with hyphen/apostrophe
    
    // Check for reasonable spacing (no multiple consecutive spaces)
    if (/\s{2,}/.test(trimmed)) return false;
    
    // Check for at least one letter (to avoid strings like "--" or "''")
    if (!/\p{L}/u.test(trimmed)) return false;
    
    // Additional realistic checks
    // Allow for compound names like "Jean-Pierre", "Mary Jane", "O'Brien"
    // Allow for international names with accents
    
    return true;
}
