function validate(postalCode) {
    let regex = /^[A-Za-z]\d[A-Za-z][-]?\d$/;
    return regex.test(postalCode);
}

console.log(validate("AA1 2BC")); // true
console.log(validate("AB12-34C")); // true
console.log(validate("ABC123D")); // false
