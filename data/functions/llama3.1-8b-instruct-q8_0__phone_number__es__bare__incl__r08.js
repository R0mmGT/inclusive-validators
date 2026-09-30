function validate(phoneNumber) {
    if (phoneNumber.length < 5 || phoneNumber.length > 15) return false;
    
    var regex = /^\d+$/g; // Expresión regular que busca números
    
    if (!regex.test(phoneNumber)) return false;
    
    for (var i = 0; i < phoneNumber.length; ++i) {
        if (!((i == 3 || i == 7) && phoneNumber[i] == '-')) { // Comprueba si hay guiones
            if (!(regex.test(phoneNumber.slice(i, i + 1)))) return false;
        }
    }
    
    return true;
}

console.log(validate('1234567890'));       // True
console.log(validate('123-456-7890'));     // True
console.log(validate('+1234567890'));      // True
console.log(validate('123.456.7890'));     // False, contiene punto antes de verificar que haya un guion acontinuación;
console.log(validate('123$456$7890'));    // False, con un caracter no numérico
