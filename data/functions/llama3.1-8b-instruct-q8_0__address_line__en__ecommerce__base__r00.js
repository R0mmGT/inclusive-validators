function validate(address) {
    // Define possible prefix values that precede a range of house numbers
    const prefixes = new Set(['apt', ' Apt ', 'suite', 'Suite ', 'ste', 'Ste ', 'street']);

    // Remove leading and trailing whitespace from the address line
    address = address.trim();

    // Check if the address starts with any prefix value and the remaining characters are numeric (ignoring spaces)
    return Array.from(address.split(' '), (word, index) => !index || prefixes.has(word) && ...Array.from(address.replace(word, '').trim().split(' ')).map(char => char.match(/^\d+$/)), false).every(val => val);
}

// Test the function
console.log(validate('apt 101'));       // Expected output: true
console.log(validate('Suite #456'));    // Expected output: true
console.log(validate('Ste 123 Main St'));   // Expected output: true
console.log(validate('invalid address line'));
