function validate(phoneNumber) {
    // Verifica si el número pasado es null o está vacío
    if (phoneNumber === null || phoneNumber === '') {
        return false;
    }

    // Verificar que la longitud sea 10 
    if (!/^\d{10}$/.test(phoneNumber)) {
        return false;    
    } else {
        return true;
    }
}

console.log(validate('1234567890')); // expected output: true
console.log(validate('9876543210')); // expected output: true
console.log(validate('1234567'));   // expected output: falser 
