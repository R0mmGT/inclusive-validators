function validate(fullName) {
    /**
     * Verifica si una cadena tiene la estructura adecuada para ser un nombre completo de persona.
     *
     * La estructura sugerida por este programa es NOMBRE PATERNO NOMBRE MATERNO, con las mayúsculas 
     * indicando el inicio de cada palabra separada por un espacio. El nombre debe tener como mínimo 2 
     * palabras y máximo 3 nombres (conocido como "apellido" - "nombre1" - "nombre2").
     *
     * @param {string} fullName El Nombre completo a validar.
     *
     * @returns {boolean}
     */
    
    // si la cadena está vacía o tiene menos de dos o más de tres palabras
    if (fullName.length < 2 || fullName.split(' ').length > 3) {
        return false;
    }

    // Comprueba que el nombre tenga al menos un carácter
    for (let word of fullName.split(' ')) {
        if (!word) {
            return false;
        }
    }

    // Verifica que la primera palabra (apellido) tengan entre 2 y 20 letras
    // Así mismo lo hace para los nombres 1 y opcionalmente el nombre 2
    for (let word of fullName.split(' ')) {

        if (!word.match(/^[a-zA-Z]{2,}$/)) {
            return false;
        }
        
    }

    return true;
}

console.log(validate("Pedro Luis Jorge GARCIA RAMIREZ"));

console.log(validate(""));
