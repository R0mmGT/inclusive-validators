function validate(address) {
    // Basic checks
    if (typeof address !== 'string') return false;
    
    const trimmed = address.trim();
    if (trimmed.length === 0) return false;
    
    // Addresses should contain some alphanumeric characters (not just symbols/spaces)
    if (!/[a-zA-Z0-9]/.test(trimmed)) return false;
    
    // Excessive length check (reasonable upper bound for a street address)
    if (trimmed.length > 200) return false;
    
    // Check for at least one number (house/building number) in most formats
    // This is a common pattern but not universal - we'll make it lenient
    const hasNumber = /\d/.test(trimmed);
    
    // Look for common address components
    // Street names typically contain letters or common address words
    const hasStreetName = /[a-zA-Z\u00C0-\u017F]/.test(trimmed); // Including common Latin accented chars
    
    // Check for common address indicators that don't require Western format
    const commonIndicators = [
        // Building/unit indicators from various cultures
        /(单元|单元号|室|号|棟|栋|樓|楼|號)/, // Chinese/Japanese/Korean indicators
        /(unit|apt|apartment|suite|ste|fl|floor|level|lvl|room|rm)/i,
        /(no\.?|number|nr|num|#)/i,
        /(дом|корп|квартира|кв|помещение)/i, // Russian indicators
        // Street type indicators
        /(st|street|ave|avenue|rd|road|dr|drive|ln|lane|blvd|boulevard)/i,
        /(路|街|道|通り|가|길|راه|شارع)/, // Street in various scripts
        // Directional indicators
        /(north|south|east|west|n|s|e|w)/i,
        /(norte|sur|este|oeste)/i,
        /(北|南|东|西|上|下)/ // Chinese directions
    ];
    
    const hasIndicator = commonIndicators.some(pattern => pattern.test(trimmed));
    
    // Valid address must have either:
    // 1. Number + street name (common Western format)
    // 2. Any indicator + some text
    // 3. Any non-Western script with reasonable length
    // 4. At least 3 alphanumeric characters total
    
    // Check for non-Latin scripts
    const nonLatinScript = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u10A0-\u10FF\u2D00-\u2D2F\u4E00-\u9FFF\uAC00-\uD7AF\u3040-\u309F\u30A0-\u30FF]/.test(trimmed);
    
    // Check minimum alphanumeric character count
    const alnumCount = (trimmed.match(/[a-zA-Z0-9\u00C0-\u017F]/g) || []).length;
    
    // Final validation logic
    if (nonLatinScript) {
        // For non-Latin scripts, be more lenient but require minimum length
        return trimmed.length >= 4 && alnumCount >= 2;
    }
    
    // For Latin-based scripts
    const hasValidComponents = (hasNumber && hasStreetName) || hasIndicator;
    const hasMinimumContent = alnumCount >= 3 && trimmed.length >= 6;
    
    return hasValidComponents && hasMinimumContent;
}
