function validate(lastName) {
    // Check if input is a non-empty string
    if (typeof lastName !== 'string' || lastName.trim().length === 0) {
        return false;
    }
    
    const trimmedName = lastName.trim();
    
    // Length constraints: typically 1-50 characters, but can vary
    if (trimmedName.length < 1 || trimmedName.length > 50) {
        return false;
    }
    
    // Allow letters, hyphens, apostrophes, and spaces (for compound last names)
    // Common patterns for last names across many cultures
    const validPattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    
    if (!validPattern.test(trimmedName)) {
        return false;
    }
    
    // Additional common-sense rules
    
    // No consecutive special characters (e.g., --, '', etc.)
    if (/['\s-]{2,}/.test(trimmedName)) {
        return false;
    }
    
    // Must start and end with a letter (not special character)
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]/.test(trimmedName) || 
        !/[A-Za-zÀ-ÖØ-öø-ÿ]$/.test(trimmedName)) {
        return false;
    }
    
    // No standalone apostrophes or hyphens (e.g., O', -Smith)
    if (trimmedName.includes("' ") || trimmedName.includes("- ") || 
        trimmedName.includes(" '-") || trimmedName.includes(" -")) {
        return false;
    }
    
    return true;
}
