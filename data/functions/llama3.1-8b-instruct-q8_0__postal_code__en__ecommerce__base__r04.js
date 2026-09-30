function validate(postalCode) {
    // First, check if the string is null or undefined or empty.
    if (!postalCode) return false;

    // Check if the string has at least 3 characters and at most 10 characters.
    if (postalCode.length < 3 || postalCode.length > 10) return false;

    // Check if all characters are either alphabet (both uppercase an lowercase), digit or space.
    for (let char of postalCode) {
        // If the character is not alphanumeric or a space, it's invalid
        if (!char.match(/^[0-9a-zA-Z ]$/)) return false;
    }

    // After all checks pass, we can return true
    return true;
}
