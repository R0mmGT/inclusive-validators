function validate(phoneString) {
    // Handle null/undefined/empty input
    if (!phoneString || typeof phoneString !== 'string') {
        return false;
    }
    
    // Trim whitespace
    const trimmed = phoneString.trim();
    if (trimmed.length === 0) {
        return false;
    }
    
    // Basic international format detection
    // International format should start with + or 00
    const isInternationalFormat = trimmed.startsWith('+') || trimmed.startsWith('00');
    
    // Remove all non-digit characters except leading + or spaces
    // Keep + if present at the start for international numbers
    const hasLeadingPlus = trimmed.startsWith('+');
    const digitsOnly = trimmed.replace(/[^\d]/g, '');
    const formattedForCheck = hasLeadingPlus ? '+' + digitsOnly : digitsOnly;
    
    // Minimum length check (including country code)
    // Very short numbers (like emergency services) are valid in some contexts,
    // but for registration forms, we expect proper phone numbers
    // Minimum: 7 digits for some small countries + country code
    // Maximum: 15 digits (ITU-T E.164 recommendation)
    if (digitsOnly.length < 8 || digitsOnly.length > 15) {
        return false;
    }
    
    // Check for common invalid patterns
    // Repeating same digit many times (e.g., 11111111)
    if (/^(\d)\1{7,}$/.test(digitsOnly)) {
        return false;
    }
    
    // Check for valid country calling codes if international format
    if (isInternationalFormat) {
        // Extract country calling code
        let callingCode;
        if (trimmed.startsWith('00')) {
            callingCode = digitsOnly.substring(0, digitsOnly.length - (trimmed.length - 2));
        } else if (trimmed.startsWith('+')) {
            callingCode = digitsOnly;
        }
        
        // Validate country calling code length (1-3 digits, some are 4)
        const callingCodeDigits = hasLeadingPlus ? 
            digitsOnly : 
            (trimmed.startsWith('00') ? trimmed.substring(2).replace(/[^\d]/g, '') : '');
        
        // Country codes range from 1 to 4 digits (excluding the + or 00)
        if (callingCodeDigits.length < 1 || callingCodeDigits.length > 4) {
            return false;
        }
        
        // Check if the calling code starts with a valid digit (1-9, not 0)
        if (callingCodeDigits.length > 0 && callingCodeDigits[0] === '0') {
            return false;
        }
    }
    
    // Additional validation rules for specific regions
    // US/Canada: +1 followed by 10 digits
    if (formattedForCheck.startsWith('+1')) {
        return digitsOnly.length === 11; // +1 (3 digits area code) + 7 digits
    }
    
    // UK: +44 followed by 9-10 digits
    if (formattedForCheck.startsWith('+44')) {
        return digitsOnly.length >= 12 && digitsOnly.length <= 13;
    }
    
    // Australia: +61 followed by 8-9 digits
    if (formattedForCheck.startsWith('+61')) {
        return digitsOnly.length >= 11 && digitsOnly.length <= 12;
    }
    
    // If not international format, check if it could be a local number
    // Local numbers should be reasonable length (6-12 digits typically)
    if (!isInternationalFormat) {
        // Check if it's a reasonable length for a national number
        if (digitsOnly.length < 6 || digitsOnly.length > 12) {
            return false;
        }
        
        // Local numbers shouldn't start with 0 in most countries
        // (0 is often the trunk prefix, not part of the actual number)
        if (digitsOnly[0] === '0') {
            return false;
        }
    }
    
    // Final sanity check: ensure the number contains only valid characters
    // after removing spaces, parentheses, dashes, etc.
    const validPhoneRegex = /^[\d\s\+\-\(\)\.]{6,20}$/;
    if (!validPhoneRegex.test(trimmed)) {
        return false;
    }
    
    // Check for unrealistic patterns (all zeros, sequential patterns that are too perfect)
    if (/^0+$/.test(digitsOnly) || 
        /^123456789/.test(digitsOnly) || 
        /^987654321/.test(digitsOnly)) {
        return false;
    }
    
    return true;
}
