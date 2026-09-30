function validate(phoneNumber) {
    // Remove any non-digit characters, allowing for country codes and spaces in international numbers.
    phoneNumber = phoneNumber.replace(/[^0-9\+\.\(\)\-\s]+/g, '');
    
    // Check if the number is too short or too long.
    if (phoneNumber.length < 1 || phoneNumber.length > 20) {
        return false;  // Invalid length.
    }
    
    // Match the country code and phone number format of various international numbers.
    let pattern;
    if ((pattern = /\d{3,4}[0-9\-\s]{2,8}$/.test(phoneNumber))) {  
        return true;
    } else if ((pattern = /[+]\d{1,3}[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,14}/gi.test(phoneNumber))){ 
        return true;  // Allow country codes with more specific phone number formats.
    }
    
    // If no pattern matches or there are trailing characters that weren't removed initially by regex (not part of a valid int'l format),
    // then the string is invalid.    
    if (pattern !== undefined) {  
        return false;  // Not in an appropriate region (US or country code + phone #).
    } else {
        return false;
    }
}

/* Test cases: */

console.log(validate("123-456-7890"));  // true
console.log(validate("(123) 456-7890"));  // true
console.log(validate("+1 (123) 456-7890"));  // true
console.log(validate("123.456.7890"));  // true
console.log(validate("(123)-456-7890"));  // false

console.log(validate('1234567890'));  // true
console.log(validate("123 456 7890"));  // true
console.log(validate("+0123 (45) 67890123456789"));  // true
console.log(validate('+1(123)456-7890'));  // false

// Empty string
console.log(validate(''));    // False

// Less than minimum digits allowed, for a US phone number.
console.log(validate('123'));    // False

// More than maximum digits allowed (exceeded if including all characters in an international format; will only accept one of these).
console.log(validate(new Array(20).fill('0').join('')));  //False
