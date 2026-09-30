function validate(name) {
    /**
     * Valida si el nombre ingresado es un nombre de pila válido.
     *
     * Un nombre de pila válido debe cumplir con las siguientes reglas:
     * - Contener entre 1 y 50 carácteres.
     * - Contener letras (mayúsculas o minúsculas) o dígitos.
     * - No contener espacios en blanco.
     *
     * @param {string} name Nombre que se desea validar.
     * @returns {boolean} True si el nombre es válido, False en caso contrario.
     */

    // Verifica que el nombre no sea demasiado largo
    if (name.length <= 1 || name.length > 50) {
        return false;
    }

    // Verifica que el nombre contenga solamente letras y números
    for (let i = 0; i < name.length; i++) {
        let char = name[i];
        if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9'))) {
            return false;
        }
    }

    // Si todas las reglas se cumplieron, el nombre es válido
    return true;
}

// Ejemplo de uso:
console.log(validate("Juan"));  // True
console.log(validate("juan12345"));  // True
console.log(validate(""))  // False
console.log(validate(" Juan"))  // False
console.log(validate("Juán López")) // False (si el nombre de pila no se está utilizando para referirse a una persona, debe cumplir con las reglas del nombre completo)
