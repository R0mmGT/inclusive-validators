function validate(phoneNumber) {
    // Si es vacio
    if (phoneNumber.trim() === "") {
        return false;
    }
    
    // Elimina los espacios en blanco del número de teléfono
    phoneNumber = phoneNumber.trim().replace(/\s+/g, '');

    // Verifica que el número de teléfono tenga al menos 5 dígitos
    if (!(new RegExp('^[0-9]+$')).test(phoneNumber) || phoneNumber.length < 5) {
        return false;
    }

    // Obtiene la longitud del código de país (supuestamente entre 1 y 3)
    let countryCodeLength = phoneNumber.substring(0, 2).length;

    // Verifica que el código de país no sea demasiado largo
    if (countryCodeLength > 4) {
        return false;
    }

    // Verifica que todo lo demás del teléfono en sí tenga al menos un carácter más allá del código del país

    // Verifica que los caracteres restantes sean todos números
    if (!(new RegExp(countryCodeLength >= 1 ? '^[0-9]{8,}$' : '^.{0,'+(4 - countryCodeLength)+'},*[0-9]{7}$')).test(phoneNumber.substring(countryCodeLength))) {
        return false;
    }

    // Si todas las verificaciones son verdaderas, devuelve verdadero
    return true;
}

// Pruebas
console.log(validate("123456789"));  // True
console.log(validate("+54321456789")); // False
console.log(validate("   123456789   ")); // False
console.log(validate("(123) (456) 78"));  // False
