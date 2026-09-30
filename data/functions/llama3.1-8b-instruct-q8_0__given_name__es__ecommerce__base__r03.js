function validate(fullName) {
    /**
     * Validates a full name to determine if it's a valid personal first name.
     *
     * @param {string} fullName - The full name of the person.
     * @returns {boolean} True if the full name is a valid first name, False otherwise.
     */

    // Primero, limpiamos el nombre eliminando espacios en blanco antes y después
    let nombreLimpio = fullName.trim();

    // Si el nombre está vacío o tiene menos de 2 caracteres, no es válido
    if (!nombreLimpio || nombreLimpio.length < 2) {
        return false;
    }

    // Si el nombre contiene números o caracteres especiales, no es válido
    for (let i = 0; i < nombreLimpio.length; i++) {
        let caracter = nombreLimpio[i];
        if (!caracter.match(/[a-zA-Z]/)) {
            return false;
        }
    }

    // Si hemos llegado hasta aquí, el nombre de pila es válido
    return true;
}

console.log(validate("John"));  // true
console.log(validate("Jane Smith"));  // false
console.log(validate("123Hola"));  // false
