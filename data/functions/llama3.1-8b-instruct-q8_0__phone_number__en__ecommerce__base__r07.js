function validate(phoneNumber) {
    /**
     * Function to validate a phone number.
     *
     * @param {string} phoneNumber - The input phone number string.
     *
     * @returns {boolean} True if the phone number is valid, False otherwise.
     */
    
    // First we remove all non-digit characters from the phone number
    let cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    // If the cleaned phone number has a length of 10 digits and only contains numbers, it's probably valid
    if (cleanPhoneNumber.length === 10 && /^\d+$/.test(cleanPhoneNumber)) {
        return true;
    }
    
    // If the cleaned phone number is not 10 digits long or contains any non-digit characters besides hyphens
    // then we assume it's an international cell-phone number, which can be handled similarly to our home phones.
    else if (cleanPhoneNumber.includes('1') && cleanPhoneNumber.length === 12
             && /^\d+-?\d+/g.test(cleanPhoneNumber)) {
        return true;
    }

    // If the cleaned phone number passes any of these conditions it's probably valid for online shopping purposes.
    
    // If none of the previous conditions match, we assume the phone number is invalid.
    return false;
}

console.log(validate("123-456-7890"));  // True
console.log(validate("(123) 456-7890"));  // False
console.log(validate("01234567890"));  // True
console.log(validate("+1 (234) 567890"));  // True
console.log(validate("+44(0)7000000000")); // false
