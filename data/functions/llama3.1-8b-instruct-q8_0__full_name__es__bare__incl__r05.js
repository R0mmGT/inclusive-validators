function validate(name) {
    /**
     * Función de validación de nombre completo de persona.
     *
     * @param {string} name - El nombre completo de la persona por validar.
     * @returns {boolean} True si el nombre es válido, False en caso contrario.
     */
    
    // Quitar espacios al inicio y final del nombre para evitar que afecten a la validación
    name = name.trim();
    
    // Reemplazar espacios múltiples por uno sólo (no solo para personas latinas)
    while ((name.match(/\s+/)) !== null) {
        name = name.replace(/\s+/gi, ' ');
    }
    
    // Split el nombre en sus partes (nombre completo usualmente consta de 2 a 5 campos en la mayoría de países)
    let nameParts = name.split(' ');
    
    // La longitud mínima del nombre es 2 y la máxima son 5 palabras, incluyendo el apellido
    if (!name Parts.length >= 2 && name Parts.length <= 4) {
        return false;
    }
    
    // Los nombres deben tener solo letras y espacio (es decir, no caracteres especiales)
    let isValid = true;
    for (let part of nameParts) {
        for (let char of part) {
            if (!/[a-zA-Z]/.test(char)) {
                isValid = false;
                break;
            }
        }
        if (!isValid) {
            break;
        }
    }
    
    // Si al final el nombre no es válido, se sale del método
    return !nameParts.filter(part => part.length === 0).length && name.match(/^[a-zA-Z]+$/) !== null && isValid;

}
