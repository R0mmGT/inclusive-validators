function validate(phoneNumber) {
    let phoneNumberRegex = /^\+?([0-9\s\-\(\)]*)$/;
    
    if (!phoneNumber.match(phoneNumberRegex)) return false;

    let cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    
    if (cleanPhoneNumber.length < 10) return false;

    return true;
}

console.log(validate("+1-1234567890")); // Expected output: true
console.log(validate("1234567890")); // Expected output: true
console.log(validate("(123) 456-7890")); // Expected output: true
console.log(validate("$%^&*()_+-=[];,./?#@!~`")); // Expected output: false
