function validate(address) {
    // Check basic requirements
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmed = address.trim();
    
    // Length constraints (typical address line constraints)
    if (trimmed.length < 5 || trimmed.length > 100) {
        return false;
    }
    
    // Must contain at least one digit (for house/building number)
    if (!/\d/.test(trimmed)) {
        return false;
    }
    
    // Must contain at least one letter
    if (!/[a-zA-Z]/.test(trimmed)) {
        return false;
    }
    
    // Common address patterns
    const patterns = [
        // Number then street (123 Main St)
        /^\d+\s+[a-zA-Z0-9\s\.\-,#]+$/,
        // Street then number (Main St 123)
        /^[a-zA-Z0-9\s\.\-,#]+\s+\d+$/,
        // Number with optional unit (123-A Main St, 123/456 Main St)
        /^\d+[\-\/\w]*\s+[a-zA-Z0-9\s\.\-,#]+$/,
        // PO Box addresses
        /^(P\.?O\.?\s+Box|PO Box)\s+\d+[\s\w]*$/i
    ];
    
    // Check if address matches any valid pattern
    const matchesPattern = patterns.some(pattern => pattern.test(trimmed));
    
    // Additional validation checks
    const hasInvalidSequences = /[\.\-,#]{2,}/.test(trimmed) ||  // No consecutive special chars
                               /^\W+/.test(trimmed) ||           // Cannot start with special char
                               /\s{2,}/.test(trimmed) ||         // No multiple consecutive spaces
                               /[\t\n\r]/.test(trimmed);         // No tabs or newlines
    
    // Common invalid terms (could be expanded based on business rules)
    const invalidTerms = [
        /example/i,
        /test/i,
        /fake/i,
        /dummy/i,
        /\b123\s+abc\b/i,
        /\baddress\s+here\b/i
    ];
    
    const hasInvalidTerms = invalidTerms.some(term => term.test(trimmed));
    
    return matchesPattern && !hasInvalidSequences && !hasInvalidTerms;
}
