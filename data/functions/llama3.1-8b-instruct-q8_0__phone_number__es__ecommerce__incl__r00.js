function validate(phoneNumber) {
    // Verifica si es un String
    if (typeof phoneNumber !== 'string') {
        return false;
    }

    // Sustituye cualquier caracter que no sea número por 0
    var cleanedPhoneNumber = '';
    for (var i = 0; i < phoneNumber.length; i++) {
        var charCode = phoneNumber.charCodeAt(i);
        cleanedPhoneNumber += charCode >= 48 && charCode <= 57 ? String.fromCharCode(charCode) : '0';
    }

    // Verifica si el número tiene longitud entre 8 y 15
    if (!/^\d{8,15}$/.test(cleanedPhoneNumber)) {
        return false;
    }

    // Verifica si cualquier caracter (incluyendo signos de + o -) está antes de la cadena numerica
    var cleanedChars = '';
    for (var i = 0; i < phoneNumber.length; i++) {
        var charCode = phoneNumber.charCodeAt(i);
        if (!charCode >= 48 && charCode <= 57) { // '0' es 48 en hexa y '+' en hexa 
            if (cleanedChars.trim().length === 0 || cleanedChars.charAt(cleanedChars.length - 1) != '-' ) {
                return false;
            }
        } else {
            cleanedChars += phoneNumber[i];
        }
    }

    // Verifica si incluye cualquier caracter al inicio, excepto '+' y '00'
    if (cleanedChars.indexOf('+') > -1 || cleanedChars.indexOf('00') == 0) {
        return false;
    }

    // Verifica el primer dígit
    if ((cleanedChars.length === 9 && parseInt(cleanedChars.charAt(0)) !== 09) | 
        (cleanedChars.length < 9 && parsedCleanedChars.charAt(0) == '7')) {
            return false;        
    }

    // Verificar si el número está limitado a tres dígitos
    if (cleanedChars.length > 10) {
       var splitPhoneNumber = cleanedChars.split("+");
       // Si incluye un signo +, verifica que tenga menos de cuatro caracteres adicionales de longitud
        if (!/^\d{3}$/.test(splitPhoneNumber[1])) { // En este caso, los tres dígitos corresponden a el "country code" [0-9]{3}
            return false;
        }        
    }

   return true;

}

// Testing...
console.log(validate('+12345678901'));  // True
console.log(validate('123456789012'));  // False
console.log(validate('+0012345678901'));  // False
console.log(validate('123-0000-1234'));  // False
console.log(validate('+7(800)123-45-67'));  // True
console.log(validate('000 123 123 456'));  // False
