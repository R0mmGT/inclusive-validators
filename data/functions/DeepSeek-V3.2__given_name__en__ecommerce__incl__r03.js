function validate(name) {
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    
    // Check basic requirements
    if (trimmed.length < 1 || trimmed.length > 100) return false;
    
    // Check for empty string after trimming
    if (!trimmed) return false;
    
    // Check for invalid characters (allowing letters, spaces, hyphens, apostrophes, and dots)
    // Unicode property escapes for letter detection across all scripts
    const validNamePattern = /^[\p{L}\p{M}\s'.-]+$/u;
    if (!validNamePattern.test(trimmed)) return false;
    
    // Check for consecutive special characters or starting/ending with them
    const invalidPatterns = [
        /^[.\s'-]/,      // Starts with special character or space
        /[.\s'-]$/,      // Ends with special character or space
        /[.\s'-]{2,}/,   // Multiple consecutive special characters or spaces
        /'\s|\s'/,       // Apostrophe followed by space or vice versa
        /\.\s|\s\./,     // Dot followed by space or vice versa
        /-\s|\s-/,       // Hyphen followed by space or vice versa
        /\s{2,}/         // Multiple consecutive spaces
    ];
    
    if (invalidPatterns.some(pattern => pattern.test(trimmed))) return false;
    
    // Check for at least one letter (not just special characters or spaces)
    const hasLetter = /[\p{L}\p{M}]/u.test(trimmed);
    if (!hasLetter) return false;
    
    // Check for realistic name length (minimum 2 characters if not including special chars)
    const letterCount = (trimmed.match(/[\p{L}\p{M}]/ug) || []).length;
    if (letterCount < 1) return false;
    
    return true;
}
