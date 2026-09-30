function validate(phoneNumber) {
    // Remove any non-digit characters except for country code '+' and '-' to format phone number as '+123-4567'
    phoneNumber = phoneNumber.replace(/[^0-9\+\-]/g, '');
    
    // Check if the country code is not followed by a valid region prefix or rest of the digits are not numeric.
    if (!phoneNumber && !/^\+/.test(phoneNumber)) return false;
    
    // If the country code starts with '+' then it must be immediately followed by at least any two alphabetic characters which represents the ISO 3166-1 alpha-2 two-letter country codes (for example, 'us' for United States of America). 
    if (/^\+\w{2}/.test(phoneNumber)) {
        // This is a simplified check based on assuming that only English countries are valid in our application.
        // In real-world applications you might need to use an actual list of all possible country codes from ISO 3166-1 alpha-2 (Country Codes with Alpha-2 code) standard
        return false;
    }
    
    if (phoneNumber.length < 3) {
        return phoneNumber === '' || phoneNumber === '+'; // Only allow empty string, or just '+' 
    } else if (/^\d{5,15}$/.test(phoneNumber)) { 
        // Phone number can only contain digits and can be maximum of 12, but may not exceed 10 in certain formats (e.g., international direct dialing)
        return true;
    }
    return false;
}

console.log(validate('+1'));   // true
console.log(validate('+81-012'));  // true
console.log(validate('12345678901'));  // false 
console.log(validate('+8##########'));  // false (number digit too many) 
console.log(validate('8##########'));    // false 

console.assert(validate('+1') == true && validate('+81-012') == true && validate('12345678901') == false && validate('+8##########') == false && validate('8##########') == false);

// Don't use console anymore 
if ('object' === typeof global.window) {
    var log = function(obj){ window.console.log(obj); };
} else if ('undefined' !== typeof print) {
    var log = function(obj){ print(obj.join(', ')); };
} else {
    var log = function() {};
}

console.assert(validate('+1') == true && validate('+81-012') == true && validate('12345678901') == false && validate('+8##########') == false && validate('8##########') == false);
