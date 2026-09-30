function validate(phoneNumber) {
    // Remove all non-digit characters from the string.
    phoneNumber = phoneNumber.replace(/\D+/g, '')

    // Remove any country codes (which are typically up to 3 digits).
    if (/^\d{1,3}/.test(phoneNumber)) { 
        phoneNumber = phoneNumber.slice(3); 
    }

    let pattern = new RegExp('^\\d{7,10}$');
    return pattern.test(phoneNumber);
}

console.log(validate("+12345678901")); // true
console.log(validate("13245656789")); // false
