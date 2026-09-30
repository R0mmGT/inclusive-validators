function validate(name) {
    // Basic validation rules
    const MIN_LENGTH = 1;
    const MAX_LENGTH = 50;
    
    // Check for empty or null/undefined input
    if (!name || typeof name !== 'string') {
        return false;
    }
    
    // Remove leading/trailing whitespace and check length
    const trimmedName = name.trim();
    if (trimmedName.length < MIN_LENGTH || trimmedName.length > MAX_LENGTH) {
        return false;
    }
    
    // Check for only letters, hyphens, apostrophes, and spaces (common in first names)
    // Also check that name doesn't start or end with hyphen/apostrophe/space
    const validNamePattern = /^[A-Za-zÀ-ÿ](?:[A-Za-zÀ-ÿ\s'-]*[A-Za-zÀ-ÿ])?$/;
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }
    
    // Check for consecutive special characters or spaces
    const consecutiveSpecials = /['\-]{2,}|\s{2,}/;
    if (consecutiveSpecials.test(trimmedName)) {
        return false;
    }
    
    // Check for at least one letter
    const hasLetter = /[A-Za-zÀ-ÿ]/;
    if (!hasLetter.test(trimmedName)) {
        return false;
    }
    
    // Additional reasonable constraints
    // Name shouldn't be just numbers or special characters
    const onlyValidChars = /^[A-Za-zÀ-ÿ\s'-]+$/;
    if (!onlyValidChars.test(trimmedName)) {
        return false;
    }
    
    // Name should have reasonable structure (not just spaces/special characters)
    const meaningfulName = trimmedName.replace(/[\s'-]/g, '');
    if (meaningfulName.length === 0) {
        return false;
    }
    
    return true;
}
