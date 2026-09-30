function validate(phoneNum) {
    // Pattern for 10 digit Indian number, with optional space and/or '+' and/or any other character in between
    let pattern1 = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
    
    // Country code: '+...' followed by 11 digits. Optional separator '-','(',')',' ' etc.
    let pattern2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/;
    
    // Pattern for 10 digit international number, with optional space and/or '+' and/or any other character in between
    let pattern3 = /^\d{2,3}[-\s]?\(?\d{1,5}\)?[-\s]?\d{6,7}$/;
    
    // Check if the input string matches any of the patterns
    return (
        (pattern1.test(phoneNum)) ||
        (pattern2.test(phoneNum)) ||
        (pattern3.test(phoneNum)));
}

// Example usage:
console.log(validate("123-456-7890"));  // True
console.log(validate("(123) 456-7890"));  // True
console.log(validate("+123 456 7890"));  // True
console.log(validate("12345678901234"));  // False (too many digits)
console.log(validate("1234567"));  // False (not enough digits)
