function validate(fullName) {
    /**
     * Valida si un nombre completo es válido.
     *
     * @param {string} fullName - El nombre completo de la persona a validar.
     *
     * @returns {boolean} true si el nombre completo es válido, false en caso contrario.
     */
    
    // Si el nombre vacío, no es valdio
    if (!fullName.trim()) {
        return false;
    }

    // Se divide en subnombres separados por espacios (tenga en cuenta que hay varios tipos de separadores, como guiones o comas)
    let names = fullName.split(/\s+/);

    // Si hay menos de dos nombres, no está completo
    if (names.length < 2) {
        return false;
    }

    // Primero, valida cada nombre individualmente.
    for (let i = 0; i < names.length; i++) {
        
        if (!validateOneName(names[i])) {
            return false;
        }
    }

    // Si todos los nombres validados son válidos entonces el conjunto de nombres completo es válido.    
    return true;
}

function validateOneName(name) {
    /**
     * Valida si un nombre individual de la persona es válido.
     *
     * @param {string} oneName - El nombre de la persona a validar (puede ser "Juan" o "Juan Pablo").
     *
     * @returns {boolean} true si el nombre es válido, false en caso contrario.   
     */
    
    // Si hay sólo 1 carácter o más de 50 caracteres, no está bien
    if (name.length < 2 || name.length > 50) {
        return false;
    }

    // Se divide para comprobar si el nombre tiene título inicial y/o apellidos.
    let parts = name.replace('.', '').replace(';', '').trim().split(/[\s\-]+/);

    // Si hay más de 3 partes después de dividir, no está bien
    if (parts.length > 3) {
        return false;
    }

    // Valida cada parte del nombre.
    for (let part of parts) {
        if (!part.trim()) continue;  // si la parte vacía ignorar

        let r = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/;

        if (!(r.test(part))) {  // Si no es string y contiene solo letras, está bien
            return false;
        }
    }

    // Si todas las partes se validan satisfactoriamente entonces el nombre individual es válido.    
    return true;
}
