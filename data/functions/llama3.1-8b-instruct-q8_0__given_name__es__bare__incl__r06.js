function validate(nombre) {
    // Si el nombre está vacío, no es válido.
    if (nombre === '') {
        return false;
    }

    // Comprueba si todos los caracteres del string son letras.
    for (let i = 0; i < nombre.length; i++) {
        if (!/^[a-zA-Z]+$/g.test(nombre[i])) {
            return false;
        }
    }

    // El nombre debe tener al menos dos letras, y no más de ocho letras. Esto es una regla general para nombres comunes.
    if (nombre.length < 2 || nombre.length > 8) {
        return false;
    }

    // Comprueba si el nombre contiene números o símbolos.
    if (!/^[a-zA-Z]+$/.test(nombre)) {
        return false;
    }

    return true;
}

console.log(validate('John Doe'));  // True
console.log(validate('123 Main St.'));  // False
