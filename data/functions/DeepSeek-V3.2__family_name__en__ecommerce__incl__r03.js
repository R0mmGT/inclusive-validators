function validate(lastName) {
    // Check if input is a string
    if (typeof lastName !== 'string') {
        return false;
    }
    
    // Trim whitespace and check if empty
    const trimmed = lastName.trim();
    if (trimmed.length === 0) {
        return false;
    }
    
    // Universal validation rules for names across cultures:
    
    // 1. Check for minimum and reasonable maximum length
    // Some cultures have very short or very long last names
    if (trimmed.length < 1 || trimmed.length > 100) {
        return false;
    }
    
    // 2. Check for control characters or unsafe characters
    if (/[\x00-\x1F\x7F]/.test(trimmed)) {
        return false;
    }
    
    // 3. Check for potentially malicious patterns (excessive special characters)
    // Allow common name characters: letters, spaces, hyphens, apostrophes, dots, and various diacritics
    // Count non-letter-or-allowed-punctuation characters
    const suspiciousMatch = trimmed.match(/[^\p{L}\s\-'’.()]/gu);
    if (suspiciousMatch && suspiciousMatch.length > Math.ceil(trimmed.length / 4)) {
        // If more than 25% of characters are unusual, reject
        return false;
    }
    
    // 4. Check for excessive repeating characters
    if (/(.)\1{4,}/.test(trimmed)) {
        // 5 or more of the same character in a row
        return false;
    }
    
    // 5. Check for invalid sequences
    // Names shouldn't start or end with certain punctuation (though some start with apostrophe)
    if (/^[\s\-'.()]|[\s\-'.()]$/.test(trimmed.replace(/^['‘’`]|['‘’`]$/g, ''))) {
        // Check if name starts or ends with punctuation after removing leading/trailing quotes
        return false;
    }
    
    // 6. Check for consecutive punctuation (except for hyphenated names or O'Connor style)
    if (/[\s\-'.()]{2,}/.test(trimmed.replace(/^['‘’`]|['‘’`]$/g, ''))) {
        return false;
    }
    
    // 7. Must contain at least one letter character from any language
    if (!/\p{L}/u.test(trimmed)) {
        return false;
    }
    
    // 8. Additional cultural considerations:
    // - Chinese names can be single character
    // - Hispanic names often have multiple parts (García López)
    // - Arabic names can have "al-" or "el-" prefixes
    // - French names can have "de la", "du", etc.
    // - Dutch names can have "van der", etc.
    // - Scandinavian names can have spaces
    // - All of these are covered by our general rules
    
    return true;
}
