function validate(address) {
    // Basic validation for non-empty string
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Should not contain control characters or multiple consecutive spaces
    if (/[\x00-\x1F\x7F]/.test(trimmedAddress) || /\s\s+/.test(trimmedAddress)) {
        return false;
    }
    
    // Common street address patterns
    const patterns = [
        // Standard pattern: "123 Main St", "123 Main Street", "123 N Main St"
        /^\d+\s+[A-Za-z0-9\s\.\-#&']+$/,
        
        // PO Box pattern: "PO Box 123", "P.O. Box 123", "PO Box 123-A"
        /^(P\.?O\.?\s+)?Box\s+\d+[A-Za-z0-9\-]*$/i,
        
        // Rural route: "RR 1 Box 2", "Rural Route 1 Box 2"
        /^(R\.?R\.?|Rural\s+Route)\s+\d+\s+(Box\s+)?\d+[A-Za-z0-9\-]*$/i,
        
        // Highway/Route: "Highway 12", "Hwy 12", "Route 12", "Rt 12"
        /^(Highway|Hwy|Route|Rt)\.?\s+\d+[A-Za-z0-9\s\-]*$/i,
        
        // Address with unit/suite: "123 Main St Apt 4B", "123 Main St #4B", "123 Main St Unit 4-B"
        /^\d+\s+[A-Za-z0-9\s\.\-#&']+(Apt|Unit|Suite|Ste|#)\s*[A-Za-z0-9\-]+$/i,
        
        // Address with building: "Building 1 Suite 100"
        /^(Building|Bldg)\.?\s+\d+\s+[A-Za-z0-9\s\.\-#&']+$/i
    ];
    
    // Check if address matches any pattern
    for (const pattern of patterns) {
        if (pattern.test(trimmedAddress)) {
            return true;
        }
    }
    
    // Additional validation for minimum requirements
    // Must contain at least one number and one letter
    if (!/\d/.test(trimmedAddress) || !/[A-Za-z]/.test(trimmedAddress)) {
        return false;
    }
    
    // Must be within reasonable length (typical street addresses)
    if (trimmedAddress.length < 5 || trimmedAddress.length > 100) {
        return false;
    }
    
    // Must have at least one space separating address components
    if (!/\s/.test(trimmedAddress)) {
        return false;
    }
    
    // Default fallback for addresses that don't match patterns but seem reasonable
    return true;
}
