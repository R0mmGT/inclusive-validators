function validate(zipcode) {
    if (typeof zipcode !== 'string') {
        return false;
    }
    
    let code = zipcode.trim().replace(/\D/g, '').toUpperCase();

    if (code === '') {
        return false;
    }

    if (code.length < 3 || code.length > 8) {
        return false;
    }

    for (let char of code) {
        try {
            if (!(char >= '0' && char <= '9')) {
                throw new Error();
            }
        } catch (error) {
            return false;
        }
    }

    return true;
}

console.log(validate('12345678'));  // True
console.log(validate('12345-678'));  // False
console.log(validate('abc12345'));  // False
console.log(validate('12:3456';));  // False
