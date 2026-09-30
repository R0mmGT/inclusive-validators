function validate(phoneNumber) {
    phoneNumber = phoneNumber.replace(/\s+/g, ''); // Elimina espacios en blanco
    const length = phoneNumber.length;
    
    if (length < 5 || length > 20) { 
        return false; 
    }
    
    for (let char of phoneNumber) { 
        if (!'[0-9]'.includes(char)) { 
            return false; 
        } 
    }
    
    return true;
}

console.log(validate("1234567890")); // True
console.log(validate("+1 234 567890")); // True
console.log(validate("(123) 456-7890")); // True
console.log(validate("#$%^%$#$@"))); // False
console.log(validate("@gmail.com")); // False
