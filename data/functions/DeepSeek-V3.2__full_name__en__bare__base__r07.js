function validate(name) {
    // Basic validation
    if (typeof name !== 'string') return false;
    
    // Trim whitespace and check if empty
    name = name.trim();
    if (name.length === 0) return false;
    
    // Check length constraints (reasonable for human names)
    if (name.length > 100 || name.length < 2) return false;
    
    // Must contain at least one space separating name parts
    if (!name.includes(' ')) return false;
    
    // Split into parts
    const parts = name.split(/\s+/);
    
    // Must have at least 2 parts (first and last name)
    if (parts.length < 2) return false;
    
    // Each part must start with uppercase letter and contain only letters, hyphens, or apostrophes
    const namePartRegex = /^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ'\-]*$/;
    
    for (let part of parts) {
        // Check each part against the pattern
        if (!namePartRegex.test(part)) return false;
        
        // Check for consecutive hyphens/apostrophes
        if (part.includes("--") || part.includes("''") || part.includes("-'") || part.includes("'-")) {
            return false;
        }
        
        // Check if starts or ends with hyphen/apostrophe
        if (part.startsWith("-") || part.endsWith("-") || part.startsWith("'") || part.endsWith("'")) {
            return false;
        }
        
        // Reasonable length for each name part
        if (part.length < 1 || part.length > 30) return false;
    }
    
    // Common false positives (titles, suffixes, etc.)
    const invalidParts = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof", "Jr", "Sr", "II", "III", "IV"];
    const firstPart = parts[0];
    if (invalidParts.includes(firstPart.replace(/[^a-zA-Z]/g, ''))) {
        return false;
    }
    
    // Check for repetitive characters or nonsense patterns
    if (/(.)\1{4,}/.test(name.replace(/[^a-zA-Z]/g, ''))) {
        return false; // 5 or more identical consecutive letters
    }
    
    return true;
}
