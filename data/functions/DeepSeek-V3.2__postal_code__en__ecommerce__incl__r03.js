function validate(postalCode) {
    if (typeof postalCode !== 'string') return false;
    
    const trimmedCode = postalCode.trim();
    if (trimmedCode.length === 0) return false;

    // Define validation patterns for different countries
    const patterns = {
        // United States: 5 digits or 5+4 format
        US: /^\d{5}(-\d{4})?$/,
        
        // Canada: A1A 1A1 format (alternating alphanumeric)
        CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
        
        // United Kingdom: Various complex formats
        UK: /^(GIR ?0AA|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i,
        
        // Australia: 4 digits
        AU: /^\d{4}$/,
        
        // Germany: 5 digits
        DE: /^\d{5}$/,
        
        // France: 5 digits
        FR: /^\d{5}$/,
        
        // Japan: 3 digits dash 4 digits or 7 digits
        JP: /^\d{3}-\d{4}$|^\d{7}$/,
        
        // Brazil: 5 digits dash 3 digits
        BR: /^\d{5}-\d{3}$/,
        
        // India: 6 digits
        IN: /^\d{6}$/,
        
        // China: 6 digits
        CN: /^\d{6}$/,
        
        // Mexico: 5 digits
        MX: /^\d{5}$/,
        
        // Russia: 6 digits
        RU: /^\d{6}$/,
        
        // Italy: 5 digits
        IT: /^\d{5}$/,
        
        // Spain: 5 digits
        ES: /^\d{5}$/,
        
        // South Korea: 5 digits or 3 digits dash 3 digits
        KR: /^\d{5}$|^\d{3}-\d{3}$/,
        
        // Netherlands: 4 digits, 2 letters (no vowels, no SA/SD/SS)
        NL: /^\d{4} ?[A-Z]{2}$/i,
        
        // Sweden: 3 digits space 2 digits
        SE: /^\d{3} ?\d{2}$/,
        
        // Norway: 4 digits
        NO: /^\d{4}$/,
        
        // Denmark: 4 digits
        DK: /^\d{4}$/,
        
        // Finland: 5 digits
        FI: /^\d{5}$/,
        
        // Poland: 2 digits dash 3 digits
        PL: /^\d{2}-\d{3}$/,
        
        // Switzerland: 4 digits
        CH: /^\d{4}$/,
        
        // Austria: 4 digits
        AT: /^\d{4}$/,
        
        // Belgium: 4 digits
        BE: /^\d{4}$/,
        
        // Portugal: 4 digits dash 3 digits
        PT: /^\d{4}-\d{3}$/,
        
        // Ireland: Complex format with letters and numbers
        IE: /^[A-Z]\d{2} ?[A-Z0-9]{4}$/i,
        
        // New Zealand: 4 digits
        NZ: /^\d{4}$/,
        
        // Singapore: 6 digits
        SG: /^\d{6}$/,
        
        // South Africa: 4 digits
        ZA: /^\d{4}$/,
        
        // Argentina: 4 digits or single letter followed by 4 digits
        AR: /^[A-Z]?\d{4}$/i,
        
        // Chile: 7 digits
        CL: /^\d{7}$/,
        
        // Colombia: 6 digits
        CO: /^\d{6}$/,
        
        // Peru: 5 digits
        PE: /^\d{5}$/,
        
        // Venezuela: 4 digits
        VE: /^\d{4}$/,
        
        // Malaysia: 5 digits
        MY: /^\d{5}$/,
        
        // Philippines: 4 digits
        PH: /^\d{4}$/,
        
        // Thailand: 5 digits
        TH: /^\d{5}$/,
        
        // Vietnam: 6 digits
        VN: /^\d{6}$/,
        
        // Indonesia: 5 digits
        ID: /^\d{5}$/,
        
        // Turkey: 5 digits
        TR: /^\d{5}$/,
        
        // Egypt: 5 digits
        EG: /^\d{5}$/,
        
        // Israel: 7 digits
        IL: /^\d{7}$/,
        
        // Saudi Arabia: 5 digits
        SA: /^\d{5}$/,
        
        // UAE: No postal code system, accept empty or any format
        AE: /^.*$/,
        
        // Qatar: No postal code system
        QA: /^.*$/,
        
        // Kuwait: No postal code system
        KW: /^.*$/,
        
        // Bahrain: 3 digits or 3 digits dash 4 digits
        BH: /^\d{3}$|^\d{3}-\d{4}$/,
        
        // Oman: 3 digits
        OM: /^\d{3}$/,
        
        // Ukraine: 5 digits
        UA: /^\d{5}$/
    };

    // Try all patterns - if any match, it's valid
    for (const country in patterns) {
        if (patterns[country].test(trimmedCode)) {
            return true;
        }
    }

    // Fallback: Check for common international patterns not covered above
    const genericPatterns = [
        /^\d{3}$/,                  // 3 digits (various countries)
        /^\d{4}$/,                  // 4 digits (many countries)
        /^\d{5}$/,                  // 5 digits (many countries)
        /^\d{6}$/,                  // 6 digits (many countries)
        /^\d{7}$/,                  // 7 digits (various countries)
        /^\d{3}-\d{4}$/,            // 3-4 format
        /^\d{5}-\d{3}$/,            // 5-3 format
        /^\d{4}-\d{3}$/,            // 4-3 format
        /^[A-Z]\d[A-Z] \d[A-Z]\d$/i, // Canadian-like format
        /^[A-Z]{2}\d \d[A-Z]{2}$/i,  // UK-like format
        /^\d{4} [A-Z]{2}$/i         // Netherlands-like format
    ];

    for (const pattern of genericPatterns) {
        if (pattern.test(trimmedCode)) {
            return true;
        }
    }

    // Allow empty for countries without postal codes (like UAE)
    if (trimmedCode.length === 0) {
        return true;
    }

    return false;
}
