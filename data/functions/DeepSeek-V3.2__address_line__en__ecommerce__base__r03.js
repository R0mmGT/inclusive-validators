function validate(address) {
    // Check if input is a non-empty string
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Check minimum length (at least "1 A" for the shortest possible valid address)
    if (trimmedAddress.length < 3) {
        return false;
    }
    
    // Check maximum reasonable length (typical database field limit)
    if (trimmedAddress.length > 100) {
        return false;
    }
    
    // Must contain at least one digit (for house/building number)
    if (!/\d/.test(trimmedAddress)) {
        return false;
    }
    
    // Must contain at least one letter (for street name)
    if (!/[a-zA-Z]/.test(trimmedAddress)) {
        return false;
    }
    
    // Should not contain only digits or only letters
    if (/^\d+$/.test(trimmedAddress) || /^[a-zA-Z\s]+$/.test(trimmedAddress)) {
        return false;
    }
    
    // Common invalid patterns
    const invalidPatterns = [
        /^test/i,
        /^asdf/i,
        /^qwerty/i,
        /^123456/i,
        /^abcdef/i,
        /^\s+|\s+$/g, // Leading/trailing spaces (already trimmed, but keep for completeness)
        /[<>{}[\]\\|`~!@#$%^&*+=]/ // Dangerous or unusual characters for addresses
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedAddress)) {
            return false;
        }
    }
    
    // Must contain at least one space (separating number from street)
    if (!/\s/.test(trimmedAddress)) {
        return false;
    }
    
    // Check for reasonable format: starts with number, contains street name
    // Split into words
    const words = trimmedAddress.split(/\s+/);
    
    // First or last word should contain a number (address number can be at beginning or end)
    const hasNumberAtStart = /^\d+[a-zA-Z]*$/.test(words[0]);
    const hasNumberAtEnd = /^\d+[a-zA-Z]*$/.test(words[words.length - 1]);
    
    if (!hasNumberAtStart && !hasNumberAtEnd) {
        // Check if number is in the middle (like "Apt 123 Main St")
        let hasNumberInMiddle = false;
        for (let i = 1; i < words.length - 1; i++) {
            if (/\d/.test(words[i])) {
                hasNumberInMiddle = true;
                break;
            }
        }
        if (!hasNumberInMiddle) {
            return false;
        }
    }
    
    // Must have at least 2 words (e.g., "123 Main" or "Main St 123")
    if (words.length < 2) {
        return false;
    }
    
    // Check for consecutive special characters or multiple consecutive spaces
    if (/[.,!?;:]{2,}/.test(trimmedAddress) || /\s{2,}/.test(trimmedAddress)) {
        return false;
    }
    
    // Valid street types (optional check)
    const streetTypes = ['st', 'street', 'ave', 'avenue', 'rd', 'road', 'blvd', 'boulevard', 
                        'ln', 'lane', 'dr', 'drive', 'ct', 'court', 'pl', 'place', 'way', 
                        'trl', 'trail', 'pkwy', 'parkway', 'hwy', 'highway'];
    
    // Check if at least one word ends with a street type (case insensitive)
    const hasStreetType = words.some(word => {
        const cleanWord = word.toLowerCase().replace(/[.,]/g, '');
        return streetTypes.includes(cleanWord);
    });
    
    // Not requiring street type as some valid addresses might not have it (e.g., "123 Main")
    
    return true;
}
