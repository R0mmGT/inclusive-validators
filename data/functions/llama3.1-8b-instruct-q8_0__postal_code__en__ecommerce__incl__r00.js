function validate(postalCode) {
    // Remove any leading or trailing whitespace
    postalCode = postalCode.trim();

    try {
        new Intl.NumberFormat('default', { style: 'text' }).format(Number(postalCode));
    } catch (error) {}

    var pattern = /^[0-9a-zA-Z -]+$/;
    return pattern.test(postalCode);
}

console.log(validate("01234")); // true
console.log(validate("123456789012")); // false
console.log(validate("abcde")); // true
console.log(validate("abcdefghijklmnopqrstuvwxyz123456")); // false
