function validate(name) {
    // Trim whitespace and check if empty
    const trimmedName = name.trim();
    if (trimmedName.length === 0) return false;
    
    // Check for invalid characters (basic safety check)
    // Allow letters, spaces, hyphens, apostrophes, dots, and international characters
    // Using Unicode property escapes to match letters from all scripts
    const invalidCharPattern = /[^\p{L}\s\-'.]/u;
    if (invalidCharPattern.test(trimmedName)) return false;
    
    // Split into parts
    const parts = trimmedName.split(/\s+/);
    
    // Check minimum and reasonable maximum number of parts
    if (parts.length < 2) return false;
    if (parts.length > 5) return false; // Reasonable upper bound for most cultures
    
    // Check each part
    for (let part of parts) {
        // Each part must contain at least one letter
        const hasLetter = /\p{L}/u.test(part);
        if (!hasLetter) return false;
        
        // Check part length (reasonable bounds)
        if (part.length < 1) return false;
        if (part.length > 25) return false; // Reasonable maximum for single name component
        
        // Check for consecutive special characters
        const consecutiveSpecial = /[\-'.]{2,}/.test(part);
        if (consecutiveSpecial) return false;
        
        // Check starting/ending with special characters (with exceptions)
        const startsWithSpecial = /^[\-'.]/.test(part);
        const endsWithSpecial = /[\-'.]$/.test(part);
        if (startsWithSpecial || endsWithSpecial) {
            // Allow O' names (like O'Connor) and d' names (like d'Artagnan)
            if (!/^[Oo]'/.test(part) && !/^[Dd]'/.test(part)) {
                return false;
            }
        }
    }
    
    // Additional cultural validations
    
    // Chinese/Japanese/Korean names often have 2-4 characters total
    // but we already validated part count and length
    
    // Spanish/Portuguese names often have multiple surnames
    // Arabic names can have "bin", "bint", "al-", etc.
    // These should pass our basic validation
    
    // Check for titles (Dr., Mr., etc.) - reject if present
    const titles = [
        'dr', 'mr', 'mrs', 'ms', 'miss', 'master', 'prof', 'rev', 
        'sir', 'madam', 'lord', 'lady', 'doctor', 'professor'
    ];
    const firstPartLower = parts[0].toLowerCase().replace(/\./g, '');
    if (titles.includes(firstPartLower)) return false;
    
    // Check for suffixes (Jr., Sr., III, etc.) - reject if present
    const suffixes = [
        'jr', 'sr', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x',
        'junior', 'senior', 'phd', 'md', 'dds', 'dvm', 'esq'
    ];
    const lastPartLower = parts[parts.length - 1].toLowerCase().replace(/\./g, '');
    if (suffixes.includes(lastPartLower)) return false;
    
    // Basic check for reasonable name structure
    // At least two parts should have 2+ letters (catching cases like "A B")
    const partsWithMultipleLetters = parts.filter(p => {
        const lettersOnly = p.replace(/[^a-zA-Z]/g, '');
        return lettersOnly.length >= 2;
    });
    
    if (partsWithMultipleLetters.length < 2) {
        // Allow for cultures with single-letter given names
        // but require at least one multi-letter part
        if (partsWithMultipleLetters.length < 1) return false;
        
        // If only one multi-letter part, ensure there are at least 3 parts total
        // (e.g., allowing "Xi Jin Ping" where "Xi" is single character)
        if (parts.length < 3) return false;
    }
    
    return true;
}
