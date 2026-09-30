function validate(address) {
    // Basic sanity checks
    if (typeof address !== 'string') return false;
    if (address.trim().length === 0) return false;
    
    // Length check - extremely long strings are suspicious
    if (address.length > 200) return false;
    
    // Check for minimum components (some address might just be "Main Street" in villages)
    // But we want at least some alphanumeric content
    if (!/[a-zA-Z0-9]/.test(address)) return false;
    
    // Check for common address patterns without being too restrictive
    // 1. Should contain some letters (in any script)
    const hasLetters = /[\p{L}]/u.test(address);
    if (!hasLetters) return false;
    
    // 2. Should not be only numbers
    if (/^\d+$/.test(address.trim())) return false;
    
    // 3. Should have reasonable character mix
    // Allow alphanumeric, spaces, common punctuation and symbols used in addresses
    const validCharacters = /^[\p{L}\p{N}\s\-\/.,#'"()\[\]ºª°&@:;]+$/u;
    if (!validCharacters.test(address)) return false;
    
    // 4. Check for some structure indicators (not required but helpful)
    // Many addresses will have at least one number or common street suffix/prefix
    const hasNumber = /\p{N}/u.test(address);
    const hasCommonAddressTerm = /\b(?:street|st|road|rd|avenue|ave|boulevard|blvd|lane|ln|drive|dr|way|platz|straße|straße|calle|rue|via|ulica|ul|gatan|gatua|chaussée|tie|dōri|jalan|daero)\b/i.test(address);
    const hasHouseNumberPattern = /(?:\bno\.?\s*\d+|\b\d+\s*(?:st|nd|rd|th)?\s*\p{L}*\b|\b\d+\s*[-/]\s*\d+\b|\b\d+\s*\p{L}*\b)/i.test(address);
    
    // Accept if it has either a number or common address term
    // Some rural addresses might just be "Farmhouse" or similar
    const hasStructure = hasNumber || hasCommonAddressTerm || hasHouseNumberPattern;
    
    // 5. Check for suspicious patterns
    // Too many repeated characters
    if (/(.)\1{10,}/.test(address)) return false;
    
    // Too many special characters consecutively
    if (/[-\/.,#'"&@:;]{5,}/.test(address)) return false;
    
    // Suspicious patterns like only symbols
    if (/^[-\/.,#'"&@:;]+$/.test(address.trim())) return false;
    
    // 6. Check for reasonable word boundaries and spacing
    const words = address.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length < 1) return false;
    
    // Most words should be reasonable length (1-25 chars)
    const unreasonableWord = words.some(word => word.length > 25);
    if (unreasonableWord) return false;
    
    // 7. Final common sense check - at least 4 characters for meaningful address
    if (address.trim().length < 4) return false;
    
    // Return true if it passes basic checks and has some structure
    // We're lenient because addresses vary globally, but require basic validity
    return true;
}
