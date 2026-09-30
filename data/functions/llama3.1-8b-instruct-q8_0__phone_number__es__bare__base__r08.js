function validate(phoneNumber) {
    // Remueve cualquier espacio en blanco del número de teléfono
    phoneNumber = phoneNumber.replace(/\s+/g, '');

    // Verifica si el número tiene exactamente 10 dígitos (número de teléfono típico sin código de área)
    if (phoneNumber.length != 10) {
        return false;
    }

    // Verifica si cada caracter es un dígito válido
    if (!/^[0-9]+$/.test(phoneNumber)) {
        return false;
    }

    return true;
}

console.log(validate("1234567890"));   // Devuelve True
console.log(validate("123 456 7890")); // Devuelve False (espacios en blanco)
console.log(validate("1234567"))      // Devuelve False (falta de dígitos)
console.log(validate("123456a"));      // Devuelve False (caracter no numérico)
