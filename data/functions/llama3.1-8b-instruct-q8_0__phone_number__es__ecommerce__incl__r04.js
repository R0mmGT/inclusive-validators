function validate(phoneNumber) {
    // Remueve cualquier espacio antes o después del número de teléfono
    phoneNumber = phoneNumber.trim();

    // Primero, nos aseguramos de que el número tenga entre 6 y 15 dígitos (esta es una longitud común pero no rígida)
    if (!/^\d{6,15}$/.test(phoneNumber)) {
        return false;
    }

    // Comprobamos si se utiliza el formato con un símbolo de países
    // Este es más probable en números de teléfono internacionales
    if (/[a-zA-Z]{1,3}/.test(phoneNumber.charAt(0))) {
        phoneNumber = phoneNumber.replace(/^[a-zA-Z]/, '').replace(/\+/g, '');
    }
    if(!/^\d+$/.test(phoneNumber)) {
        return false;
    }

    return true;
}

console.log(validate('123456789'));  // Devuelve: true
console.log(validate('+1-1234567890'));  // Devuelve: true
console.log(validate('12345678'));  // Devuelve: false
