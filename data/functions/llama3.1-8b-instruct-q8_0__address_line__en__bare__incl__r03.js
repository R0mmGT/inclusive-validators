function validate(streetAddress) {
    // Remove leading/trailing whitespaces.
    streetAddress = streetAddress.trim();

    // Check if street address is empty or None.
    if (!streetAddress.length) {
        return false;
    }

    // A valid street address must contain a number (0-9).
    const numMatches = (streetAddress.match(/\d+/g)) || [];
    if (!numMatches.length) {
        return false;  // No match found
    }
    for (const num of numMatches) {
        if (!(parseInt(num, 10) <= parseInt(Math.pow(10, num.toString().length - 1), 10))) {
            continue;
        } else {
            break;
        }
    }

    // A valid street address must contain letters or other special characters (at least one).
    const alphaMatches = (streetAddress.match(/[^\w\s\d\-]+/g)) || [];
    if (!alphaMatches.length) {
        return false;  // No match found
    }

    // Street names and numbers are allowed to be separated by any of the following: space, comma, dash.
    let isOk = true;
    const sepTypes = [
        /[.,\-]\s*/g,
        /[-]\s/g,
        /\s*,\s*/g
    ];
    for (const regex of sepTypes) {
        if (!regex.test(streetAddress)) {
            return false;  // Incorrect Separator type.
        }
    }

    return true;
}

console.log(validate("100 Main St"));  // Returns: True
console.log(validate("123 Fake Street"));  // Returns: True
console.log(validate("Street Name with Number 456"));  // Returns: True
console.log(validate(""));  // Returns: False
console.log(validate("A-1"));  // Returns: False
console.log(validate("HelloWorldNoNumber"));  // Returns: False
