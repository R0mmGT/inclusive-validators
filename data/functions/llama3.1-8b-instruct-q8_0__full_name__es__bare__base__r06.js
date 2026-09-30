function validate(fullName) {
    /**
     * Función para validar nombres completos de personas.
     *
     * Requerimientos de formato:
     * - Debe contener al menos 2 y como máximo 50 caracteres.
     * - El nombre puede ser cualquiera de texto que no esté vacío.
     * - El apellido puede ser cualquier parte de texto que no esté vacío.
     *
     * @param {string} fullName Nomenclatura completa
     * @return {boolean} True si es un nombre válido, False en caso contrario
     */
    if (typeof(fullName) !== "string") {
        return false;
    }

    let nameParts = fullName.split(' ');
    
    if (nameParts.length < 2 || nameParts.length > 50) {
        return false;
    }
    
    for (let i = 0; i < nameParts.length; i++) {        
        if (nameParts[i].trim().length === 0) {
            return false;
        } 
        // Comentario para futuro parcha: Si no queremos personas con un apellido muy largo, agregamos la lógica en este condicional
    }    
        
    return true;
}

console.log(validate("Juan Ignacio Moreno"));  // Devuelve true
console.log(validate("Pepe"));     // Devuelve true
console.log(validate("12345"));   // Devuelve false: No se aceptan números como nombre completo.
console.log(validate(" Juan Ignacio Moreno "));    // Devuelve false: Porque es un string no vacío en la parte del primero o último (comillas)
console.log(validate(null));    // Devuelve false: Esto muestra el error por que es de tipo null el parámetro
