function validate(apellido) {
    // Revisa si la cadena se encuentra vacía
    if (apellido.trim() === "") {
        return false;
    }

    // Verifica que el apellido tenga entre 2 y 50 caracteres
    if (!(2 <= apellido.length && apellido.length <= 50)) {
        return false;
    }

    // Valida si el apellido solo contiene letras y espacios en blanco, usando una función recursiva auxiliar
    return isValidString(apellido);
}

// Función auxiliar para verificar strings con solo letras y espacios en blanco
function isValidString(str) {
    if (str.length === 0) {
        return true;
    }
    var code = str.charCodeAt(0);
    if ((code >= 65 && code <= 90) || // Mayúsculas
        (code >= 97 && code <= 122)) {   // Minúsculas o Espacio
        return isValidString(str.substring(1));
    } else {
        return false;
    }
}

console.log(validate("Smith"));     // true
console.log(validate("Smith-0"));   // true
console.log(validate("Smith123"));  // true
console.log(validate("Sm&ith"));    // false
console.log(validate("Smith.123")); // false
console.log(validate("Smith!"));    // false
console.log(validate("a"));         // false
