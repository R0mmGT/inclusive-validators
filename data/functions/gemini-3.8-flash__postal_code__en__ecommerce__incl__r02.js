function validate(postalCode) {
    if (typeof postalCode !== 'string') {
        return false;
    }

    const trimmed = postalCode.trim();

    // Remove allowed separators (spaces and hyphens) to inspect the core characters
    const alphanumericOnly = trimmed.replace(/[\s-]/g, '');

    // Worldwide postal codes range between 2 and 12 alphanumeric characters
    if (alphanumericOnly.length < 2 || alphanumericOnly.length > 12) {
        return false;
    }

    // Every postal code system worldwide contains at least one digit
    if (!/\d/.test(alphanumericOnly)) {
        return false;
    }

    // Must consist solely of alphanumeric characters, optionally separated by single spaces or hyphens
    return /^[a-zA-Z0-9]+([ -][a-zA-Z0-9]+)*$/.test(trimmed);
}
