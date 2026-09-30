function validate(address) {
    if (typeof address !== 'string') {
        return false;
    }
    
    const trimmed = address.trim();
    
    // Basic checks for empty or too short addresses
    if (trimmed.length === 0 || trimmed.length < 4) {
        return false;
    }
    
    // Check for at least one digit (street numbers are common worldwide)
    // but some addresses might use local numbering systems
    const hasDigit = /\d/.test(trimmed);
    
    // Check for at least some alphabetic characters (could be in any script)
    // This regex matches letters from multiple scripts including Latin, Cyrillic, CJK, Arabic, etc.
    const hasLetters = /[\p{L}\p{M}]/u.test(trimmed);
    
    // Check for excessive repeated characters or nonsensical patterns
    const excessiveRepeats = /(.)\1{10,}/.test(trimmed); // 11+ repeated characters
    
    // Check for minimum meaningful components
    // At minimum we expect something like "123 Main" or "東京1-2-3"
    const tokens = trimmed.split(/\s+/).filter(token => token.length > 0);
    if (tokens.length < 2) {
        return false;
    }
    
    // Check for reasonable character distribution (not all symbols or whitespace)
    const letterDigitCount = (trimmed.match(/[\p{L}\p{M}\p{N}]/gu) || []).length;
    const symbolCount = (trimmed.match(/[^\p{L}\p{M}\p{N}\s]/gu) || []).length;
    
    // Should have reasonable ratio of meaningful chars to symbols
    if (letterDigitCount === 0 || symbolCount > letterDigitCount * 2) {
        return false;
    }
    
    // Common address patterns across cultures
    const patterns = [
        // Western style: "123 Main St" or "Avenue des Champs-Élysées 1"
        /^\d+\s+[\p{L}\p{M}\s\-\.']+/ui,
        // Japanese style: "東京都渋谷区1-2-3"
        /^[\p{L}\p{M}]+[\d\-\s]+/ui,
        // Reverse order: "ул. Ленина, 1" (Cyrillic)
        /^[\p{L}\p{M}\s\.\-]+\s+\d+/ui,
        // Indian style: "123, Gandhi Road" or "House No. 123"
        /^(House\s+No\.|No\.\s*\d+)/i,
        // Number with suffix: "1st Street" or "2nd Ave"
        /^\d+(st|nd|rd|th)?\s+[\p{L}\p{M}]/ui,
        // PO Box style: "PO Box 123" or "Postfach 456"
        /^(P\.?\s*O\.?\s*Box|Postfach|BP|Casilla)\s+\d+/i,
        // Just a simple address starting with letter then number
        /^[\p{L}\p{M}]+\s+\d+/ui,
    ];
    
    // Check if address matches any common pattern
    const matchesPattern = patterns.some(pattern => pattern.test(trimmed));
    
    // Additional heuristic: check for common address indicators
    const addressIndicators = [
        'street', 'st', 'avenue', 'ave', 'road', 'rd', 'boulevard', 'blvd',
        'lane', 'ln', 'drive', 'dr', 'court', 'ct', 'place', 'pl', 'way',
        'strasse', 'straße', 'platz', 'allee', 'gasse', 'проспект', 'улица',
        'ул', 'просп', 'רחוב', 'شارع', 'ถนน', ' đường', '路', '街', '大街'
    ];
    
    const hasIndicator = addressIndicators.some(indicator => 
        trimmed.toLowerCase().includes(indicator.toLowerCase())
    );
    
    // Validation passes if:
    // 1. Has letters (in any script)
    // 2. Not excessive repeats
    // 3. Has reasonable character distribution
    // 4. Either matches a pattern, has a digit, or has an address indicator
    //    (some valid addresses might not have digits in certain contexts)
    
    return hasLetters && 
           !excessiveRepeats && 
           letterDigitCount >= 3 &&
           (matchesPattern || hasDigit || hasIndicator);
}
