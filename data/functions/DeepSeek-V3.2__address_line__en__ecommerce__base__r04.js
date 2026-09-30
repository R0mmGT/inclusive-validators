function validate(address) {
    // Input must be a non-empty string
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmed = address.trim();
    
    // Length constraints (typical address line limits)
    if (trimmed.length < 5 || trimmed.length > 100) {
        return false;
    }
    
    // Must contain at least one digit for the street number
    if (!/\d/.test(trimmed)) {
        return false;
    }
    
    // Must contain at least one letter (for street name)
    if (!/[a-zA-Z]/.test(trimmed)) {
        return false;
    }
    
    // Common street patterns
    const streetPatterns = [
        /\d+\s+[a-zA-Z0-9\s\.\-#&']+/,  // Number followed by street name
        /(?:PO\s*Box|P\.O\.\s*Box|P O Box)\s+\d+/i,  // PO Box format
        /(?:Apt|Suite|Unit|Room|Floor|Fl|Ste|Rm|#)\s*(?:#?[a-zA-Z0-9\-]+)/i  // Address suffix patterns
    ];
    
    // Check if matches any valid street pattern
    const hasValidPattern = streetPatterns.some(pattern => pattern.test(trimmed));
    if (!hasValidPattern) {
        return false;
    }
    
    // Check for invalid characters (allow letters, numbers, spaces, basic punctuation)
    const invalidCharPattern = /[<>{}[\]\\|`~!@$%^*_+=;:"?]/;
    if (invalidCharPattern.test(trimmed)) {
        return false;
    }
    
    // Check for consecutive special characters or multiple spaces
    if (/[\.\-,&'#]{2,}/.test(trimmed) || /\s{2,}/.test(trimmed)) {
        return false;
    }
    
    // Must have at least 2 words (e.g., "123 Main" not "123")
    const wordCount = trimmed.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 2) {
        return false;
    }
    
    // Additional validation: street number should typically come first or after a unit designation
    const words = trimmed.split(/\s+/);
    const firstWord = words[0];
    const lastWord = words[words.length - 1];
    
    // Check if first word contains a number (common address format)
    const firstWordHasNumber = /\d/.test(firstWord);
    
    // Check if last word is a valid street type (optional but helpful)
    const streetTypes = [
        'street', 'st', 'avenue', 'ave', 'road', 'rd', 'boulevard', 'blvd',
        'lane', 'ln', 'drive', 'dr', 'court', 'ct', 'way', 'highway', 'hwy',
        'circle', 'cir', 'place', 'pl', 'parkway', 'pkwy', 'trail', 'trl'
    ];
    
    const lastWordIsStreetType = streetTypes.some(type => 
        lastWord.toLowerCase().replace(/[\.\-,]/g, '') === type
    );
    
    // If first word has no number, check if it's a unit designation
    const unitDesignations = ['apt', 'suite', 'unit', 'room', 'floor', 'ste', 'rm', '#'];
    const isUnitDesignation = unitDesignations.some(unit => 
        firstWord.toLowerCase().replace(/[\.\-,]/g, '') === unit
    );
    
    // Valid if: (first word has number OR is unit designation) AND has valid pattern
    if (!firstWordHasNumber && !isUnitDesignation) {
        // Check if any word contains a number (number could be elsewhere in the address)
        const hasNumberAnywhere = words.some(word => /\d/.test(word));
        if (!hasNumberAnywhere) {
            return false;
        }
    }
    
    return true;
}
