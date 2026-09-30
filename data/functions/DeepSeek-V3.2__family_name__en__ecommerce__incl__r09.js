function validate(lastName) {
    // Check input type
    if (typeof lastName !== 'string') {
        return false;
    }
    
    // Trim whitespace
    const trimmedName = lastName.trim();
    
    // Check for empty string after trimming
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Minimum and maximum length constraints
    // Extremely short (1 character) or long (70 characters) names are allowed
    // to accommodate various cultures while preventing absurd values
    if (trimmedName.length > 70) {
        return false;
    }
    
    // Check for control characters or problematic Unicode
    if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmedName)) {
        return false;
    }
    
    // Basic pattern: must start with a letter or valid special character
    // and contain only characters commonly used in names worldwide
    const validLastNamePattern = /^[\p{L}\p{M}\-'. ]+$/u;
    
    if (!validLastNamePattern.test(trimmedName)) {
        return false;
    }
    
    // Additional sanity checks
    // 1. Cannot consist only of special characters
    if (/^[\-'. ]+$/.test(trimmedName)) {
        return false;
    }
    
    // 2. No consecutive special characters (except spaces which can have multiples)
    if (/[\-'.]{2,}/.test(trimmedName)) {
        return false;
    }
    
    // 3. Cannot start or end with certain special characters
    if (/^[\-'.]|[\-'.]$/.test(trimmedName)) {
        return false;
    }
    
    // 4. Must contain at least one letter character
    if (!/\p{L}/u.test(trimmedName)) {
        return false;
    }
    
    return true;
}
