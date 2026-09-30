function validate(phone) {
    // Handle null/undefined/empty
    if (!phone || typeof phone !== 'string') {
        return false;
    }
    
    // Trim whitespace and remove invisible Unicode characters
    const cleaned = phone.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');
    
    // Basic length check (international numbers can be up to 15 digits, plus formatting)
    if (cleaned.length < 4 || cleaned.length > 25) {
        return false;
    }
    
    // International format validation (E.164 standard)
    // E.164 format: +[country code][subscriber number]
    const e164Pattern = /^\+[1-9]\d{1,3}[\s\-]*\d{1,14}[\d\s\-]*$/;
    
    // Local format validation (allows various separators and optional country code)
    // Allows: (123) 456-7890, 123-456-7890, 123.456.7890, 123 456 7890
    // Also allows country codes with parentheses: +1 (123) 456-7890
    const localPatterns = [
        // With country code and parentheses
        /^\+[1-9]\d{0,3}[\s\-\.]*\(?\d{1,5}\)?[\s\-\.]*\d{1,14}$/,
        // Various local formats without country code
        /^\(?\d{1,5}\)?[\s\-\.]*\d{1,14}$/,
        // Alphanumeric formats (for numbers like 1-800-EXAMPLE)
        /^[\d\+][\d\s\-\+\.\(\)]{3,23}$/
    ];
    
    // Check for E.164 format
    if (e164Pattern.test(cleaned)) {
        // Count digits after removing non-digits except leading +
        const digitCount = cleaned.replace(/[^\d]/g, '').length;
        // E.164 allows max 15 digits total (including country code)
        return digitCount >= 7 && digitCount <= 15;
    }
    
    // Check local patterns
    for (const pattern of localPatterns) {
        if (pattern.test(cleaned)) {
            // Count digits in the cleaned version
            const digitCount = cleaned.replace(/\D/g, '').length;
            // Most countries have 7-15 digit phone numbers
            // Including local numbers without country code
            return digitCount >= 4 && digitCount <= 15;
        }
    }
    
    // Additional validation: ensure it contains enough digits
    const digitCount = cleaned.replace(/\D/g, '').length;
    if (digitCount < 4 || digitCount > 15) {
        return false;
    }
    
    // Check for invalid characters (allow digits, plus, parentheses, dots, dashes, spaces)
    // Plus sign should only appear at the beginning
    const invalidCharPattern = /[^\d\s\+\-\(\)\.]/;
    if (invalidCharPattern.test(cleaned)) {
        return false;
    }
    
    // Validate plus sign position
    const plusSigns = (cleaned.match(/\+/g) || []).length;
    if (plusSigns > 1 || (plusSigns === 1 && !cleaned.startsWith('+'))) {
        return false;
    }
    
    // Validate parentheses balance
    const openParen = (cleaned.match(/\(/g) || []).length;
    const closeParen = (cleaned.match(/\)/g) || []).length;
    if (openParen !== closeParen) {
        return false;
    }
    
    // If parentheses exist, ensure they contain digits
    if (openParen > 0) {
        const parenContentMatch = cleaned.match(/\(([^)]+)\)/);
        if (parenContentMatch && !/^\d+$/.test(parenContentMatch[1])) {
            return false;
        }
    }
    
    // Final check: must contain at least some digits
    return digitCount > 0;
}
