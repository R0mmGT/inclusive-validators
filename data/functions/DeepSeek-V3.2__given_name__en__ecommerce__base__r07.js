function validate(name) {
    // Basic checks
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    
    // Length constraints
    if (trimmed.length < 1 || trimmed.length > 50) return false;
    
    // Should not contain numbers
    if (/\d/.test(trimmed)) return false;
    
    // Should only contain letters, apostrophes, hyphens, spaces, and some international characters
    // Includes basic Latin, accented characters, and common name punctuation
    if (!/^[\p{L}\p{M}'’\-\s.]+$/u.test(trimmed)) return false;
    
    // Should start with a letter (including accented letters)
    if (!/^[\p{L}\p{M}]/u.test(trimmed)) return false;
    
    // Should not contain consecutive special characters
    if (/['’\-\s.]{2,}/.test(trimmed)) return false;
    
    // Should not start or end with special characters (except apostrophe in names like O'Connor)
    if (/^['’\-\s.]|[‘’\-\s.]$/u.test(trimmed)) return false;
    
    // Should contain at least one non-special character (letter)
    if (!/[\p{L}\p{M}]/u.test(trimmed)) return false;
    
    // Should not contain more than one dot (for initials like J. R. R. Tolkien would be separate fields)
    if ((trimmed.match(/\./g) || []).length > 1) return false;
    
    return true;
}
