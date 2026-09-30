function validate(name) {
    // Must be a non-empty string
    if (typeof name !== 'string' || name.trim() === '') {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Must contain at least two words (first and last name)
    const words = trimmedName.split(/\s+/);
    if (words.length < 2) {
        return false;
    }
    
    // Each part must start with a capital letter and follow with lowercase letters
    // Allows for hyphenated names, apostrophes, and common accented characters
    const namePartRegex = /^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ'\-]+$/;
    
    for (const word of words) {
        // Check each name part against the pattern
        if (!namePartRegex.test(word)) {
            return false;
        }
        
        // Additional validation for hyphenated parts
        if (word.includes('-')) {
            const hyphenParts = word.split('-');
            // Each part of hyphenated name must start with capital letter
            for (const part of hyphenParts) {
                if (part.length === 0 || !/^[A-ZÀ-ÖØ-Þ]/.test(part[0])) {
                    return false;
                }
            }
        }
    }
    
    // Check for minimum and maximum reasonable lengths
    if (trimmedName.length < 3 || trimmedName.length > 100) {
        return false;
    }
    
    // Check for consecutive special characters or invalid patterns
    if (/(['\-])\1/.test(trimmedName) || /['\-]$/.test(trimmedName) || /^['\-]/.test(trimmedName)) {
        return false;
    }
    
    return true;
}
