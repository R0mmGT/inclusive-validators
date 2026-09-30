function validate(phone) {
    // Handle null, undefined, non-string inputs
    if (typeof phone !== 'string') return false;
    
    // Remove all non-digit characters except leading plus
    let digitsOnly = phone.replace(/[^\d+]/g, '');
    
    // Remove leading plus for digit count check but preserve for format check
    const hasPlus = digitsOnly.startsWith('+');
    const withoutPlus = hasPlus ? digitsOnly.substring(1) : digitsOnly;
    
    // Basic validation rules
    // 1. Must contain only digits and optionally one leading plus
    const validChars = /^\+?\d+$/.test(phone.replace(/[-\s().]/g, ''));
    if (!validChars) return false;
    
    // 2. International format: if starts with +, must have 7-15 digits
    if (hasPlus) {
        // Remove + and check digit count
        if (withoutPlus.length < 7 || withoutPlus.length > 15) return false;
    } 
    // 3. Local format: 4-15 digits (minimum for short numbers in some countries)
    else {
        if (digitsOnly.length < 4 || digitsOnly.length > 15) return false;
    }
    
    // 4. Country code validation if present
    if (hasPlus) {
        // Country codes are 1-3 digits
        const countryCodeMatch = withoutPlus.match(/^(\d{1,3})/);
        if (!countryCodeMatch) return false;
        
        const countryCode = countryCodeMatch[1];
        // Validate some common country code lengths
        // 1 digit: 1 (North America), 7 (Russia/Kazakhstan)
        // 2 digits: 20-99 (most countries)
        // 3 digits: 211-999 (smaller countries, services)
        const countryCodeInt = parseInt(countryCode, 10);
        if (countryCodeInt < 1 || countryCodeInt > 999) return false;
        
        // Check for valid country codes (major ones)
        const validSingleDigitCodes = [1, 7];
        const validTwoDigitCodes = Array.from({length: 80}, (_, i) => i + 20); // 20-99
        const validThreeDigitCodes = Array.from({length: 789}, (_, i) => i + 211); // 211-999
        
        if (countryCode.length === 1 && !validSingleDigitCodes.includes(countryCodeInt)) return false;
        if (countryCode.length === 2 && !validTwoDigitCodes.includes(countryCodeInt)) return false;
        if (countryCode.length === 3 && !validThreeDigitCodes.includes(countryCodeInt)) return false;
    }
    
    // 5. Area code validation for some major regions
    if (!hasPlus) {
        // For local numbers, check if it starts with 0 (common in many countries)
        if (digitsOnly.startsWith('0') && digitsOnly.length < 5) return false;
    } else {
        // For international numbers, validate structure for known countries
        const withoutPlus = digitsOnly.substring(1);
        
        // US/Canada: +1 followed by 10 digits
        if (withoutPlus.startsWith('1') && withoutPlus.length !== 11) return false;
        
        // UK: +44 followed by 9-10 digits
        if (withoutPlus.startsWith('44') && (withoutPlus.length < 12 || withoutPlus.length > 13)) return false;
        
        // Australia: +61 followed by 8-9 digits
        if (withoutPlus.startsWith('61') && (withoutPlus.length < 10 || withoutPlus.length > 11)) return false;
    }
    
    return true;
}
