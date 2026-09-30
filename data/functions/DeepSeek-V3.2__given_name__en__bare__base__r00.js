function validate(name) {
    // Basic requirements check
    if (typeof name !== 'string') {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Empty or whitespace-only check
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Length constraints (1-50 characters is reasonable for first names)
    if (trimmedName.length < 1 || trimmedName.length > 50) {
        return false;
    }
    
    // Check for valid characters (letters, hyphens, apostrophes, spaces between parts)
    // Allows for names like "Jean-Paul", "O'Connor", "Mary Ann"
    const validNamePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    
    // Additional check to prevent consecutive special characters
    const noConsecutiveSpecials = !/([ '-])\1/.test(trimmedName);
    
    // Check starts and ends with letter
    const startsEndsWithLetter = /^[A-Za-zÀ-ÖØ-öø-ÿ].*[A-Za-zÀ-ÖØ-öø-ÿ]$/.test(trimmedName);
    
    // Check for capital letter at start (common convention for names)
    const startsWithCapital = /^[A-ZÀ-Ö]/.test(trimmedName);
    
    // Check for any obviously invalid patterns (numbers, most symbols)
    const hasInvalidChars = /[0-9_\\\/\[\]{}|<>@#$%^&*()+=";:?~`]/.test(trimmedName);
    
    return validNamePattern.test(trimmedName) &&
           noConsecutiveSpecials &&
           startsEndsWithLetter &&
           startsWithCapital &&
           !hasInvalidChars;
}
