function validate(phone) {
    // Helper function to strip non-numeric characters except leading +
    const cleanNumber = (str) => {
        if (str.startsWith('+')) {
            return '+' + str.slice(1).replace(/\D/g, '');
        }
        return str.replace(/\D/g, '');
    };
    
    // Helper function to check if a string contains only digits
    const isDigits = (str) => /^\d+$/.test(str);
    
    // Helper function to validate country codes
    const isValidCountryCode = (code) => {
        // Check if code is 1-3 digits (most country codes are 1-3 digits)
        // Some country codes start with 1, 2, 3, 4, 5, 6, 7, 8, 9
        // And are between 1-3 digits in length
        if (!/^[1-9]\d{0,2}$/.test(code)) return false;
        
        const numCode = parseInt(code, 10);
        
        // Check against known valid country code ranges
        // Country codes are generally between 1-999
        if (numCode < 1 || numCode > 999) return false;
        
        // Exclude invalid ranges (like 0xx which are invalid as country codes)
        return true;
    };
    
    // Remove common formatting characters and whitespace
    const trimmed = phone.trim();
    
    // Check if empty
    if (!trimmed) return false;
    
    // International format (starts with +)
    if (trimmed.startsWith('+')) {
        const cleaned = cleanNumber(trimmed);
        
        // International numbers should have at least country code + local number
        // Minimum: Country code (1-3 digits) + at least 4 digits for local number
        if (cleaned.length < 5) return false; // + + 1 digit country + 4 digits = 6 chars minimum
        
        const countryCode = cleaned.slice(1, 4); // Try 3 digits first
        let actualCountryCode;
        
        // Try to find valid country code (1-3 digits)
        for (let i = 1; i <= 3; i++) {
            const possibleCode = cleaned.slice(1, 1 + i);
            if (isValidCountryCode(possibleCode) && 
                cleaned.length - 1 - i >= 4) { // At least 4 digits after country code
                actualCountryCode = possibleCode;
                break;
            }
        }
        
        if (!actualCountryCode) return false;
        
        // Check the rest of the number (after country code) contains only digits
        const localNumber = cleaned.slice(1 + actualCountryCode.length);
        return isDigits(localNumber) && localNumber.length >= 4 && localNumber.length <= 15;
    }
    
    // National format (without +)
    const cleaned = cleanNumber(trimmed);
    
    // Check if it's all digits
    if (!isDigits(cleaned)) return false;
    
    // National numbers should be between 4 and 15 digits
    // Some countries have very short numbers, others longer
    // This is a reasonable range that covers most countries
    if (cleaned.length < 4 || cleaned.length > 15) return false;
    
    // Check for common invalid patterns
    // Shouldn't start with 0 if not international format (in some countries, 0 is trunk prefix)
    // But we'll allow it since some countries use 0 as the first digit
    
    // Shouldn't contain sequences of all same digit
    if (/^(\d)\1+$/.test(cleaned)) return false;
    
    return true;
}
