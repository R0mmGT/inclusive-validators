function validate(name) {
    // Basic validation rules for a first name
    
    // Must be a non-empty string
    if (typeof name !== 'string' || name.trim() === '') {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Length check: reasonable first name length (1-30 characters)
    if (trimmedName.length < 1 || trimmedName.length > 30) {
        return false;
    }
    
    // Must start with a letter (case insensitive)
    if (!/^[a-zA-Z]/.test(trimmedName)) {
        return false;
    }
    
    // Should contain only letters, spaces, hyphens, apostrophes, and dots
    // Allow common name characters and spacing for compound names
    if (!/^[a-zA-Z\s\-'.]+$/.test(trimmedName)) {
        return false;
    }
    
    // No consecutive special characters
    if (/[\s\-'.]{2,}/.test(trimmedName)) {
        return false;
    }
    
    // Should not start or end with a special character (except the initial apostrophe for names like O'Connor)
    if (/^[\s\-.]/.test(trimmedName)) {
        return false;
    }
    
    // No trailing special characters (except apostrophe, which is allowed at the end for French names like "D'")
    if (/[\s\-.]$/.test(trimmedName)) {
        return false;
    }
    
    // At least one letter character must be present
    if (!/[a-zA-Z]/.test(trimmedName)) {
        return false;
    }
    
    // Should not contain numbers
    if (/\d/.test(trimmedName)) {
        return false;
    }
    
    // Should not contain common inappropriate patterns or profanity
    // (Basic check - in production you'd want a more comprehensive list)
    const inappropriatePatterns = [
        'test', 'admin', 'user', 'root', 'null', 'undefined',
        'select', 'insert', 'delete', 'update', 'drop', 'script',
        'http://', 'https://', '<script', 'javascript:'
    ];
    
    const lowerName = trimmedName.toLowerCase();
    for (const pattern of inappropriatePatterns) {
        if (lowerName.includes(pattern)) {
            return false;
        }
    }
    
    // Valid first name patterns
    return true;
}
