function validate(name) {
    /**
     * Valida si una cadena de texto es un apellido.
     *
     * @param {string} name - El apellido a validar.
     * @returns {boolean} Si el apellido es válido, devuelve true; en caso contrario, devuelve false.
     */
    
    // Si la cadena está vacía, no es un apellido válido
    if (name.length === 0) {
        return false;
    }

    // Los apellidos suelen tener entre dos y veinte letras
    if (!(2 <= name.length && name.length <= 20)) {
        return false;
    }
    
    // Utilizamos la expresión regular para comprobar que el apellido solo contiene caracteres válidos
    // (letras mayúsculas, minúsculas y signos diacríticos en caso de apellidos con acentos, no números ni otros símbolos)
    const patron = /[^\p{L}\s]/u;
    if (name.search(patron) !== -1) {
        return false;
    }
    
    // Si se cumplen todas las condiciones anteriores, el apellido es válido
    return true;
}
