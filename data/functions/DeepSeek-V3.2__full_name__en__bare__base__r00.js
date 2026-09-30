function validate(name) {
    // A valid full name must:
    // 1. Not be empty
    // 2. Contain at least two words separated by whitespace
    // 3. Each part must contain only letters and optional hyphens/apostrophes
    // 4. Each part must start with a capital letter
    // 5. No leading/trailing whitespace (though we'll trim for checking)
    // 6. Reasonable max length (e.g., 100 characters)

    // Basic checks
    if (typeof name !== 'string' || name.trim() === '') {
        return false;
    }
    
    // Length check
    if (name.length > 100) {
        return false;
    }
    
    // Trim and split by whitespace (including spaces, tabs, multiple spaces)
    const nameParts = name.trim().split(/\s+/);
    
    // Must have at least two parts
    if (nameParts.length < 2) {
        return false;
    }
    
    // Pattern for each name part:
    // - Starts with uppercase letter
    // - Followed by zero or more letters (including lowercase)
    // - Can contain hyphens or apostrophes with letters on both sides
    const namePartPattern = /^[A-Z][a-z]*([-'][A-Z][a-z]*)*$/;
    
    // Check each part
    for (const part of nameParts) {
        if (!namePartPattern.test(part)) {
            return false;
        }
    }
    
    // Additional common sense check: no single-letter parts (except middle initials)
    // Allow single letters only as middle initials (not first or last)
    for (let i = 1; i < nameParts.length - 1; i++) {
        if (nameParts[i].length === 1) {
            // This is OK - it's a middle initial like "J" in "John J Smith"
        }
    }
    
    // First and last names should not be single letters
    if (nameParts[0].length === 1 || nameParts[nameParts.length - 1].length === 1) {
        return false;
    }
    
    return true;
}
