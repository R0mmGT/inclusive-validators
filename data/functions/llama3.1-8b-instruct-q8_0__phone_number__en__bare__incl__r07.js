function validate(phoneNumber) {
    // Remove all non-digit characters except for '+' as it is commonly used to indicate the country code.
    let cleanedPhoneNumber = phoneNumber.replace(/[^+\d]/g, '');
    
    // Check if the number starts with a '+' and has at least 1 digit after it.
    if (cleanedPhoneNumber.startsWith('+') && cleanedPhoneNumber.length > 1) {
        cleanedPhoneNumber = cleanedPhoneNumber.substring(1);
    }
        
    // Remove any leading zeros as they don't contribute to the validity of the phone number.
    cleanedPhoneNumber = cleanedPhoneNumber.replace(/^0+,/, '');
    
    // Split the number by '+' and validate each part.
    let parts = cleanedPhoneNumber.split('+');
    
    // Check if there are 2 or more parts with a country code (at least 1 digit).
    for (let i = 0; i < parts.length; i++) {
        let value = parseInt(parts[i]);
        if (!isNaN(value) && value.toString().length === parts[i].length) {
            continue;
        } else {
            return false;
        }
    }
    
    // If we have reached this point, the phone number is valid.        
    return true;
}

console.log(validate("+1 123-456-7890")); // Expected output: true
console.log(validate("(123) 456-7890")); // Expected output: false
