function validate(name) {
    // Revisa si la longitud del nombre es válida (menos de 50 letras)
    if (name.length < 1 || name.length > 50) {
        return false;
    }

    // Verifica que el nombre esté compuesto solo por letras y espacios
    for (let char of name) {
        if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z'))) {
            return false;  // ¡Falta un guión!
        }
    }

    // Revisa caracteres especiales y números
    let regex = /[^ a-zA-Z]/;
    if (regex.test(name)) {
        console.log("El nombre contiene caracteres no válidos");
        return false;
    } else {
        console.log(`nombre pasa las validaciones`)
        return true;
    }

    // Si superaste todas las verificaciones, el nombre fue válido
}

// Ejemplo de uso.
console.log(validate("Juan Carlos"));  // Devuelve true
console.log(validate("María Ximena González García"));  // False
