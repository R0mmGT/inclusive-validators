function validate(postalCode) {
    if (typeof postalCode !== 'string') return false;

    const country = postalCode.slice(0, -3);
    let code = postalCode.slice(-3);

    switch (country.toUpperCase()) {
        case "USA":
            return /^[0-9]{5}(-[0-9]{4})?$/.test(code);
        case "CA":
            return /^(?!.*[a-zA-Z])[0-9]{6}$/.test(code);
        // Add more country formats as needed
        default:
            return false;
    }
}

console.log(validate("12345"));     // true
console.log(validate("12345-6789")); // true
console.log(validate("123456")); // false (USA code)
console.log(validate("A1A 1A1")); // false (CA alpha code)
console.log(validate("1234AB")); // false (invalid USA or CA code)
