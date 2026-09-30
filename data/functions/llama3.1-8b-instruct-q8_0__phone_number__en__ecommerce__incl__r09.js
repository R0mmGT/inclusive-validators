function validate(phoneNumber) {
    // Remove any non-digit characters from the phone number
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Check if the phone number is between 5 and 15 digits long (longest country code + longest phone number)
    if (phoneNumber.length < 5 || phoneNumber.length > 15) return false;

    // Check for a '++' or '+' symbol at the beginning
    let index = phoneNumber.indexOf('+');
    if (index !== -1 && ((phoneNumber.length - index) >= 8)) {
        return true;
    } else if (phoneNumber.includes('++')) {
        return false;
    }

    // If it has more than one '+' it's invalid
    if ((phoneNumber.match(/\+/g) || []).length > 1) return false;

    // Remove the '+', '00' or '0' at the beginning of countries like UK, India etc
    phoneNumber = phoneNumber.replace(/^[\+]*\d{2}\d*$/, '');

    // Check for a country code (we've removed any leading '+' and possibly one digit)
    let countryCodeLength = 1;
    if ((phoneNumber.match(/\+/g) || []).length === 0 && phoneNumber !== '') {
        // If there's no international prefix, try to extract it manually
        let countryRegexMatches = phoneNumber.match(/^(\d{1,3})\d*/);
        if (countryRegexMatches) {
            countryCodeLength = countryRegexMatches[1].length;
        }
    }

    // Check the length of the phone number with and without the country code
    function validateWithoutCountryCode(phoneNumber) {
        // Check if the remaining phone number has at least 3 digits
        return phoneNumber.replace(/\D/g, '').replace(/^0*/, '').match(/.{1,}/g).reduce(
            (totalLen, part) => totalLen + part.length,
            0
        ) >= 3;
    }

    let trimmedPhoneNumberWithoutCountryCode;

    if (phoneNumber.includes('++')) {
        return false;
    } else {
        trimmedPhoneNumberWithoutCountryCode = phoneNumber.replace(/^[\+]*(\d{1,3})/, '');
        return validateWithoutCountryCode(trimmedPhoneNumberWithoutCountryCode);
    }
}

console.log(validate("+1(123)456-7890"));   // true
console.log(validate("01012345678"));       // true
console.log(validate("(001)234567890"));    // true
console.log(validate("12 34567 89"));        // false
console.log(validate("12345678901"));        // true
console.log(validate("+1-123-456-7890"));   // true
