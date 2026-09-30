function validate(phoneString) {
    // Trim whitespace from both ends
    const trimmed = phoneString.trim();
    
    // Return false for empty strings after trimming
    if (!trimmed.length) return false;
    
    // Check for basic phone number structure:
    // 1. Should contain at least 3 digits (world's shortest valid phone numbers)
    // 2. Should not contain letters (except plus, parentheses, dashes, spaces, dots)
    // 3. Should start with optional +, optional country code, then rest of number
    
    // Remove all common formatting characters to check digit count
    const digitsOnly = trimmed.replace(/[+\-()\s\.]/g, '');
    
    // Check if we have at least 3 digits (shortest valid international numbers)
    if (digitsOnly.length < 3) return false;
    
    // Check if contains only valid phone characters: digits, plus, parentheses, dashes, spaces, dots
    const validPhoneRegex = /^[\d+\-()\s\.]+$/;
    if (!validPhoneRegex.test(trimmed)) return false;
    
    // Additional validation rules:
    
    // 1. Plus sign, if present, must be at the very beginning
    if (trimmed.includes('+') && !trimmed.startsWith('+')) return false;
    
    // 2. Plus sign should appear only once
    if ((trimmed.match(/\+/g) || []).length > 1) return false;
    
    // 3. Parentheses must be balanced and properly paired
    const openParen = (trimmed.match(/\(/g) || []).length;
    const closeParen = (trimmed.match(/\)/g) || []).length;
    if (openParen !== closeParen) return false;
    
    // Check for properly nested/paired parentheses
    let parenCount = 0;
    for (let i = 0; i < trimmed.length; i++) {
        if (trimmed[i] === '(') parenCount++;
        if (trimmed[i] === ')') {
            parenCount--;
            // If we get negative, we have a closing paren without opening
            if (parenCount < 0) return false;
        }
    }
    
    // 4. Check that we don't have consecutive formatting characters
    const consecutiveFormattingRegex = /[\-\.\s]{2,}/;
    if (consecutiveFormattingRegex.test(trimmed)) return false;
    
    // 5. Check that dots, dashes, and spaces are not at the beginning or end (after plus)
    const withoutPlus = trimmed.startsWith('+') ? trimmed.substring(1) : trimmed;
    const innerPart = withoutPlus.trim();
    if (innerPart.length === 0) return false;
    
    // Check start and end of inner part
    if (/^[\-\.\s]/.test(innerPart) || /[\-\.\s]$/.test(innerPart)) return false;
    
    // 6. Check that we have at least 60% digits in the string (to catch garbage input)
    const digitCount = (trimmed.match(/\d/g) || []).length;
    if (digitCount / trimmed.length < 0.6) return false;
    
    // 7. Check that area/country codes don't start with 0 when preceded by +
    if (trimmed.startsWith('+')) {
        const afterPlus = trimmed.substring(1).replace(/[()\s\-\.]/g, '');
        // Country codes should not start with 0
        if (afterPlus.length > 0 && afterPlus[0] === '0') return false;
    }
    
    // 8. Check for reasonable length: international numbers are typically 7-15 digits
    // but some countries have longer numbers, so we'll be generous: 3-20 digits
    if (digitCount < 3 || digitCount > 20) return false;
    
    return true;
}
