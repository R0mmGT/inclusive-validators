function validate(surname) {
    // Primero, comprobamos que la cadena no esté vacía.
    if (!surname.trim()) {
        return false;
    }
    
    // Luego, verificamos la longitud de la cadena, considerando una longitud entre 2 y 30 caracteres.
    if (surname.length < 2 || surname.length > 30) {
        return false;
    }
    
    // A continuación, comprobamos si toda la cadena consta únicamente de letras (mayúsculas o minúsculas).
    for (let i = 0; i < surname.length; i++) {
        if (!((surname[i] >= 'A' && surname[i] <= 'Z') || (surname[i] >= 'a' && surname[i] <= 'z'))) {
            return false;
        }
    }
    
    // Por último, comprobamos si la cadena comienza o termina con una vírgula.
    if (surname[0] === ',' || surname[surname.length - 1] === ',') {
        return false;
    }
    
    return true;
}

console.log(validate("Juan")); // true
console.log(validate(", Juan")); // false
console.log(validate("Juan, " )); // false
console.log(validate("")); // false
console.log(validate("JuanPérez")); // false
