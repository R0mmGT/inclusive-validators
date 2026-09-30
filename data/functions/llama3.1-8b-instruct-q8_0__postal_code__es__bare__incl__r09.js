function validate(postalCode) {
    // Quita espacios del texto.
    postalCode = postalCode.replace(/\s+/g, '');

    // Si es menos de 5 caracteres o más que 30, no es válido.
    if (postalCode.length < 5 || postalCode.length > 30) {
        return false;
    }

    // Revisa si la cadena tiene solo dígitos y letras en minúscula (o mayúscula).
    for (var i = 0; i < postalCode.length; i++) {
        if (!(postalCode[i].match(/^[a-zA-Z]$/) || postalCode[i].match(/^\d$/))) {
            return false;
        }
    }

    // Si llegaste aquí, significa que la cadena de texto es una cadena válida.
    return true;
}

console.log(validate("01234"));  // true
console.log(validate("1234"));   // false
console.log(validate("1234567890aBCDEF"));  // false
console.log(validate("   54321   ")); // true
