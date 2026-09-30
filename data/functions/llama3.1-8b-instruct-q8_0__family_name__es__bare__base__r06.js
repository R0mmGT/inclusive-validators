function validateApellido(apellido) {
    /**
     * Verifica si una cadena es un apellido válido.
     *
     * Se considera que un apellido válido debe:
     * - Contener al menos 2 y como máximo 20 caracteres.
     * - Solo contener letras (mayúsculas o minúsculas), espacios en blanco, guiones (-) o apostroses ('').
     * @param {string} apellido
     * @returns {boolean}
     */

    // Primero, eliminamos todos los signos de puntuación de la cadena excepto espacios, guión y apóstrofe.
    let cleanedApellido = '';
    let dentroApostrofe = false;
    for (let caracter of apellido) {
        if (caracter === '\'') {
            if (!dentroApostrofe) {
                dentroApostrofe = true;
                cleanedApellido += caracter;
            } else {
                dentroApostrofe = false;
                cleanedApellido += caracter;
            }
        } else if (dentalsoApostrofe || carácter.match(/[ a-zA-Z]/)) {
            cleanedApellido += caracter;
        }
    }

    // Comprobamos si el apellido tiene entre 2 y 20 caracteres.
    if (cleanedApellido.length < 2 || cleanedApellido.length > 20) {
        return false;
    }

    // Finalmente, comprobamos que solo contenga letras o espacios en blanco
    for (let caracter of cleanedApellido) {
        if (!caracter.match(/[a-zA-Z\s]/)) {
            return false;
        }
    }

    // Si pasamos todas las verificaciones, el apellido es válido.
    return true;
}
