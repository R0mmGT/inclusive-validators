function validate(name) {
    // Check if input is a non-empty string
    if (typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Length constraints (reasonably permissive but with upper limit)
    if (trimmedName.length < 1 || trimmedName.length > 100) {
        return false;
    }
    
    // Check for control characters or problematic Unicode categories
    for (let i = 0; i < trimmedName.length; i++) {
        const code = trimmedName.charCodeAt(i);
        // Basic control characters (0-31) and DEL (127)
        if (code < 32 || code === 127) {
            return false;
        }
        
        // Unicode surrogate pairs check (for astral symbols)
        if (code >= 0xD800 && code <= 0xDFFF) {
            // This is a surrogate - should be paired properly
            if (code <= 0xDBFF) {
                // High surrogate
                if (i + 1 >= trimmedName.length) return false;
                const nextCode = trimmedName.charCodeAt(i + 1);
                if (nextCode < 0xDC00 || nextCode > 0xDFFF) return false;
                i++; // Skip the low surrogate
            } else {
                // Low surrogate without preceding high surrogate
                return false;
            }
        }
    }
    
    // Common name patterns across cultures (permissive but sensible)
    const validPattern = /^[\p{L}\p{M}.'\-\s]+$/u;
    
    // Additional checks for specific problematic patterns
    const problematicPatterns = [
        /^[.\-\s]+$/,  // Only punctuation/whitespace
        /\.{2,}/,      // Multiple consecutive dots
        /-{2,}/,       // Multiple consecutive hyphens
        /\s{2,}/,      // Multiple consecutive spaces
        /^[0-9]+$/     // Only numbers
    ];
    
    // Validate against patterns
    if (!validPattern.test(trimmedName)) {
        return false;
    }
    
    for (const pattern of problematicPatterns) {
        if (pattern.test(trimmedName)) {
            return false;
        }
    }
    
    // Check for mixed script incompatibility (basic check)
    // Allow multiple scripts in a single name (e.g., "Jean-François")
    // but flag highly improbable combinations
    
    // Look for characters from different script blocks that are unlikely to mix
    // This is a simplified version - in reality, this is complex
    const hasLatin = /[A-Za-zÀ-ÿ]/.test(trimmedName);
    const hasCyrillic = /[\u0400-\u04FF]/.test(trimmedName);
    const hasGreek = /[\u0370-\u03FF]/.test(trimmedName);
    const hasChinese = /[\u4E00-\u9FFF]/.test(trimmedName);
    const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF]/.test(trimmedName);
    const hasKorean = /[\uAC00-\uD7AF\u1100-\u11FF]/.test(trimmedName);
    const hasArabic = /[\u0600-\u06FF]/.test(trimmedName);
    const hasDevanagari = /[\u0900-\u097F]/.test(trimmedName);
    
    const scripts = [hasLatin, hasCyrillic, hasGreek, hasChinese, 
                    hasJapanese, hasKorean, hasArabic, hasDevanagari];
    const scriptCount = scripts.filter(Boolean).length;
    
    // Allow mixing Latin with common diacritics and punctuation
    // but flag improbable mixes like Chinese + Cyrillic + Greek
    if (scriptCount > 2) {
        // More than 2 distinct scripts is highly improbable for a given name
        return false;
    }
    
    // Specific improbable combinations
    if ((hasChinese || hasJapanese || hasKorean) && 
        (hasCyrillic || hasGreek || hasArabic || hasDevanagari) &&
        !hasLatin) {
        // Asian script mixed with other non-Latin scripts (without Latin)
        return false;
    }
    
    // Ensure name starts and ends with a letter (allowing apostrophes in some cultures)
    const startsWithLetter = /^[\p{L}\p{M}]/u.test(trimmedName);
    const endsWithLetter = /[\p{L}\p{M}]$/u.test(trimmedName);
    
    if (!startsWithLetter || !endsWithLetter) {
        // Allow exceptions for names like O'Conner or al-Masri
        const allowedStartEnd = /^[A-Za-zÀ-ÿ\p{L}\p{M}'‘’ʿ].*[A-Za-zÀ-ÿ\p{L}\p{M}'’ʿ]$/u;
        if (!allowedStartEnd.test(trimmedName)) {
            return false;
        }
    }
    
    // Allow for cultural variations:
    // - Hyphenated names (Jean-Luc)
    // - Names with apostrophes (O'Connor, D'Angelo)
    // - Names with spaces (Mary Ann, Van der Berg)
    // - Names with dots (St. John - though rare as first name)
    // - Names from any script (Chinese, Arabic, Cyrillic, etc.)
    
    // Final sanity check - at least one letter character
    const hasLetter = /[\p{L}\p{M}]/u.test(trimmedName);
    if (!hasLetter) {
        return false;
    }
    
    return true;
}
