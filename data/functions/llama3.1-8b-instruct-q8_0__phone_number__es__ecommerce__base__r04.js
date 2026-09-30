function validate(phone) {
    if (typeof phone !== 'string') {
        return false;
    }
    
    // Elimina cualquier espacio o caracter especial del número de teléfono.
    let cleanNumber = phone.replace(/[^0-9]+/g, "");
    
    // Comprueba si el número tiene entre 7 a 15 dígitos (este es un rango común para números telefónicos)
    if (cleanNumber.length >= 7 && cleanNumber.length <= 15) {
        return true;
    }
    
    // Si no, devuelve false
    return false;
}

console.log(validate('123456789'));  // True
console.log(validate('123-456-789'));  // True
console.log(validate('123.456.789'));  // True
console.log(validate('12345678901'));  // False (menos de 7 dígitos)
console.log(validate('1234567890123')); // False (más de 15 dígitos)
console.log(validate(12345));
