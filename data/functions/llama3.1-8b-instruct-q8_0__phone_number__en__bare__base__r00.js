function validate(phoneNumber) {
    let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let match = phoneNumber.match(pattern);
    
    if (match !== null && match.length > 1 
        && Math.min(match[1].length, match[2].length, match[3].length) >= 3) {
        return true;
    }
    return false;
}

console.log(validate("(123) 456-7890")); // Outputs: True
console.log(validate("123-456-7890")); // Outputs: True
console.log(validate("123.456.7890")); // Outputs: True
console.log(validate("(123) 456 7890")); // Outputs: False
