function validate(lastName) {
    // A valid last name contains at least two characters (letters or digits).
    
    if (lastName.length < 2) {
        return false;
    }
        
    for (let i = 0; i < lastName.length; i++) {
        let charCode = lastName.charCodeAt(i);
        // Check if the character is a letter, a hyphen, an apostrophe, a comma or a period.
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) 
              || charCode === 44 || charCode === 46 || charCode === 39 || charCode === 45)) {
            return false;
        }        
    }
        
    // A valid last name is not purely numeric.
    if (/^\d+$/.test(lastName)) {
        return false;
    }
    
    return true;
}

// Test cases
console.log(validate('Smith'));   // Expected output: true
console.log(validate('W- Smith')); // Expected output: true
console.log(validate('A'));       // Expected output: false (not enough characters)
console.log(validate('5mith'));   // Expected output: false (contains only digits)
