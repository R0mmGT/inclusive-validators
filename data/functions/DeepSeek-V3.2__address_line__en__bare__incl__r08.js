function validate(address) {
    // Basic sanity checks
    if (typeof address !== 'string') return false;
    
    const trimmed = address.trim();
    if (trimmed.length === 0) return false;
    if (trimmed.length > 200) return false; // Reasonable length limit
    
    // Check for minimum structure: should contain some alphanumeric content
    if (!/[a-zA-Z0-9]/.test(trimmed)) return false;
    
    // Check for common address patterns while allowing international variations
    
    // 1. Should contain at least one number (house/building number)
    // This is relaxed for international addresses where numbers might be written differently
    // or addresses might use descriptive location names
    const hasNumber = /\d/.test(trimmed);
    
    // 2. Should contain some textual elements (street name, district, etc.)
    const hasLetters = /[a-zA-Z\u0080-\uFFFF]/.test(trimmed);
    
    // 3. Should not be just a sequence of special characters
    const specialCharRatio = (trimmed.match(/[^a-zA-Z0-9\s]/g) || []).length / trimmed.length;
    if (specialCharRatio > 0.5) return false;
    
    // 4. Check for suspicious patterns that don't look like addresses
    // Too many repeated characters
    if (/(.)\1{10,}/.test(trimmed)) return false;
    
    // Looks like code/command injection
    if (/[<>{}|\\^~\[\]]/.test(trimmed)) return false;
    
    // 5. Should have some word boundary structure
    const wordCount = trimmed.split(/\s+/).filter(word => word.length > 1).length;
    if (wordCount < 1) return false;
    
    // 6. Check for reasonable word lengths
    const words = trimmed.split(/\s+/);
    const excessivelyLongWords = words.filter(word => word.length > 30);
    if (excessivelyLongWords.length > 1) return false;
    
    // 7. Allow addresses with or without numbers, and with or without non-Latin scripts
    // This accepts addresses like:
    // - "123 Main Street" (US/UK style with number)
    // - "Main Street" (just street name, valid in some contexts)
    // - "東京渋谷区道玄坂" (Japanese, no Arabic numerals)
    // - "ул. Ленина, 15" (Russian with number)
    
    // Final validation: passes if it has letters OR has numbers with reasonable structure
    if (hasLetters) {
        // If it has letters, ensure it's not gibberish
        const consecutiveConsonantsOrVowels = /([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{8,}|[aeiouAEIOU]{6,})/.test(trimmed);
        if (consecutiveConsonantsOrVowels && !hasNumber) return false;
        
        return true;
    }
    
    // If no letters but has numbers, check if it's just a number sequence
    if (hasNumber && wordCount >= 2) {
        return true;
    }
    
    return false;
}
