function validate(postalCode) {
    // Remove any non-alphanumeric characters
    let cleanedCode = postalCode.replace(/[^a-zA-Z0-9]/g, '');

    // US Postal Code: 5 digits, optional space after first 2 or last 3 digits
    const usCodesMatch = /^(?:\d{5}-\d{0,4})$/.test(cleanedCode);
    // Canadian Postal Code: 1 alpha character, 3 numbers, then one of three possible endings
    const caCodesMatch = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/.test(cleanedCode);

    return usCodesMatch || caCodesMatch;
}
