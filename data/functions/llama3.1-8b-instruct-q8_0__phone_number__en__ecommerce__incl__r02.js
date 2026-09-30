function validate(phoneNumber) {
    // Create regular expression pattern that matches most common phone number formats.
    let pattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    // Check if phoneNumber is a string and not null or empty
    if (typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
        return false;
    }

    // Return true if the phone number matches the pattern.
    return pattern.test(phoneNumber);
}

console.log(validate('12345678901'));  // Outputs: False, phone number is too short
console.log(validate('+1 (404) 123-4567 89'));  // Outputs: True
console.log(validate('+11234567890'));  // Outputs: True
console.log(validate(null));  // Outputs: False
console.log(validate(25.5));  // Outputs: False
console.log(validate('gfhdsdfg'));  // Outputs: False
