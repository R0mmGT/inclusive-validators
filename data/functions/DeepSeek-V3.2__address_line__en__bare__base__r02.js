function validate(address) {
    if (typeof address !== 'string') return false;
    
    const trimmed = address.trim();
    if (trimmed.length === 0) return false;
    if (trimmed.length > 100) return false;
    
    // Basic street address validation pattern
    // Should contain at least one number (house/building number) and street name
    const addressPattern = /^\d+\s+[\w\s\#\.\,\-\'\"\/\\]+$/i;
    
    if (!addressPattern.test(trimmed)) return false;
    
    // Additional validations
    const parts = trimmed.split(/\s+/);
    const firstPart = parts[0];
    
    // First part should be a number (house number)
    if (!/^\d+[a-zA-Z]?$/.test(firstPart)) return false;
    
    // Should contain at least 2 meaningful parts (number + street name)
    const meaningfulParts = parts.filter(part => {
        const cleanPart = part.replace(/[^a-zA-Z0-9]/g, '');
        return cleanPart.length > 0 && !/^\d+$/.test(cleanPart);
    });
    
    if (meaningfulParts.length < 1) return false;
    
    // Check for suspicious patterns (multiple consecutive special characters)
    if (/[\.\,\-\'\"\/\\]{2,}/.test(trimmed)) return false;
    
    // Check for valid street types/abbreviations
    const streetTypes = [
        'street', 'st', 'avenue', 'ave', 'road', 'rd', 'boulevard', 'blvd',
        'lane', 'ln', 'drive', 'dr', 'court', 'ct', 'circle', 'cir',
        'way', 'highway', 'hwy', 'parkway', 'pkwy', 'place', 'pl',
        'square', 'sq', 'terrace', 'ter', 'trail', 'trl'
    ];
    
    const lastPart = parts[parts.length - 1].toLowerCase().replace(/[^a-z]/g, '');
    const secondLastPart = parts.length > 1 ? parts[parts.length - 2].toLowerCase().replace(/[^a-z]/g, '') : '';
    
    const hasStreetType = streetTypes.includes(lastPart) || 
                         streetTypes.includes(secondLastPart) ||
                         trimmed.toLowerCase().match(/\b(st|ave|rd|blvd|dr|ln|ct|cir|hwy|pkwy|pl|sq|ter|trl)\b/);
    
    if (!hasStreetType) return false;
    
    return true;
}
