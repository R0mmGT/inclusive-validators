function validate(zipCode) {
    if (typeof zipCode !== 'string') {
        return false;
    }
    if (!zipCode.match(/^[0-9]{5}$/)) {
        return false;
    }
    return true;
}

console.log(validate("12345"));  // True
console.log(validate(12345));     // False
console.log(validate("123abc"));  // False
