function validate(postalCode) {
    if (typeof postalCode !== 'string') {
        return false;
    }
    
    const trimmedCode = postalCode.trim();
    
    // Basic length check for most countries (4-10 characters is common)
    if (trimmedCode.length < 4 || trimmedCode.length > 10) {
        return false;
    }
    
    // Check for only alphanumeric characters and optional spaces/hyphens
    if (!/^[A-Z0-9\- ]+$/i.test(trimmedCode)) {
        return false;
    }
    
    // Must contain at least one digit
    if (!/\d/.test(trimmedCode)) {
        return false;
    }
    
    // Must contain at least one letter (some postal codes are alphanumeric)
    if (!/[A-Z]/i.test(trimmedCode)) {
        return false;
    }
    
    // Cannot have consecutive hyphens or spaces
    if (/--|\s\s/.test(trimmedCode)) {
        return false;
    }
    
    // Cannot start or end with a hyphen or space
    if (/^[-\s]|[-\s]$/.test(trimmedCode)) {
        return false;
    }
    
    // Letters and digits should be reasonably distributed (not all letters or all digits)
    const letters = (trimmedCode.match(/[A-Z]/gi) || []).length;
    const digits = (trimmedCode.match(/\d/g) || []).length;
    
    if (letters < 1 || digits < 1) {
        return false;
    }
    
    return true;
}
