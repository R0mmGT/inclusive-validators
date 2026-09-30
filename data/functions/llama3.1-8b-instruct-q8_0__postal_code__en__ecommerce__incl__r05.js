function validate(postalCode) {
    // Remove all non-alphanumeric characters except hyphens
    let filteredCode = '';
    for (let char of postalCode) {
        if (char.match(/^[a-zA-Z0-9\-]+$/) !== null) {
            filteredCode += char;
        }
    }

    // Check if the character length is correct
    let hasLengthCheck = false;

    // Check for length of 10 or fewer characters, allowing hyphens as fillers
    if (filteredCode.length <= 10 && !/\-/.test(filteredCode)) {
        // Check each group's character count within the postal code
        let currentCount = 0;
        for (let char of filteredCode) {
            if (!/[a-zA-Z0-9]/.test(char)) { // Ignore hyphens when counting characters
                continue;
            }
            currentCount++;
        }

        if (currentCount === filteredCode.length) {
            hasLengthCheck = true;  // No extraneous fillers found
        }
    }

    // Check for the presence of country identifier letters (A1A 1A1)
    let countryCodeIdentifierFound = false;
    for (let i = 0; i < filteredCode.length && !countryCodeIdentifierFound; i++) {
        if /[a-zA-Z]/.test(filteredCode[i])) {  // Letter
            if (/\b[A-Z]\d[A-Z]\s\d[A-Z]\d\b/i.test(filteredCode) ||      // Pattern matching A1A 1A1 format with country identifier letters A-N or a-n in upper case only 
               /\b[A-Z]\d[A-Z][\-]\d[A-Z]\d\b/i.test(filteredCode)) {        // Also pattern matching A1A-1A1 - A for 'country' identifier can be followed by hyphen
                countryCodeIdentifierFound = true;
            }
        }
    }

    return hasLengthCheck && countryCodeIdentifierFound;
}
