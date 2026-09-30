function validate(postalCode) {
    // Handle null, undefined, non-strings, or empty values
    if (typeof postalCode !== 'string' || postalCode.trim() === '') {
        return false;
    }
    
    const code = postalCode.trim();
    const length = code.length;
    
    // Check for common patterns
    
    // 1. All digits (common in many countries like US, China, India)
    if (/^\d+$/.test(code)) {
        // Valid lengths for numeric postal codes
        const validNumericLengths = [4, 5, 6, 7, 8, 9];
        return validNumericLengths.includes(length);
    }
    
    // 2. Alphanumeric patterns (common in UK, Canada, Netherlands, etc.)
    // UK: AA9A 9AA or A9A 9AA or A9 9AA or A99 9AA or AA9 9AA or AA99 9AA
    if (/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(code)) {
        return length >= 5 && length <= 8;
    }
    
    // Canadian: A9A 9A9
    if (/^[A-Za-z]\d[A-Za-z]\s*\d[A-Za-z]\d$/.test(code)) {
        return length >= 6 && length <= 7;
    }
    
    // 3. Patterns with dashes (Japan, some European countries)
    // Japan: 〒123-4567 (the 〒 is optional)
    const japanCode = code.replace('〒', '');
    if (/^\d{3}-\d{4}$/.test(japanCode)) {
        return true;
    }
    
    // 4. Mixed patterns like "123 45" (Sweden), "12-345" (Poland)
    if (/^\d{3}\s?\d{2}$/.test(code) || /^\d{2}-\d{3}$/.test(code)) {
        return length >= 5 && length <= 6;
    }
    
    // 5. Simple 4-5 digit codes (most common worldwide)
    if (/^\d{4,5}$/.test(code)) {
        return true;
    }
    
    // 6. Australian: 4 digits
    if (/^\d{4}$/.test(code)) {
        return true;
    }
    
    // 7. Brazil: 5 digits then optional -3 digits
    if (/^\d{5}(-\d{3})?$/.test(code)) {
        return true;
    }
    
    // 8. Argentina: 4 digits sometimes with letters
    if (/^[A-Za-z]?\d{4}[A-Za-z]?$/.test(code)) {
        return length >= 4 && length <= 6;
    }
    
    // 9. General pattern: alphanumeric with space or dash separator
    // Many countries use formats like: 123 45, ABC 123, 12-345, etc.
    if (/^[A-Za-z0-9]+[-\s][A-Za-z0-9]+$/.test(code)) {
        const parts = code.split(/[-\s]/);
        if (parts.length === 2) {
            const [part1, part2] = parts;
            return part1.length >= 1 && part2.length >= 1 && 
                   (part1.length + part2.length) >= 3 && 
                   (part1.length + part2.length) <= 10;
        }
    }
    
    // 10. Basic check: contains at least some digits and reasonable length
    // This catches many other formats not explicitly covered
    if (/\d/.test(code) && /^[A-Za-z0-9\s\-]+$/.test(code)) {
        const cleanCode = code.replace(/[^A-Za-z0-9]/g, '');
        return cleanCode.length >= 3 && cleanCode.length <= 10;
    }
    
    return false;
}
