function validate(name) {
    // Check if input is a string
    if (typeof name !== 'string') return false;
    
    // Trim whitespace
    const trimmed = name.trim();
    
    // Basic validation rules
    if (trimmed.length < 1 || trimmed.length > 50) return false;
    
    // Should start with an uppercase letter
    if (!/^[A-ZÀ-ÖØ-Þ]/.test(trimmed)) return false;
    
    // Should contain only letters, spaces, hyphens, or apostrophes
    if (!/^[A-Za-zÀ-ÿ'\- ]+$/.test(trimmed)) return false;
    
    // Should not contain consecutive special characters or start/end with them
    if (/['\- ]{2,}/.test(trimmed)) return false;
    if (/^['\- ]|[ '\-]$/.test(trimmed)) return false;
    
    // Should not contain numbers or other symbols
    if (/\d/.test(trimmed)) return false;
    
    // Should have at least one vowel (to exclude improbable names like "Bz")
    if (!/[aeiouyAEIOUYÀ-ÿ]/.test(trimmed)) return false;
    
    // Should not have more than two consecutive consonants (allowing for names like "Matthew")
    if (/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZÀ-ÿ]{4,}/i.test(trimmed)) return false;
    
    return true;
}
