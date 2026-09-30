function validate(address) {
    // Check if input is a non-empty string
    if (typeof address !== 'string' || address.trim() === '') {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Check length constraints (typical street addresses are between 5-100 chars)
    if (trimmedAddress.length < 5 || trimmedAddress.length > 100) {
        return false;
    }
    
    // Check for valid characters - allow letters, digits, spaces, basic punctuation
    const validCharRegex = /^[a-zA-Z0-9\s.,#'-]+$/;
    if (!validCharRegex.test(trimmedAddress)) {
        return false;
    }
    
    // Must contain at least one digit (house/building number)
    const hasNumber = /\d/.test(trimmedAddress);
    if (!hasNumber) {
        return false;
    }
    
    // Must contain at least one letter (street name)
    const hasLetter = /[a-zA-Z]/.test(trimmedAddress);
    if (!hasLetter) {
        return false;
    }
    
    // Check for consecutive special characters or spaces
    const consecutiveSpecialChars = /[.,#'-]{2,}/.test(trimmedAddress);
    const consecutiveSpaces = /\s{2,}/.test(trimmedAddress);
    if (consecutiveSpecialChars || consecutiveSpaces) {
        return false;
    }
    
    // Check if address starts or ends with special character
    const startsWithSpecial = /^[.,#'-]/.test(trimmedAddress);
    const endsWithSpecial = /[.,#'-]$/.test(trimmedAddress);
    if (startsWithSpecial || endsWithSpecial) {
        return false;
    }
    
    // Ensure minimum structure: number + street name (e.g., "123 Main St")
    const addressParts = trimmedAddress.split(/\s+/);
    if (addressParts.length < 2) {
        return false;
    }
    
    // Look for a number in the first 3 parts (typically house number comes first)
    const firstThreeParts = addressParts.slice(0, 3).join(' ');
    const hasNumberInBeginning = /\d/.test(firstThreeParts);
    if (!hasNumberInBeginning) {
        return false;
    }
    
    // Check for common invalid patterns
    const invalidPatterns = [
        /^test\s/i,
        /^example\s/i,
        /^\d+\s*$/,
        /^[a-zA-Z]+\s*$/,
        /^address\s/i,
        /^street\s/i,
        /^[\d\s]+$/
    ];
    
    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedAddress)) {
            return false;
        }
    }
    
    return true;
}
