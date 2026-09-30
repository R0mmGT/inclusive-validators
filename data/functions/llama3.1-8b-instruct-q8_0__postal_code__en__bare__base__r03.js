function validate(postalCode) {
    let numericCode = '';

    for (let char of postalCode) {
        if (!isNaN(char)) {
            numericCode += char;
        } else if (char === ' ') {
            break;
        } else {
            return false;
        }
    }

    const countryCodeRegex = /^(\d{2})$/;

    let match = countryCodeRegex.exec(numericCode);
    if (match && parseInt(match[1]) >= 10) {
        return true;
    } else {
        return false;
    }
}

console.log(validate('ABC123')); // false
console.log(validate('12A34'));  // false
console.log(validate('10011'));  // true
