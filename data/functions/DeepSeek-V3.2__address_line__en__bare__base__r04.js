function validate(address) {
    // Reject non-string inputs or empty strings
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmed = address.trim();
    
    // Must have at least 2 parts (number + street name)
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) {
        return false;
    }
    
    // First part should be a building/house number pattern
    const firstPart = parts[0];
    
    // Common address number patterns:
    // 1. Simple numbers: "123", "1"
    // 2. Numbers with letters: "123A", "1B"
    // 3. Numbers with fractional: "123-1/2"
    // 4. Numbers with dash ranges: "123-125"
    const numberPattern = /^\d+([A-Za-z]|(-\d+(\/\d+)?))?$/;
    
    if (!numberPattern.test(firstPart)) {
        // Check if it's a common spelled-out number like "One", "First" etc.
        const spelledNumbers = [
            'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
            'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'
        ];
        
        const lowerFirst = firstPart.toLowerCase();
        if (!spelledNumbers.includes(lowerFirst)) {
            return false;
        }
    }
    
    // Must contain at least one alphabetic character after the number
    const hasAlphabetic = /[A-Za-z]/.test(trimmed.substring(firstPart.length));
    if (!hasAlphabetic) {
        return false;
    }
    
    // Common false positives to reject
    const rejectPatterns = [
        /^p\.?o\.?\s+box/i,               // PO Box
        /^box\s+\d+/i,                    // Box number
        /^general\s+delivery/i,           // General delivery
        /^[a-z]+\s+station/i,             // Something Station
        /^\d+\s*-\s*\d+\s*[a-z]*$/i,      // Just number ranges without street
        /^[^a-z]*$/i,                     // No letters at all
        /^\d+\s*$/                        // Just a number
    ];
    
    for (const pattern of rejectPatterns) {
        if (pattern.test(trimmed)) {
            return false;
        }
    }
    
    // Must contain a street type indicator (abbreviated or full)
    const streetTypes = [
        'street', 'st', 'avenue', 'ave', 'road', 'rd', 'boulevard', 'blvd',
        'lane', 'ln', 'drive', 'dr', 'court', 'ct', 'place', 'pl', 'square', 'sq',
        'way', 'terrace', 'ter', 'trail', 'trl', 'parkway', 'pkwy', 'circle', 'cir',
        'highway', 'hwy', 'route', 'rte', 'freeway', 'fw'
    ];
    
    const lastPart = parts[parts.length - 1].toLowerCase();
    const secondLastPart = parts.length > 2 ? parts[parts.length - 2].toLowerCase() : '';
    
    // Check if last part or combination of last two parts is a street type
    const isStreetType = streetTypes.includes(lastPart) || 
                        streetTypes.includes(secondLastPart + ' ' + lastPart);
    
    // Some valid addresses might use common directions instead
    const directionSuffixes = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw', 
                              'north', 'south', 'east', 'west', 
                              'northeast', 'northwest', 'southeast', 'southwest'];
    
    const hasDirection = directionSuffixes.includes(lastPart);
    
    // If it doesn't have a recognizable street type or direction suffix,
    // check if it has at least 3 parts and reasonable length
    if (!isStreetType && !hasDirection) {
        if (parts.length < 3) {
            return false;
        }
        
        // Reject if the last part looks like just a number
        if (/^\d+$/.test(lastPart)) {
            return false;
        }
    }
    
    // Minimum total length check (excluding number part)
    const addressWithoutNumber = trimmed.substring(firstPart.length).trim();
    if (addressWithoutNumber.length < 3) {
        return false;
    }
    
    return true;
}
