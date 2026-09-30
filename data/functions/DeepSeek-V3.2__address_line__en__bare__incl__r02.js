function validate(address) {
    // Basic validation
    if (typeof address !== 'string') return false;
    
    const trimmed = address.trim();
    if (trimmed.length === 0) return false;
    
    // Address should have some reasonable length limits
    if (trimmed.length < 3) return false;
    if (trimmed.length > 200) return false;
    
    // Check for excessive whitespace or newlines
    if (trimmed.includes('\n') || trimmed.includes('\r')) return false;
    if (/\s{3,}/.test(trimmed)) return false;
    
    // Check for at least one digit (most addresses have some number)
    // But be lenient for addresses like "Main Street" or "Town Square"
    // if they contain other address-like elements
    
    // Check for valid characters - allow international characters, numbers, basic punctuation
    // This regex allows letters from any language, numbers, common address punctuation
    const basicCharPattern = /^[\p{L}\p{N}\s\-\/\\.,#'"°ºª()\[\]]+$/u;
    if (!basicCharPattern.test(trimmed)) return false;
    
    // More specific validations that work across cultures:
    
    // 1. Should contain some letters (not just numbers/symbols)
    const hasLetters = /\p{L}/u.test(trimmed);
    if (!hasLetters) return false;
    
    // 2. Should not be a URL or email (common mistakes)
    const urlPattern = /^(https?:\/\/|www\.|\S+\.(com|org|net|edu))|(\S+@\S+\.\S+)/i;
    if (urlPattern.test(trimmed)) return false;
    
    // 3. Should have at least two "word-like" components (like "123 Main" or "Hauptstraße 42")
    // This allows for international number formats and address structures
    const wordLikeComponents = trimmed.match(/[\p{L}\p{N}]+/gu);
    if (!wordLikeComponents || wordLikeComponents.length < 2) return false;
    
    // 4. Check for obviously invalid patterns
    // Not just repeating same character
    if (/^(.)\1+$/.test(trimmed.replace(/\s+/g, ''))) return false;
    
    // 5. Check for reasonable structure - should have some variation
    // Not all the same type of character
    const letterCount = (trimmed.match(/\p{L}/gu) || []).length;
    const digitCount = (trimmed.match(/\p{N}/gu) || []).length;
    const spaceCount = (trimmed.match(/\s/g) || []).length;
    
    // At least some diversity in character types
    if (letterCount + digitCount + spaceCount < 3) return false;
    
    // 6. Additional cultural considerations:
    // - Allow various scripts (Latin, Cyrillic, Chinese, Arabic, etc.)
    // - Allow different address formats (西方, 丁目, улица, etc.)
    // - Allow apartment/floor indicators (Apt., #, -, /, etc.)
    
    return true;
}
