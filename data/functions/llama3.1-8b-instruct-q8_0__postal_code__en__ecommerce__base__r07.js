function validate(postalCode) {
    // Remove any whitespace from the string
    postalCode = postalCode.replace(/\s/g, "");
    
    // Check if postal code length is 6 digits
    if (!/^\d{6}$/.test(postalCode)) {
        return false;
    }
    
    // If nothing got returned by now it means everything passed the validation so I 
    // return True to indicate success
    return true;
}

console.log(validate("A1B2C3"));  // Expected output: true
console.log(validate("Invalid Postal Code"));  // Expected output: false
