function validate(lastName) {
    // Check if input is a string
    if (typeof lastName !== 'string') {
        return false;
    }
    
    // Remove leading/trailing whitespace
    const trimmedName = lastName.trim();
    
    // Basic validation checks
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Check length constraints (reasonable bounds for last names)
    if (trimmedName.length < 1 || trimmedName.length > 50) {
        return false;
    }
    
    // Common last name pattern:
    // 1. Starts with a letter (including accented/Unicode letters)
    // 2. May contain letters, apostrophes, hyphens, and spaces
    // 3. May contain accented characters and other Unicode letters
    // 4. Must not contain consecutive special characters
    // 5. Must not start or end with special characters (except internal apostrophes/hyphens/spaces)
    
    const lastNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'\- ]*[A-Za-zÀ-ÖØ-öø-ÿ])?$/;
    
    if (!lastNameRegex.test(trimmedName)) {
        return false;
    }
    
    // Additional business logic constraints
    
    // No consecutive special characters
    if (/(['\- ])\1/.test(trimmedName)) {
        return false;
    }
    
    // No leading/trailing special characters (already covered by regex but double-check)
    if (/^['\- ]|['\- ]$/.test(trimmedName)) {
        return false;
    }
    
    // Ensure it contains at least one letter (should already be true from regex)
    if (!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(trimmedName)) {
        return false;
    }
    
    // Check for excessive special characters (more than 2 special chars in total)
    const specialCharCount = (trimmedName.match(/['\- ]/g) || []).length;
    if (specialCharCount > 2) {
        return false;
    }
    
    // Check for reasonable number of words (max 3 parts, e.g., "de la Cruz")
    const parts = trimmedName.split(/['\- ]+/).filter(part => part.length > 0);
    if (parts.length > 3) {
        return false;
    }
    
    // Each part must start with a letter
    for (const part of parts) {
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]/.test(part)) {
            return false;
        }
    }
    
    return true;
}
