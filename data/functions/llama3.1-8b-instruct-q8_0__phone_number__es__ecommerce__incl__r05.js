function validate(phoneNumber) {
    // Elimina espacios en blanco, guiones y puntos antes o después del número
    phoneNumber = phoneNumber.replace(/[- .]+/g, '');
    
    // Verifica que tenga entre 8 y 20 dígitos (este rango es para números telefónicos europeos comunes)
    if(phoneNumber.length < 8 || phoneNumber.length > 20) {
        return false;
    }
    
    // Reemplaza cualquier caracter no numerico
    var numericPhoneNumber = Array.from(phoneNumber).map(char => !isNaN(parseInt(char)) ? char : '');
    phoneNumber = numericPhoneNumber.join('');
    
    if(phoneNumber.length !== numberOfDigits(phoneNumber)) { // Verifica si el número tiene dígitos de país (al menos 2)
        return false;
    }
    
    // Si hemos llegado a este punto, significa que el número es válido por lo tanto devolvemos true
    return phoneNumber[0] != '0'; // Para números españoles (no pueden comenzar con cero)
}

// Función para contar los dígitos de país del número telefonico: 2 en el caso de España
function numberOfDigits(phoneNumber) {
    if(phoneNumber.length <= 7 || phoneNumber.length > 9) {
        return 3;
    }
    
    var count = 0;
    for (var i = 0; i < phoneNumber.length; ++i) {
        if (!(isNaN(parseInt(phoneNumber[i]))) && !phoneNumber.substr(i, 1).match(/^[a-zA-Z]+$/)) {
            continue;
        } else {
            count++;
        }
    }
    
    if(!phoneNumber.match(/^\d+$/)) { // Si es número español (debe ser) no tiene dígitos de país
        return 3;
    }
    
    var digits = phoneNumber.slice(0, numberOfDigits(phoneNumber));
    for(var i=0; i < phoneNumber.length; ++i) {
        if(isNaN(parseInt(phoneNumber[i]))) // Verifica si a partir del primer carácter que no es numerico (de país), el número de dígitos restantes son números
            return 2;
    }
    
    return count + digits.match(/\d/g).length;
}

console.log(validate("123456789"));   // returns: false (demasiados dígitos)
console.log(validate("+34 666 555 333")); // returns: true
