function validate(address) {
    // Basic type and length validation
    if (typeof address !== 'string') return false;
    
    const trimmed = address.trim();
    if (trimmed.length === 0) return false;
    if (trimmed.length > 200) return false; // Reasonable upper limit
    
    // Check for at least one digit (house/building number)
    // Many addresses include the number elsewhere (like "PO Box 123" or "Unit 5")
    // So we'll check for common patterns with numbers
    const hasNumber = /\d/.test(trimmed);
    
    // Check for common address components (flexible for international addresses)
    // Must have some meaningful content beyond just numbers or symbols
    const meaningfulChars = trimmed.replace(/[\d\s\W]/g, '');
    if (meaningfulChars.length < 2) return false;
    
    // Check for invalid patterns
    const invalidPatterns = [
        /^[\d\s\W]+$/, // Only numbers/symbols
        /^\d+$/, // Only digits
        /^[^a-zA-Z0-9#]+$/, // No alphanumeric characters at all
        /^(?:test|example|asdf|qwerty|abc|xxx)/i, // Common test patterns
        /(?:\.{3,}|-{3,}|_{3,})/, // Excessive repeated characters
        /[@|<>\\]/, // Characters that shouldn't appear in street addresses
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmed)) return false;
    }
    
    // Check for minimum components (at least 2 "parts" separated by space/comma)
    const parts = trimmed.split(/[\s,]+/).filter(part => part.length > 0);
    if (parts.length < 2) return false;
    
    // Allow various international formats while filtering obvious non-addresses
    // Must contain either:
    // 1. A number followed by street-related text, OR
    // 2. Common address prefixes/suffixes with meaningful content
    
    const addressIndicators = [
        // Building/unit indicators (international)
        /\b(?:no|number|num|nr|#|单元|单元号|号|house|building|bldg|bloc|bloco|édifice|gebäude|건물)\b/i,
        
        // Street type indicators (international examples)
        /\b(?:st|street|str|strasse|straße|rue|calle|calle|ulica|улица|via|weg|road|rd|avenue|ave|av|avenida|boulevard|blvd|blv|jalan|lorong|sokak|mhl)\b/i,
        
        // Common address words
        /\b(?:apartment|apt|suite|ste|unit|flat|room|rm|floor|lvl|level|po\s*box|p\.?o\.?\s*box|box|cp|case\s*postale|postfach|私書箱|صندوق\s*بريد)\b/i,
        
        // Directional indicators
        /\b(?:north|south|east|west|n|s|e|w|nord|sud|est|ouest|север|юг|восток|запад)\b/i,
    ];
    
    // Check if any address indicator is present
    const hasAddressIndicator = addressIndicators.some(indicator => indicator.test(trimmed));
    
    // Check for common patterns that resemble addresses
    const commonPatterns = [
        // Number followed by text (e.g., "123 Main St")
        /^\d+\s+[a-zA-Z]/i,
        // Text followed by number (e.g., "Main St 123")
        /[a-zA-Z]+\s+\d+$/i,
        // Contains both number and text
        /\d.*[a-zA-Z]|[a-zA-Z].*\d/,
    ];
    
    const hasCommonPattern = commonPatterns.some(pattern => pattern.test(trimmed));
    
    // Valid if: has a number AND (has address indicator OR common pattern)
    // OR: no number but has strong address indicator (like "PO Box" addresses)
    if (hasNumber) {
        return hasAddressIndicator || hasCommonPattern;
    } else {
        // For numberless addresses, require stronger indicators
        const strongIndicators = [
            /^po\s*box/i,
            /^post\s*office\s*box/i,
            /^apartment/i,
            /^suite/i,
            /^unit/i,
            /^flat/i,
            /\b(?:po\s*box|postfach|case\s*postale|私書箱)\b/i,
        ];
        return strongIndicators.some(indicator => indicator.test(trimmed));
    }
}
