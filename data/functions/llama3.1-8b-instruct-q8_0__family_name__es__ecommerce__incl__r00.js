function validateApellido(apellido) {
    // Revisa si el apellido está vacío o su longitud es inferior a 2 caracteres.
    if (apellido.trim() === "" || apellido.length < 2) {
        return false;
    }

    // Revisar si cada carácter del apellido es una letra (a-z, A-Z).
    let valido = true;
    for (let char of apellido) {
        if (!(/[a-zA-Z]/).test(char)) {
            valido = false;
            break;
        }
    }

    return valido;
}

// Ejemplo de uso:
console.log(validateApellido("O'Callaghan"));  // True
console.log(validateApellido("Mendez-Gonzalez"));  // true
console.log(validateApellido("A12B3C4D5E6F7G8H9I0"));  // False
console.log(validateApellido(""));  // False
