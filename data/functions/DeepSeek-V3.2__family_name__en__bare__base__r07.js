function validate(lastName) {
    // Check if input is a string
    if (typeof lastName !== 'string') {
        return false;
    }
    
    // Remove leading/trailing whitespace
    const trimmedName = lastName.trim();
    
    // Check for empty string or whitespace-only
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Length check - common maximum for database fields, adjust as needed
    if (trimmedName.length > 64) {
        return false;
    }
    
    // Basic pattern: allow letters, apostrophes, hyphens, spaces (for compound names)
    // Also allows accented characters and non-Latin scripts via Unicode
    const validNamePattern = /^[\p{L}\p{M}\s'-]+$/u;
    
    // Check if the name matches the valid pattern
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }
    
    // Additional sanity checks
    // Cannot start or end with hyphen, apostrophe, or space
    if (/^[-'\s]|[-'\s]$/.test(trimmedName)) {
        return false;
    }
    
    // Cannot have consecutive hyphens, apostrophes, or spaces
    if (/['\s-]{2,}/.test(trimmedName)) {
        return false;
    }
    
    // Must contain at least one letter
    if (!/\p{L}/u.test(trimmedName)) {
        return false;
    }
    
    // Additional check for common invalid patterns
    // Reject names that are just numbers or special characters
    const letterCount = (trimmedName.match(/\p{L}/ug) || []).length;
    if (letterCount === 0) {
        return false;
    }
    
    // Check for minimum length (typically at least 1 character)
    if (letterCount < 1) {
        return false;
    }
    
    return true;
}
