function validate(addressLine) {
    if (typeof addressLine !== 'string') {
        return false;
    }

    const trimmed = addressLine.trim();

    // Street addresses across the world vary widely: some have no numbers (e.g., named houses, 
    // landmark-based descriptions, rural townlands), while others use diverse numbering systems 
    // and non-Latin scripts. A valid line must be of reasonable length, contain at least one 
    // letter or logographic character (to prevent pure numeric/punctuation inputs), and contain 
    // no unprintable control characters.
    if (trimmed.length < 2 || trimmed.length > 250) {
        return false;
    }

    // Disallow unprintable/control characters
    if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
        return false;
    }

    // Must contain at least one Unicode letter or ideograph (Latin, Cyrillic, Arabic, CJK, etc.)
    if (!/\p{L}/u.test(trimmed)) {
        return false;
    }

    return true;
}
