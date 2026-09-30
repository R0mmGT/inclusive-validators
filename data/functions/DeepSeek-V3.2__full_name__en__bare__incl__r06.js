function validate(name) {
    // Trim and check for empty or whitespace-only names
    name = name.trim();
    if (name.length === 0) return false;

    // Reject names that are too short or too long (reasonable limits)
    if (name.length < 2 || name.length > 100) return false;

    // Reject names containing numbers or symbols not used in names
    // Allow letters, spaces, hyphens, apostrophes, and periods (for initials/abbreviations)
    // Allow international characters via Unicode property escapes
    const invalidCharPattern = /[0-9_\\|~!@#$%^&*()+=<>?\/{}\[\]:;"`]/;
    if (invalidCharPattern.test(name)) return false;

    // Allow letters from all scripts, spaces, hyphens, apostrophes, and periods
    const validNamePattern = /^[\p{L}\p{M}]([\p{L}\p{M}'\-\.]|\s[\p{L}\p{M}])*[\p{L}\p{M}']+$/u;
    if (!validNamePattern.test(name)) return false;

    // Check for at least two distinct name parts (allow single names for cultures where it's normal)
    // But require at least one letter that isn't an initial
    const nameParts = name.split(/\s+/).filter(part => part.length > 0);
    
    // Allow single names (like "Madonna", "Cher", many Indonesian names)
    if (nameParts.length === 1) {
        // Single name must be at least 2 characters unless it's an initial with period
        return nameParts[0].length >= 2 || /^[A-Za-z]\.$/.test(nameParts[0]);
    }

    // For multiple names, check each part
    for (const part of nameParts) {
        // Each part should be meaningful
        if (part.length === 0) return false;
        
        // Allow initials like "J.", "K.", "A. B."
        if (part.length === 1 && !/^[A-Za-z]$/.test(part)) return false;
        
        // Reject parts that are just punctuation
        if (/^[\-\.']+$/.test(part)) return false;
        
        // Reject consecutive punctuation
        if (/[\-\.']{2,}/.test(part)) return false;
        
        // Check for valid hyphen usage (not at start/end of part, not consecutive)
        if (part.includes('-')) {
            if (part.startsWith('-') || part.endsWith('-')) return false;
            if (part.split('-').some(sub => sub.length === 0)) return false;
        }
        
        // Check for valid apostrophe usage
        if (part.includes("'")) {
            if (part.startsWith("'") || part.endsWith("'")) return false;
        }
    }

    // Additional cultural considerations:
    // Allow names with particle prefixes (van, de, von, al-, bin, etc.)
    // Allow names with suffixes (Jr., Sr., III, PhD) - though PhD is usually not part of legal name
    
    // Reject obviously invalid patterns
    // No consecutive spaces (already handled by split)
    // No name that's all uppercase or all lowercase (allow mixed case)
    // But allow all caps for legal documents or specific cultural reasons
    
    // Check for reasonable capitalization (not too strict)
    const words = name.split(/\s+/);
    const allLower = words.every(w => w === w.toLowerCase());
    const allUpper = words.every(w => w === w.toUpperCase());
    
    // Allow all uppercase (legal documents) or mixed case, but not all lowercase
    if (allLower && words.length > 1) {
        // Multi-word names shouldn't be all lowercase
        return false;
    }

    return true;
}
