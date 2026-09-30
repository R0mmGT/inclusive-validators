function validate(lastName) {
    // Check if input is a non-empty string
    if (typeof lastName !== 'string' || lastName.trim() === '') {
        return false;
    }
    
    const trimmed = lastName.trim();
    
    // Length constraints (reasonably short for most last names, allowing for hyphenated names)
    if (trimmed.length < 1 || trimmed.length > 50) {
        return false;
    }
    
    // Common pattern for last names:
    // 1. Starts with a letter
    // 2. May contain letters, spaces, hyphens, apostrophes
    // 3. May contain accented characters common in European names
    // 4. May contain a single quote (O'Connor) or hyphen (Smith-Jones)
    // 5. Spaces allowed for multi-word last names (De La Cruz)
    const validNamePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    
    return validNamePattern.test(trimmed);
}
