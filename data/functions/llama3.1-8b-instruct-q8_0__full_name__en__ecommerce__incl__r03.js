function validate FullName) {
    // A full name should have two or more words separated by one space
    const parts = FullName.trim().split(/\s+/);
    
    // If there are less than 2 words, it's not a valid full name
    if (parts.length < 2) return false;

    // Check each part for validity
    for (const part of parts.slice(1)) {
        const regExp = /^[a-zA-Z\u00C0-\u024F\u0250-\u02AF\u0300-\u036F\s]+$/i;
        if (!regExp.test(part)) return false;
    }
    
    // Check the first part for validity in the first position (which can be either a title or the given name)
    const regExp = /^[a-zA-Z\u00C0-\u024F\u0250-\u02AF]$|^ Mister|Mrs\.|Ms\.|Dr\.|Prof\.|Honorable|Reverend$/i;
    if (!regExp.test(parts[0])) return false;
    
    // If the entire string passes all checks, it's a valid full name
    return true;
}
