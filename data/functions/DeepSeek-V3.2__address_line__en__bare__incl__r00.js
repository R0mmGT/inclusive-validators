function validate(address) {
    // Basic null/undefined/empty checks
    if (typeof address !== 'string') return false;
    
    const trimmed = address.trim();
    if (trimmed.length === 0) return false;
    
    // Minimum length check (must contain at least house number and street name components)
    if (trimmed.length < 4) return false;
    
    // Maximum reasonable length for a street address line
    if (trimmed.length > 200) return false;
    
    // Check for common patterns across many address formats
    const tests = [
        // Contains at least one digit (house/building number)
        () => /\d/.test(trimmed),
        
        // Contains letters (street name, city, etc.)
        () => /[a-zA-Z\u00C0-\u024F\u0400-\u04FF]/.test(trimmed),
        
        // Valid characters check (allows international scripts, common punctuation)
        () => /^[\p{L}\p{N}\s\-\.,#'/\\\u00C0-\u024F\u0400-\u04FF\u4E00-\u9FFF\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0590-\u05FF\u4DC0-\u4DFF]+$/u.test(trimmed),
        
        // Not just repeating characters
        () => !/^(.)\1+$/.test(trimmed),
        
        // Must have at least one space or common address separator
        () => /[\s\-\.,]/.test(trimmed),
        
        // Contains at least two distinct "words" (components)
        () => trimmed.split(/[\s\-\.,]+/).filter(w => w.length > 0).length >= 2,
        
        // Not a common invalid pattern (e.g., "undefined", "null", "test")
        () => !/^(undefined|null|test|example|asdf|qwerty)$/i.test(trimmed),
        
        // No excessive whitespace
        () => !/\s{3,}/.test(trimmed),
        
        // No excessive special characters
        () => (trimmed.match(/[^\p{L}\p{N}\s]/gu) || []).length <= 10,
        
        // Valid structure: should not end with only a number (unless it's a common pattern like "Street 1")
        () => !/^\D+\d+$/.test(trimmed) || /^(.*\D+.*)\d+$/.test(trimmed),
        
        // Check ratio of letters to numbers (reasonable address should have both)
        () => {
            const letters = (trimmed.match(/\p{L}/gu) || []).length;
            const numbers = (trimmed.match(/\p{N}/gu) || []).length;
            return letters > 0 && numbers > 0 && (letters + numbers) >= trimmed.length * 0.3;
        }
    ];
    
    // Run all tests
    for (const test of tests) {
        if (!test()) return false;
    }
    
    return true;
}
