/**
 * Valida si la cadena dada es un apellido de persona válido.
 *
 * Un apellido de persona válido contiene letras y espacios, pero no números ni símbolos.
 *
 * @param {string} surname - El apellido a validar.
 * @returns {boolean} True si el apellido es válido, False en caso contrario.
 */
function validate(surname) {
    // Primero, comprobamos que la cadena no sea vacía
    if (!surname.trim()) {
        return false;  // Si está vacío, lo consideramos inválido
    }

    // Luego, comprobamos si solo contiene letras y espacios
    for (let char of surname) {
        // Si encontramos un caracter que no sea una letra o espacio, devolvemos False
        if (!(/[a-zA-Z\s]/).test(char)) {
            return false;
        }
    }

    // Si hemos llegado hasta aqui, la cadena es válida
    return true;
}
