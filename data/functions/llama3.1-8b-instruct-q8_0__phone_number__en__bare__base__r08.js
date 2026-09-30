function validate(phoneNumber) {
    let pattern = /^\d{3}-\d{3}-\d{4}$/;
    
    if (phoneNumber.match(pattern)) {
        return true;
    }
    
    pattern = /^\+?\d{11,15}$/;
    
    if (phoneNumber.match(pattern)) {
        return true;
    }
    
    return false;
}

console.log(validate("123-456-7890"));  // true
console.log(validate("+12345678901"));  // true
console.log(validate("(123) 456-7890"));  // false
