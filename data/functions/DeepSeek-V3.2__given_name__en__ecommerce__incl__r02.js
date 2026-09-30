function validate(name) {
    // Check if input is a non-empty string
    if (typeof name !== 'string' || name.length === 0) {
        return false;
    }
    
    // Trim whitespace from both ends
    const trimmedName = name.trim();
    
    // Check if trimmed name is not empty
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Check for minimum and maximum reasonable length
    // Considering names like "Xi" (Chinese) and "Wolfeschlegelsteinhausenbergerdorff" (German)
    if (trimmedName.length < 1 || trimmedName.length > 100) {
        return false;
    }
    
    // Check for valid Unicode letters, spaces, hyphens, and apostrophes
    // This regex matches Unicode letters from any language, plus common name separators
    const validNamePattern = /^[\p{L}\p{M}\s\-'.]+$/u;
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }
    
    // Check for consecutive special characters (no double spaces, hyphens, etc.)
    const consecutiveSpecialChars = /[\s\-'.]{2,}/;
    if (consecutiveSpecialChars.test(trimmedName)) {
        return false;
    }
    
    // Check if name starts or ends with special characters (except apostrophe for names like O'Connor)
    const invalidStart = /^[\s\-.]/;
    const invalidEnd = /[\s\-.']$/;
    if (invalidStart.test(trimmedName) || invalidEnd.test(trimmedName)) {
        return false;
    }
    
    // Check for at least one letter character (not just special characters)
    const hasLetter = /\p{L}/u.test(trimmedName);
    if (!hasLetter) {
        return false;
    }
    
    // Additional check for potentially problematic patterns
    // Prevent names that are just numbers or symbols disguised with letters
    const onlySymbolsAndNumbers = /^[0-9\p{S}\p{P}]+$/u;
    if (onlySymbolsAndNumbers.test(trimmedName.replace(/[\s\-'.]/g, ''))) {
        return false;
    }
    
    return true;
}
