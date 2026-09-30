function validate(lastName) {
    if (typeof lastName !== 'string') return false;

    const regex = /^([A-Z][-a-z\. ]{1,40})+$/i;
    return regex.test(lastName);
}

// Test the function
console.log(validate('Smith'));  // Expected output: true
console.log(validate('12345'));   // Expected output: false
