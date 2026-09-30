function validate(name) {
    // Basic validation
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    
    // Empty or too short/long check
    if (trimmed.length === 0 || trimmed.length > 100) return false;
    
    // Must contain at least one letter character
    if (!/[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(trimmed)) return false;
    
    // Check for valid characters from various scripts
    // Allow letters, spaces, hyphens, apostrophes, dots, and various Unicode letters
    const validNamePattern = /^[\p{L}\p{M}'\-\.\s]+$/u;
    if (!validNamePattern.test(trimmed)) return false;
    
    // Split into name parts
    const parts = trimmed.split(/\s+/).filter(part => part.length > 0);
    
    // Must have at least two parts (first name and last name)
    if (parts.length < 2) return false;
    
    // Each part must start with a letter
    for (const part of parts) {
        const firstChar = part.charAt(0);
        if (!/[\p{L}\p{M}]/u.test(firstChar)) return false;
        
        // No consecutive special characters
        if (/['\-\.]{2,}/.test(part)) return false;
        
        // Must contain at least one letter
        if (!/[\p{L}\p{M}]/u.test(part)) return false;
        
        // Part length validation
        if (part.length < 1 || part.length > 50) return false;
    }
    
    // Additional global name pattern checks
    // Allow for various naming conventions:
    // - Western: John Smith
    // - Hispanic: María José Fernández García
    // - Chinese: 张伟 (can be single character per part)
    // - Arabic: أحمد محمد علي
    // - Brazilian: João da Silva
    // - Icelandic: Jón Þorláksson
    // - etc.
    
    // No excessive spacing
    if (/\s{2,}/.test(name)) return false;
    
    // No leading/trailing special characters in the entire name
    if (/^['\-\.\s]|['\-\.\s]$/.test(trimmed)) return false;
    
    // No numbers or other invalid symbols (already covered by pattern, but double-check)
    if (/[0-9_\[\]{}()<>@#$%^&*+=|\\:;",?~`]/.test(trimmed)) return false;
    
    return true;
}
