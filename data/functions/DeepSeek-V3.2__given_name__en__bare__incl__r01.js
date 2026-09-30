function validate(name) {
    // Check basic requirements
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    
    // Empty or whitespace-only strings are invalid
    if (trimmed.length === 0) return false;
    
    // Check minimum and maximum length (adjustable based on requirements)
    if (trimmed.length < 1 || trimmed.length > 128) return false;
    
    // Check for obviously invalid characters
    // First names should not contain numbers, mathematical symbols, or other non-name characters
    // but should allow letters, apostrophes, hyphens, spaces, and diacritics
    const invalidCharPattern = /[\d\[\]{}<>|=+*^%$#@!~`?\\/]/;
    if (invalidCharPattern.test(trimmed)) return false;
    
    // Check for consecutive special characters or starting/ending with them
    const specialCharsPattern = /['\-\.\s]/;
    if (specialCharsPattern.test(trimmed[0]) || specialCharsPattern.test(trimmed[trimmed.length - 1])) {
        return false;
    }
    
    // Check for consecutive special characters
    const consecutiveSpecialPattern = /['\-\.\s]{2,}/;
    if (consecutiveSpecialPattern.test(trimmed)) return false;
    
    // Must contain at least one letter from any language
    // This regex matches letters from various scripts including Latin, Cyrillic, Arabic, Chinese, etc.
    const letterPattern = /\p{L}/u;
    if (!letterPattern.test(trimmed)) return false;
    
    // Check for mixed scripts that don't typically appear together
    // This is a basic check - in reality, this is complex due to transliterations
    const scripts = [];
    for (const char of trimmed) {
        if (char.match(/\p{L}/u)) {
            // Simple script detection (not exhaustive but covers common cases)
            if (char.match(/[\u0000-\u007F]/) && !scripts.includes('Latin')) scripts.push('Latin');
            else if (char.match(/[\u0600-\u06FF]/) && !scripts.includes('Arabic')) scripts.push('Arabic');
            else if (char.match(/[\u0400-\u04FF]/) && !scripts.includes('Cyrillic')) scripts.push('Cyrillic');
            else if (char.match(/[\u4E00-\u9FFF]/) && !scripts.includes('CJK')) scripts.push('CJK');
            else if (char.match(/[\u0E00-\u0E7F]/) && !scripts.includes('Thai')) scripts.push('Thai');
            else if (char.match(/[\u0590-\u05FF]/) && !scripts.includes('Hebrew')) scripts.push('Hebrew');
            
            // If we detect too many different scripts, it's suspicious
            if (scripts.length > 2) return false;
        }
    }
    
    // Additional check: Ensure there's a reasonable ratio of letters to total characters
    const lettersOnly = trimmed.replace(/[^\\p{L}]/gu, '');
    if (lettersOnly.length < Math.ceil(trimmed.length * 0.5)) return false;
    
    return true;
}
