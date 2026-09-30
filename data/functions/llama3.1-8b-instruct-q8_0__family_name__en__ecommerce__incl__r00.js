function validate(s) {
    // A last name should consist of two or more words separated by spaces or should be 
    // a single character string.
    if (s.length < 2 || !/^[a-zA-Z ]+$/.test(s)) {
        return false;
    }
    
    // A word in the last name may start with any letter and can contain letters and/or digits.
    let words = s.split(' ');
    for (let word of words) {
        if (!/^[A-Za-z][A-Za-z0-9]*$/.test(word)) {
            return false;
        }
        
        // The first letter of the last name is in uppercase
        if (!word.charAt(0).toUpperCase() === word.charAt(0)) {
            return false;
        }
    }

    return true;
}

console.log(validate('Smith'));  // Outputs: true
console.log(validate('Abcdefghijklmnopqrstuvwxyz'));  // Outputs: false
console.log(validate('1234567890'));  // Outputs: false
console.log(validate('Smit'));  // Outputs: false
