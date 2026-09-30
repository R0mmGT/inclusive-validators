function validate(name) {
    // Check if input is a string and not empty
    if (typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Reasonable length constraints for a first name (2-30 characters)
    if (trimmedName.length < 2 || trimmedName.length > 30) {
        return false;
    }
    
    // Must start with a letter (allowing international characters)
    const firstChar = trimmedName.charAt(0);
    if (!(/^\p{L}/u.test(firstChar))) {
        return false;
    }
    
    // Allow letters, apostrophes, hyphens, spaces (for compound names), and periods
    // Must contain at least one letter beyond the first character
    const validNamePattern = /^[\p{L}][\p{L}'’\-.\s]+$/u;
    
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }
    
    // Disallow consecutive special characters or special characters at the end
    if (/['’\-.\s]{2,}/.test(trimmedName) || /['’\-.\s]$/.test(trimmedName)) {
        return false;
    }
    
    // Ensure there are no digits
    if (/\d/.test(trimmedName)) {
        return false;
    }
    
    // Additional check: must contain at least 2 letters total
    const letterCount = (trimmedName.match(/\p{L}/ug) || []).length;
    if (letterCount < 2) {
        return false;
    }
    
    // Disallow names that are just repeating characters or patterns
    if (/^(.)\1+$/.test(trimmedName.replace(/['’\-.\s]/g, ''))) {
        return false;
    }
    
    return true;
}
