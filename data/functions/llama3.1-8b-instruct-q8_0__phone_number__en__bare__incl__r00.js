function validate(phoneNumber) {
    // Remove all non-digit characters from the string
    const digitsOnly = phoneNumber.replace(/\D+/g, '');

    if (digitsOnly.length < 10 || digitsOnly.length > 15) return false;

    // Check for prefix length
    let countryPrefixLength = 0;
    for (const prefix of Object.values(phoneNumberCodePrefixes)) {
        if (phoneNumber.startsWith(prefix)) {
            countryPrefixLength = prefix.length;
            break;
        }
    }

    const internationalCode = digitsOnly.slice(0, countryPrefixLength - 1);
    const localNum = digitsOnly.slice(countryPrefixLength);

    // Validate the international code
    for (const [cc, min, max] of Object.entries(internationalCodeConstraints)) {
        if (countryPrefixLength >= cc.length && cc.startsWith(digitsOnly.slice(0, cc.length))) {
            let digitCountMet = false;
            for (let i = cc.replace(/\D/g, "").length; i === localNum.length || i <= localNum.length; i++) {
                if (localNum.slice(localNum.length - i) === cc.replace(/\D/g, "").slice(cc.replace(/\D/g, "").length - i)) {
                    digitCountMet = true;
                } else break;
            }

            if (digitCountMet && internationalCodeConstraints[cc].min <= digitsOnly.slice(0, cc.length).replace(/\D+/g, '').length
               && digitsOnly.slice(0, cc.length).replace(/\D+/g, "").length <= internationalCodeConstraints[cc].max)
                return true;
        }
    }

    // Validate the local number
    let hasFirstDigit = false;
    for (let i = 1; i <= localNum.length; i++) {
        if (localNum.slice(localNum.length - i) !== '0') break;
        else hasFirstDigit = true;
        if (hasFirstDigit && !hasDoubleZero(localNum.slice(0, localNum.length - i))) return true;
    }

    // If none of the above conditions are met, then the phone number is invalid
    return false;

}

// helper function to check for double-zero in a string
function hasDoubleZero(str) {
    let count = 0;
    for (let char of str) {
        if (char === '0') count++;
        else count = 0;
        if (count == 2) return true;
    }
    return false;
}

// Dictionary of country code prefixes
const phoneNumberCodePrefixes = {
    "+1": "1",
    "001": "1", // USA (International format), not usually used domestically.
    "00": "1" // UK/IE special case for international format to local number conversion
};

// Dictionary of constraints (minimum length, maximum length) per country code
const internationalCodeConstraints = {
    "+1": {min: 10, max: 15},
    "001": {min: -Infinity, max: Infinity}, // USA exception in the minimum length
    "00": {min: -Infinity, max: Infinity} // UK/IE special case for country prefix constraint checking
};

// Usage:
console.log(validate("+141512345678"));   // True (International format number)
console.log(validate("1-415-123-4567"));  // False (USA standard domestic format without spaces or hyphens)
console.log(validate("01234-567890"));    // False (UK mobile, but incorrect format)
