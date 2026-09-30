function validate(lastName) {
    // Check if input is a non-empty string
    if (typeof lastName !== 'string' || lastName.trim().length === 0) {
        return false;
    }
    
    const trimmed = lastName.trim();
    
    // Basic length constraints (adjustable as needed)
    if (trimmed.length < 1 || trimmed.length > 64) {
        return false;
    }
    
    // Allow letters from various scripts, hyphens, apostrophes, and spaces
    // Unicode ranges cover Latin, Cyrillic, Greek, Chinese, Japanese, Korean, Arabic, Hebrew, etc.
    const validPattern = /^[\p{L}\p{M}\s'-]+$/u;
    
    // Check if the string matches the valid pattern
    if (!validPattern.test(trimmed)) {
        return false;
    }
    
    // Additional common-sense rules
    // 1. Should not start or end with hyphen, apostrophe, or space
    if (/^[-'\s]|[-'\s]$/.test(trimmed)) {
        return false;
    }
    
    // 2. Should not contain consecutive hyphens, apostrophes, or spaces
    if (/[-'\s]{2,}/.test(trimmed)) {
        return false;
    }
    
    // 3. Should not contain only spaces, hyphens, or apostrophes
    if (!/[\p{L}\p{M}]/u.test(trimmed)) {
        return false;
    }
    
    return true;
}
