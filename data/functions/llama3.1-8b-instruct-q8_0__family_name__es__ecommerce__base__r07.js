function validate(apellido) {
    const patron = /^([A-Z][a-z]{1,4}\s?)+[A-Z][a-z]{2,12}$/;
    
    if (apellido === null || apellido.length < 3 && apellido.toLowerCase() !== 'otros') {
        return false;
    }
    
    return patron.test(apellido);
}

console.log(validate('Doe')); // true
console.log(validate('Jane Doe')); // true
console.log(validate('DOE')); // false - no espacios en blanco
console.log(validate('1234567890')); // false - contiene números
console.log(validate(null)); // false - debe ser un string
console.log(validate('')); // false - longitud inferior a 3 caracteres y no 'otros'
