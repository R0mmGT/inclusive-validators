function validate(name) {
    // Check if input is a non-empty string
    if (typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Reasonable length constraints for first names (1-25 characters)
    if (trimmedName.length < 1 || trimmedName.length > 25) {
        return false;
    }
    
    // Must start with a letter
    if (!/^[A-Za-zÀ-ÿ]/.test(trimmedName)) {
        return false;
    }
    
    // Allow letters, apostrophes, hyphens, and spaces
    // Must contain at least one letter after any valid punctuation
    if (!/^[A-Za-zÀ-ÿ'][A-Za-zÀ-ÿ'\- ]*[A-Za-zÀ-ÿ']$/.test(trimmedName)) {
        return false;
    }
    
    // Check for consecutive punctuation or spaces
    if (/['\- ]{2,}/.test(trimmedName)) {
        return false;
    }
    
    // Check for invalid punctuation at the end
    if (trimmedName.endsWith('-') || trimmedName.endsWith(' ')) {
        return false;
    }
    
    // Common invalid patterns (numbers, special characters except allowed ones)
    if (/[0-9]|[@#$%^&*()_+=<>?/[\]{}|\\]/.test(trimmedName)) {
        return false;
    }
    
    // Ensure at least one character is a letter (not just punctuation)
    if (!/[A-Za-zÀ-ÿ]/.test(trimmedName)) {
        return false;
    }
    
    return true;
}
