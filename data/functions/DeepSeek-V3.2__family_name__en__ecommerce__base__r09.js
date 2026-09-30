function validate(lastName) {
    // Check if input is a string
    if (typeof lastName !== 'string') {
        return false;
    }
    
    // Trim whitespace from both ends
    const trimmedName = lastName.trim();
    
    // Basic validation checks
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Length constraints (reasonable for last names)
    if (trimmedName.length > 50) {
        return false;
    }
    
    // Check for minimum length (at least 1 character after trimming)
    if (trimmedName.length < 1) {
        return false;
    }
    
    // Allow letters, hyphens, apostrophes, and spaces (for compound last names)
    // Also allow some accented characters common in European names
    const validNamePattern = /^[A-Za-zÀ-ÿ\s'-]+$/;
    
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }
    
    // Check for consecutive special characters (e.g., --, '', etc.)
    const consecutiveSpecialChars = /['\-]{2,}/;
    if (consecutiveSpecialChars.test(trimmedName)) {
        return false;
    }
    
    // Check if name starts or ends with special characters
    if (trimmedName.startsWith('-') || trimmedName.startsWith('\'') || 
        trimmedName.startsWith(' ') || 
        trimmedName.endsWith('-') || trimmedName.endsWith('\'') || 
        trimmedName.endsWith(' ')) {
        return false;
    }
    
    // Ensure at least one letter is present
    const hasLetter = /[A-Za-zÀ-ÿ]/;
    if (!hasLetter.test(trimmedName)) {
        return false;
    }
    
    // Check for reasonable number of spaces (compound names like "De La Cruz" are okay)
    const spaceCount = (trimmedName.match(/\s/g) || []).length;
    if (spaceCount > 3) {
        return false;
    }
    
    // Check for reasonable number of hyphens/apostrophes
    const specialCharCount = (trimmedName.match(/['\-]/g) || []).length;
    if (specialCharCount > 2) {
        return false;
    }
    
    return true;
}
