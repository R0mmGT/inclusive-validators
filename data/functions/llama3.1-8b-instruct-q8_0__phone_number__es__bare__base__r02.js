function validate(phoneNumber) {
    // Remuevo cualquier caracter que no sean dígitos del string
    let cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    
    // Compruebo si telefono tiene un mínimo de 7 y máximo de 15 caracteres
    if (cleanPhoneNumber.length < 7 || cleanPhoneNumber.length > 15) {
        return false;
    }
    
    // El primer dígito debe ser uno u ocho para teléfonos de España, los países comunitarios o internacional.
    // Los demás pueden ser cualquier número entre el 8 y un cero.
    for (let i = 0; i < cleanPhoneNumber.length; i++) {
        if (i == 0 && !['1', '8'].includes(cleanPhoneNumber[i])) {
            return false;
        }
        if (i > 0 && !'0123456789'.includes(cleanPhoneNumber[i])) {
            return false;
        }
    }

    return true;
}

console.log(validate('+34612345678')); // debe devuelve True
console.log(validate('1123456')); // debe devolver False
console.log(validate('1abcde')); // debe devuelve False
