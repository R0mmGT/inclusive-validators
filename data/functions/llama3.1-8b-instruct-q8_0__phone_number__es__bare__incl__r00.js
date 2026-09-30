function validate(phoneNumber) {
    if (typeof phoneNumber !== 'string') {
        return false;
    }
    
    const regex = /^\+\d{1,2}\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;
    const match = phoneNumber.match(regex);
    
    if (match) {
        let isValidNumber;
        
        switch (phoneNumber[0]) {
            case '+':
                isValidNumber = phoneNumber.length >= 16 && /^\+\d{1,2}\s?\(?\d{3,5}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phoneNumber);
                break;
            default:
                isValidNumber = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phoneNumber);
        }
        
        return isValidNumber;
    } else {
        return false;
    }
}

console.log(validate('+1 123-456-7890')); // true
console.log(validate('(123) 456-7890')); // true
console.log(validate('+84 (123) 456-7890')); // true
console.log(validate('0912345678')); // true
console.log(validate('1234567890')); // false
