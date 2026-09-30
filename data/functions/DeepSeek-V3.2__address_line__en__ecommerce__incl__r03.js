function validate(address) {
    // Basic input validation
    if (typeof address !== 'string') {
        return false;
    }
    
    const trimmed = address.trim();
    
    // Empty or whitespace-only addresses are invalid
    if (trimmed.length === 0) {
        return false;
    }
    
    // Address must be within reasonable length (typical max for address lines)
    if (trimmed.length > 200) {
        return false;
    }
    
    // Check for minimum meaningful content (at least one letter or number)
    if (!/[a-zA-Z0-9]/.test(trimmed)) {
        return false;
    }
    
    // Address should contain some street identification
    // This checks for patterns that indicate a street address rather than just random text
    const addressIndicators = [
        // Building/house numbers in various formats
        /\d+/,  // Contains at least one digit (house/building number)
        
        // Common address components (case insensitive)
        /(?:street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln|way|platz|straße|straße|calle|rue|via|ulica|ul|gatve|g\.|tie|katu)/i,
        
        // Building indicators
        /(?:house|building|bldg|apt|apartment|suite|ste|room|rm|floor|fl|unit|flat|block|blk)/i,
        
        // Directional indicators (often part of addresses)
        /(?:north|south|east|west|n|s|e|w|nw|ne|sw|se)/i
    ];
    
    // Check if address contains at least one indicator
    const hasIndicator = addressIndicators.some(pattern => pattern.test(trimmed));
    if (!hasIndicator) {
        // Even without traditional indicators, allow addresses with numbers
        // that might be just house number + local street name
        if (!/\d/.test(trimmed)) {
            return false;
        }
    }
    
    // Check for suspicious patterns (potential injection attempts or gibberish)
    const suspiciousPatterns = [
        // Repeated non-alphanumeric characters
        /[^\w\s]{4,}/,
        
        // Excessive repetition of characters
        /(.)\1{5,}/,
        
        // Potentially malicious patterns
        /<script|javascript:|on\w+\s*=|eval\(|alert\(/i,
        
        // Excessive whitespace
        /\s{10,}/
    ];
    
    if (suspiciousPatterns.some(pattern => pattern.test(trimmed))) {
        return false;
    }
    
    // Validate basic structure - should have some variety of characters
    const alphanumericCount = (trimmed.match(/[a-zA-Z0-9]/g) || []).length;
    if (alphanumericCount < 3) {
        return false;
    }
    
    // Check for reasonable ratio of alphanumeric to total characters
    const alphanumericRatio = alphanumericCount / trimmed.length;
    if (alphanumericRatio < 0.3) { // Too many special characters
        return false;
    }
    
    // Allow international characters (accented letters, non-Latin scripts)
    // This is intentionally permissive for international addresses
    
    return true;
}
