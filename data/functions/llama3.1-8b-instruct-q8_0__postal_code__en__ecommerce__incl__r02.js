function validate(postalCode) {
    if (typeof postalCode !== 'string') return false;
    const codeLength = postalCode.length;

    // Check for non-digit characters
    let isNumeric = true;
    for (let char of postalCode.replace(/[-\s,\.]/g, '')) {
        if (!char.match(/\d/)) {
            isNumeric = false;
            break;
        }
    }

    if (!isNumeric) return false;

    const validLengths = [5];
    if (!validLengths.includes(codeLength)) return false;

    // Check for repeated sequences
    for (let i = 0; i <= codeLength - 3; i++) {
        if (postalCode.slice(i, i + 3).repeat(2) === postalCode.slice(i, codeLength)) {
            return false;
        }
    }

    return true;
}
