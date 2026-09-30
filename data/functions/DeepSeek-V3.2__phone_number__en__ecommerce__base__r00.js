function validate(phone) {
    if (typeof phone !== 'string') return false;
    
    // Remove common separators and whitespace
    const cleaned = phone.replace(/[\s\-()\.]/g, '');
    
    // Check for exactly 10 digits after cleaning
    if (!/^\d{10}$/.test(cleaned)) return false;
    
    // Optional: Area code validation (cannot start with 0 or 1)
    // if (/^[01]/.test(cleaned)) return false;
    
    // Optional: Exchange code validation (cannot start with 0 or 1)
    // if (/^\d{3}[01]/.test(cleaned)) return false;
    
    return true;
}
