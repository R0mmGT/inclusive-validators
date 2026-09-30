function validate(name) {
    // Basic validation
    if (typeof name !== 'string') return false;
    
    const trimmedName = name.trim();
    
    // Check if name is empty or too short
    if (trimmedName.length < 2) return false;
    
    // Check if name contains only valid characters
    // Allow letters, spaces, hyphens, and apostrophes for international names
    if (!/^[A-Za-zÀ-ÿ\s\-'.]+$/.test(trimmedName)) return false;
    
    // Split into parts
    const nameParts = trimmedName.split(/\s+/).filter(part => part.length > 0);
    
    // Must have at least first and last name
    if (nameParts.length < 2) return false;
    
    // Each part must start with a capital letter
    for (let part of nameParts) {
        // Skip checking capitalization for particles like "de", "van", etc.
        const lowercaseParticles = ['de', 'van', 'der', 'del', 'la', 'el', 'da', 'dos', 'das', 'do', 'von', 'di', 'le', 'mc', 'mac'];
        if (lowercaseParticles.includes(part.toLowerCase())) continue;
        
        if (!/^[A-ZÀ-Ÿ]/.test(part)) return false;
    }
    
    // Check for at least one vowel in each part (to filter gibberish)
    for (let part of nameParts) {
        // Skip single-letter initials like "J."
        if (part.length <= 2 && part.endsWith('.')) continue;
        
        const hasVowel = /[AEIOUÀ-ÿaeiou]/.test(part);
        if (!hasVowel) return false;
    }
    
    // Check total length is reasonable
    if (trimmedName.length > 100) return false;
    
    // Check for repeating patterns that might indicate spam
    if (/(.)\1{4,}/.test(trimmedName)) return false; // Same character 5+ times in a row
    if (/(\w{3,})\s+\1/.test(trimmedName.toLowerCase())) return false; // Same word repeated
    
    return true;
}
