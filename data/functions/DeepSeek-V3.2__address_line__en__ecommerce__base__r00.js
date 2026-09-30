function validate(address) {
    // Check if input is a non-empty string
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Address must have at least two parts (number and street name)
    const parts = trimmedAddress.split(/\s+/);
    if (parts.length < 2) {
        return false;
    }
    
    // Check if first part contains at least one digit (house/building number)
    if (!/\d/.test(parts[0])) {
        return false;
    }
    
    // Address must contain at least one letter (street name)
    if (!/[a-zA-Z]/.test(trimmedAddress)) {
        return false;
    }
    
    // Basic length constraints
    if (trimmedAddress.length < 5 || trimmedAddress.length > 100) {
        return false;
    }
    
    // Check for valid characters (allow letters, digits, spaces, hyphens, periods, commas, #, /, and apostrophes)
    if (!/^[a-zA-Z0-9\s\-.,#'/]+$/.test(trimmedAddress)) {
        return false;
    }
    
    // Must not start or end with punctuation (except number at start)
    if (/^[.,\-/#']/.test(trimmedAddress) || /[.,\-/#']$/.test(trimmedAddress)) {
        return false;
    }
    
    // Prevent multiple consecutive spaces or punctuation
    if (/\s{2,}/.test(trimmedAddress) || /[.,\-/#']{2,}/.test(trimmedAddress)) {
        return false;
    }
    
    return true;
}
