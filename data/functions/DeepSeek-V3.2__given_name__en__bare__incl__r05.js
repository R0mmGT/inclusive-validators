function validate(name) {
    // Check basic type and length constraints
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    if (trimmed.length < 1 || trimmed.length > 128) return false;
    
    // Check for empty after trimming
    if (!trimmed) return false;
    
    // Check for invalid characters that would never appear in a real first name
    // This includes control characters, certain symbols, and excessive whitespace
    const invalidCharPattern = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F<>{}[\]\\|^~%$#@*+=]/;
    if (invalidCharPattern.test(trimmed)) return false;
    
    // Check for excessive repeated characters (more than 3 in a row)
    if (/(.)\1\1\1/.test(trimmed)) return false;
    
    // Check for numbers
    if (/\d/.test(trimmed)) return false;
    
    // Names should contain at least one letter from any language
    // This regex matches letters from any script including Latin, Cyrillic, CJK, Arabic, etc.
    // Also includes letters with diacritics
    const hasLetter = /[\p{L}]/u.test(trimmed);
    if (!hasLetter) return false;
    
    // Names should not consist only of symbols or punctuation
    const onlySymbols = /^[\p{P}\p{S}\s]+$/u.test(trimmed);
    if (onlySymbols) return false;
    
    // Names can contain apostrophes, hyphens, spaces (for multi-part names),
    // and various punctuation used in different cultures
    const validNamePattern = /^[\p{L}\p{M}\s'\-\.]+$/u;
    
    return validNamePattern.test(trimmed);
}
