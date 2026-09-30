function validate(postalCode) {
    // Remove any whitespace or hyphens
    postalCode = postalCode.replace(/\s|-/g, '');

    // Check if the length is between 3 and 9 characters
    if (postalCode.length < 3 || postalCode.length > 9) {
        return false;
    }

    // Check for digits only
    if (!/^[0-9]+$/.test(postalCode)) {
        return false;
    }

    return true;
}
