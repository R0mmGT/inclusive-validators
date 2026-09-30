function validate(name) {
    // Must be a non-empty string
    if (typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Reasonable length for a first name (1-30 characters)
    if (trimmedName.length < 1 || trimmedName.length > 30) {
        return false;
    }
    
    // Must start with a letter (including international letters)
    const firstChar = trimmedName.charAt(0);
    if (!/[A-Za-zÀ-ÿ]/.test(firstChar)) {
        return false;
    }
    
    // Allow letters, apostrophes, hyphens, spaces, and some international characters
    // Names can contain: letters, apostrophes (O'Connor), hyphens (Jean-Luc), spaces (van der)
    const validNamePattern = /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$/;
    
    // Check overall pattern
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }
    
    // Additional sanity checks
    // No consecutive special characters
    if (/['-]{2,}/.test(trimmedName)) {
        return false;
    }
    
    // Cannot start or end with special characters (apostrophe or hyphen)
    if (/^['-]|['-]$/.test(trimmedName)) {
        return false;
    }
    
    // At least one alphabetic character
    if (!/[A-Za-zÀ-ÿ]/.test(trimmedName)) {
        return false;
    }
    
    return true;
}
