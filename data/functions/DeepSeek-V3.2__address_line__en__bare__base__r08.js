function validate(address) {
    // Check if input is a non-empty string
    if (typeof address !== 'string' || address.trim() === '') {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Basic length validation (reasonable street address range)
    if (trimmedAddress.length < 5 || trimmedAddress.length > 100) {
        return false;
    }
    
    // Must contain at least one digit (house/building number)
    if (!/\d/.test(trimmedAddress)) {
        return false;
    }
    
    // Must contain at least one letter (street name)
    if (!/[a-zA-Z]/.test(trimmedAddress)) {
        return false;
    }
    
    // Should not contain obviously invalid patterns
    const invalidPatterns = [
        /^\d+$/,                     // Only numbers
        /^[a-zA-Z\s]+$/,             // Only letters and spaces
        /^[^\w\s]+$/,                // Only symbols
        /https?:\/\//i,              // URLs
        /@[^\s]+/,                   // Email addresses
        /^\s*test\s*$/i,             // Just "test"
        /^\s*demo\s*$/i,             // Just "demo"
        /^\s*fake\s*$/i,             // Just "fake"
        /^\s*null\s*$/i,             // Just "null"
        /^\s*undefined\s*$/i,        // Just "undefined"
        /^[^a-zA-Z0-9]*$/,           // No alphanumeric characters
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedAddress)) {
            return false;
        }
    }
    
    // Must have at least one space separating address components
    // (house number and street name should be separated)
    if (!/\s/.test(trimmedAddress)) {
        return false;
    }
    
    // Valid characters check (allow letters, numbers, basic punctuation and spaces)
    const validCharacters = /^[a-zA-Z0-9\s\-\.,#&'"\/()]+$/;
    if (!validCharacters.test(trimmedAddress)) {
        return false;
    }
    
    // Check for reasonable structure: number should typically come first or last
    // but not require it to be strict since addresses vary internationally
    
    // Additional heuristic: should have at least 2 "words" (number + street)
    const wordCount = trimmedAddress.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 2) {
        return false;
    }
    
    // Check for consecutive special characters or too many special characters
    if (/([-\.,#&'"\/()])\1/.test(trimmedAddress)) {
        return false; // No consecutive special characters
    }
    
    const specialCharCount = (trimmedAddress.match(/[-\.,#&'"\/()]/g) || []).length;
    if (specialCharCount > 5) {
        return false; // Too many special characters
    }
    
    return true;
}
