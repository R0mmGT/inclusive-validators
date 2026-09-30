function validate(name) {
    // Check for valid input type
    if (typeof name !== 'string') {
        return false;
    }
    
    // Trim whitespace and check minimum length
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed.length > 100) {
        return false;
    }
    
    // Must contain at least one space separating parts
    if (!trimmed.includes(' ')) {
        return false;
    }
    
    // Split into name parts
    const parts = trimmed.split(/\s+/);
    
    // Must have at least 2 parts (first and last name)
    if (parts.length < 2) {
        return false;
    }
    
    // Each part must:
    // - Start with uppercase letter
    // - Contain only letters, hyphens, or apostrophes
    // - Have minimum length of 2 characters for first and last name
    // - Have proper capitalization (first letter uppercase, rest lowercase)
    const nameRegex = /^[A-Z][a-z]+(?:[-'][a-z]+)*$/;
    
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        
        // Check minimum length for first and last name
        if ((i === 0 || i === parts.length - 1) && part.length < 2) {
            return false;
        }
        
        // Validate format
        if (!nameRegex.test(part)) {
            return false;
        }
    }
    
    // Reject common invalid patterns
    const invalidPatterns = [
        /^[A-Z]\./i,            // Initials like "J. Doe"
        /[0-9]/,                // Any numbers
        /[^A-Za-z\s\-']/,       // Invalid characters
        /\b(?:Mr|Mrs|Ms|Dr|Prof)\.?\b/i  // Titles
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) {
            return false;
        }
    }
    
    return true;
}
