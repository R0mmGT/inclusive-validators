function validate(lastName) {
    // Check if input is a string
    if (typeof lastName !== 'string') return false;
    
    // Trim whitespace and check if empty
    const trimmedName = lastName.trim();
    if (trimmedName.length === 0) return false;
    
    // Common validation rules for last names:
    // 1. Reasonable length (1-50 characters is typical for databases)
    if (trimmedName.length < 1 || trimmedName.length > 50) return false;
    
    // 2. Should not contain numbers (exceptions exist but rare)
    if (/\d/.test(trimmedName)) return false;
    
    // 3. Should not contain special characters except hyphens, apostrophes, spaces, and accented letters
    // Allow: letters (including international), hyphens, apostrophes, and spaces
    // This regex allows:
    // - Letters from any alphabet (including accented characters)
    // - Hyphens, apostrophes, and spaces
    // - Does not allow consecutive special characters
    const validNamePattern = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
    
    return validNamePattern.test(trimmedName);
}
