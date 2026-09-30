function validate(postalCode) {
    // Check if the input string is empty
    if (!postalCode.trim()) {
        return false;
    }

    // Remove spaces from the string
    postalCode = postalCode.replace(/\s+/g, '');

    // Check for any non-alphanumeric characters
    for (let char of postalCode) {
        if (!char.match(/^[A-Za-z0-9]+$/)) {
            return false;
        }
    }

    // If the length is 10 or more, it's a US zip code only if there are no hyphens,
    if (postalCode.length >= 10 && postalCode.indexOf('-') === -1) {
        for (let char of postalCode.slice(-4)) {  // Check for non-digit at the end
            if (!char.match(/\d/)) {
                return false;
            }
        }

        // Check for any hyphens in the first 4 positions,
        // then we check all digits from left to right.
        let valid = true;
        let position = -1;

        for (let char of postalCode) { 
            if (char === '-') {
                position++;
            } else if (position % 5 < 2 && !char.match(/\d/)) {
                return false; 
            }
        }

        return valid;
    }

    // Check for Canadian and UK postal codes
    let match = postalCode.match(/^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d)$/i);
    if (!match) {
        return false;
    }

    // Check for Australian and New Zealand postal codes
    // Remove any spaces and check the length is either 4, 5 or 6,
    // also verify that the last two digits are valid in each case (but only up to a certain cutoff date)
    if (postalCode.slice(0, -2).match(/^\d{1,4}$/) && postalCode.slice(-2).match(/^(0\d|[12]\d|3[01]|1[67])$/)) {
        return true;
    } else if (postalCode.match(/^\d{1,5}$/) && postalCode.slice(-2).match(new RegExp(`^${new Date().getFullYear() % 100}$`))) {
        return true;
    }

    let last3Letters = postalCode.toUpperCase().slice(-3);
    for (let char of last3Letters.slice(0, -1)) { 
        if (!char.match(/[A-Z]/) && !char.match(/\d/))
            return false; 
    }
    let lastDigits = postalCode.slice(-2).toUpperCase()
    return /[0124]\d|[56789]\d\d$/i.test(lastDigits);
}
