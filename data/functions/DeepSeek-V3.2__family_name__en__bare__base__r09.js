function validate(lastName) {
    // Check if input is a string
    if (typeof lastName !== 'string') {
        return false;
    }
    
    // Trim whitespace and check if empty
    const trimmed = lastName.trim();
    if (trimmed.length === 0) {
        return false;
    }
    
    // Common last name patterns:
    // 1. Standard alphabetic names (Smith, O'Connor, García)
    // 2. Hyphenated names (Smith-Jones, van der Bilt)
    // 3. Names with apostrophes (O'Brien, d'Angelo)
    // 4. Names with spaces (de la Cruz, van der Meer)
    // 5. International characters (accented letters)
    
    // Base pattern for common last name characters
    const basePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([-'\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    
    // Additional validation rules
    const rules = [
        // Must match the base pattern
        () => basePattern.test(trimmed),
        
        // Must start with a letter (not hyphen, apostrophe or space)
        () => /^[A-Za-zÀ-ÖØ-öø-ÿ]/.test(trimmed),
        
        // Must end with a letter
        () => /[A-Za-zÀ-ÖØ-öø-ÿ]$/.test(trimmed),
        
        // No consecutive special characters (--, '', etc.)
        () => !/([-'\s])\1/.test(trimmed),
        
        // Reasonable length (1-50 characters is typical for last names)
        () => trimmed.length >= 1 && trimmed.length <= 50,
        
        // No leading/trailing special characters
        () => !trimmed.startsWith('-') && !trimmed.startsWith("'") && !trimmed.startsWith(' '),
        () => !trimmed.endsWith('-') && !trimmed.endsWith("'") && !trimmed.endsWith(' '),
        
        // At least one letter somewhere
        () => /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(trimmed)
    ];
    
    // Check all rules
    return rules.every(rule => rule());
}
