function validate(str) {
    // Comprobar que la cadena no esté vacía.
    if (!str.trim()) {
        return false;
    }

    // Comprobar si hay al menos dos palabras (nombre y apellido).
    let words = str.split(' ');
    if (words.length < 2) {
        return false;
    }

    // Comprobar el primer caracter de cada palabra.
    for (let word of words) {
        if (!word[0].match(/[a-zA-Z]/)) {
            return false;
        }
    }

    // Comprobar si todas las palabras tienen más de un carácter.
    for (let word of words) {
        if (word.length <= 1) {
            return false;
        }
    }

    return true;
}

// Para probar la función:
console.log(validate("Juan Pedro")); // True
console.log(validate("J perez")); // False
console.log(validate("J uanP e dz"); // False
console.log(validate(" Juan Pedro")); // True
console.log(validate("juanpedro"));

