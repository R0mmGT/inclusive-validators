function validate(postalCode) {
    // Ensure input is a string
    if (typeof postalCode !== 'string') return false;
    
    // Check if it's exactly 5 digits
    if (/^\d{5}$/.test(postalCode)) {
        return true;
    }
    
    // Check for ZIP+4 format: 5 digits, hyphen, 4 digits
    if (/^\d{5}-\d{4}$/.test(postalCode)) {
        return true;
    }
    
    return false;
}
