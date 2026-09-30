function validate(name) {
    // Basic validation checks
    if (typeof name !== 'string') {
        return false;
    }
    
    // Trim whitespace and check if empty
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Check length - typical first names are 1-30 characters
    if (trimmedName.length < 1 || trimmedName.length > 30) {
        return false;
    }
    
    // Check for valid characters: letters, hyphens, apostrophes, spaces, and some accented characters
    // This regex allows letters (including accented), hyphens, apostrophes, and spaces
    // The name must start and end with a letter
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([-' ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    
    if (!nameRegex.test(trimmedName)) {
        return false;
    }
    
    // Additional validation rules
    
    // Check for consecutive special characters or spaces
    const consecutiveSpecialRegex = /[-']{2,}| {2,}/;
    if (consecutiveSpecialRegex.test(trimmedName)) {
        return false;
    }
    
    // Check if name starts or ends with special character (hyphen/apostrophe/space)
    if (trimmedName.startsWith('-') || trimmedName.startsWith("'") || trimmedName.startsWith(' ') ||
        trimmedName.endsWith('-') || trimmedName.endsWith("'") || trimmedName.endsWith(' ')) {
        return false;
    }
    
    // Check for mixed case validity - should have proper casing
    // Allow all lowercase, all uppercase, or properly capitalized (first letter capital, rest lowercase or mixed)
    const words = trimmedName.split(/[ -]/);
    
    for (let word of words) {
        // Check if word has at least one letter
        if (!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(word)) {
            return false;
        }
        
        // Optional: Check for unusual capitalization patterns
        // This allows: "McDonald", "DeLeon", "O'Brien", "Mary-Ann", etc.
        // Disallow: "mAry", "jOHN" (mixed case except first letter)
        const firstLetter = word[0];
        const restOfWord = word.slice(1);
        
        // If first letter is uppercase, rest can be any case (allows "McDonald")
        // If first letter is lowercase, entire word should be lowercase (allows "de" in "de Leon")
        if (/[A-ZÀ-Ö]/.test(firstLetter)) {
            // First letter is uppercase - acceptable
        } else if (/[a-zà-öø-ÿ]/.test(firstLetter)) {
            // First letter is lowercase - check if all letters in word are lowercase
            if (!/^[a-zà-öø-ÿ]+$/.test(word)) {
                return false;
            }
        }
    }
    
    // Check for common invalid patterns
    const invalidPatterns = [
        /^\d+$/, // Only numbers
        /^test$/i, // Test names
        /^admin$/i, // Admin
        /^user$/i, // User
        /^guest$/i, // Guest
        /^unknown$/i, // Unknown
        /^null$/i, // Null
        /^undefined$/i, // Undefined
        /^\.+$/, // Only dots
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedName)) {
            return false;
        }
    }
    
    return true;
}
