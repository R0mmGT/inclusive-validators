function validate(name) {
    // Basic validation: not empty, not just whitespace
    if (typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Reject names containing numbers or symbols (allow hyphens, apostrophes, periods)
    if (/[0-9@#$%^&*()_+=\[\]{}|\\<>?~]/.test(trimmedName)) {
        return false;
    }
    
    // Split by spaces and filter out empty parts
    const nameParts = trimmedName.split(/\s+/).filter(part => part.length > 0);
    
    // Must have at least two parts (first and last name)
    if (nameParts.length < 2) {
        return false;
    }
    
    // Each part should start with an uppercase letter
    for (const part of nameParts) {
        // Check if the part starts with uppercase letter
        if (!/^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ'.-]*$/.test(part)) {
            // Allow for names like "McDonald" or "O'Brian" but still require initial capital
            if (!/^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]*['.-][a-zà-öø-ÿ]+$/.test(part)) {
                return false;
            }
        }
        
        // Check for consecutive special characters
        if (/['.-]{2,}/.test(part)) {
            return false;
        }
        
        // Check for invalid placement of special characters
        if (/^['.-]|['.-]$/.test(part)) {
            return false;
        }
    }
    
    // Check for reasonable length (typically 2-4 name parts)
    if (nameParts.length > 4) {
        return false;
    }
    
    // Check total character length (reasonable for human names)
    if (trimmedName.length > 100) {
        return false;
    }
    
    return true;
}
