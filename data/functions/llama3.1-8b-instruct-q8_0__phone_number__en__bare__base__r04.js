function validate(phoneNumber) {
    let areaCode = phoneNumber.substring(0, 3);
    let exchangeCode = phoneNumber.substring(3, 6);
    let lineNumber = phoneNumber.substring(6);

    if (isNaN(areaCode + '' + exchangeCode + '' + lineNumber)) return false;

    if (!Number.isInteger(parseInt(lineNumber))) return false;

    return true;
}

console.log(validate("123-456-7890")); // Expected output: True
console.log(validate("(202) 555-0134")); // Expected output: False (invalid characters)
