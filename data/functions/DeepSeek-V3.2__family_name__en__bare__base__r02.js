function validate(name) {
    // Check if input is a non-empty string
    if (typeof name !== 'string' || name.trim() === '') {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Basic length constraints (1-50 characters)
    if (trimmedName.length < 1 || trimmedName.length > 50) {
        return false;
    }
    
    // Common surname patterns:
    // 1. Allow letters (including accented characters and ligatures)
    // 2. Allow hyphens, apostrophes, and spaces (for compound surnames)
    // 3. Allow numbers in some cases (e.g., "Vanderbilt III")
    const surnamePattern = /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}\d]+)*$/u;
    
    if (!surnamePattern.test(trimmedName)) {
        return false;
    }
    
    // Additional common-sense rules
    
    // No consecutive special characters
    if (/[ '\-]{2,}/.test(trimmedName)) {
        return false;
    }
    
    // Cannot start or end with special characters
    if (/^[ '\-]|[ '\-]$/.test(trimmedName)) {
        return false;
    }
    
    // No digits-only segments
    const segments = trimmedName.split(/[ '\-]/);
    for (const segment of segments) {
        if (/^\d+$/.test(segment)) {
            return false;
        }
    }
    
    // Check for absurdly short segments (minimum 1 character per segment)
    for (const segment of segments) {
        if (segment.length < 1) {
            return false;
        }
    }
    
    return true;
}
