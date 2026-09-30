function validate(lastName) {
    // Check if input is a non-empty string
    if (typeof lastName !== 'string' || !lastName.trim()) {
        return false;
    }

    const trimmedName = lastName.trim();
    
    // Common validation rules for last names
    // 1. Length check: typically 2-50 characters (adjustable as needed)
    if (trimmedName.length < 2 || trimmedName.length > 50) {
        return false;
    }

    // 2. Allow letters (including accented characters), apostrophes, hyphens, and spaces
    // This covers most international last name patterns:
    // - Standard letters (including accented): O'Connor, Müller, Pérez
    // - Hyphenated: Smith-Jones, García-López
    // - Spaces: Van der Berg, De La Cruz
    const validNamePattern = /^[A-Za-zÀ-ÿ'\-\s]+$/;
    
    if (!validNamePattern.test(trimmedName)) {
        return false;
    }

    // 3. Additional sanity checks
    // Cannot start or end with hyphen, apostrophe, or space
    if (/^[\-\'\s]|[\-\'\s]$/.test(trimmedName)) {
        return false;
    }
    
    // Cannot have consecutive special characters
    if (/[\-\'\s]{2,}/.test(trimmedName)) {
        return false;
    }

    // 4. Ensure at least one letter is present
    if (!/[A-Za-zÀ-ÿ]/.test(trimmedName)) {
        return false;
    }

    return true;
}
