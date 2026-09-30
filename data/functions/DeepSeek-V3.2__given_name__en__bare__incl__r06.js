function validate(name) {
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    if (trimmed.length === 0) return false;
    
    // Length constraints (extremely long names might be data entry errors)
    if (trimmed.length > 100) return false;
    
    // Common first name patterns across cultures:
    // 1. Should not contain only numbers or symbols
    if (/^[\d\s\p{P}]+$/u.test(trimmed)) return false;
    
    // 2. Should contain at least one letter from any language
    if (!/\p{L}/u.test(trimmed)) return false;
    
    // 3. Should not contain obviously non-name characters
    // Allow letters, spaces, hyphens, apostrophes (common in names like O'Connor, Jean-Luc)
    // Allow combining marks for characters with diacritics
    // Allow characters from all scripts
    const validPattern = /^[\p{L}\p{M}\s'-]+$/u;
    if (!validPattern.test(trimmed)) return false;
    
    // 4. Should not start or end with separators
    if (/^[\s'-]|[\s'-]$/.test(trimmed)) return false;
    
    // 5. Should not have consecutive separators
    if (/[\s'-]{2,}/.test(trimmed)) return false;
    
    // 6. Check for common titles or honorifics that aren't first names
    const commonTitles = /\b(mr|mrs|miss|ms|dr|prof|sir|lord|lady|dame|rev|fr|hr|sr|jr|md|phd)\b/i;
    if (commonTitles.test(trimmed)) return false;
    
    // 7. Should not be entirely composed of common words that aren't typically names
    // (This is imperfect but catches obvious non-names)
    const commonNonNameWords = /\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by)\b/i;
    const words = trimmed.split(/[\s-]+/);
    if (words.length === 1 && commonNonNameWords.test(trimmed.toLowerCase())) {
        return false;
    }
    
    // 8. Should contain at least one valid "core" name part (excluding separators)
    const coreName = trimmed.replace(/[\s'-]+/g, '');
    if (coreName.length === 0) return false;
    
    // 9. Names can contain multiple parts (like "Mary Anne", "Jean-Luc")
    // Each part should be valid
    const parts = trimmed.split(/[\s-]+/);
    for (const part of parts) {
        if (part.length === 0) return false;
        if (part.length === 1 && !/[a-zA-Z]/i.test(part)) return false;
        // Single character names exist (like "E" or "Q" in some cultures)
        // but we require they be letters
        
        // Check for repeated single characters (like "AAA")
        if (/^(.)\1+$/.test(part) && part.length > 2) return false;
    }
    
    return true;
}
