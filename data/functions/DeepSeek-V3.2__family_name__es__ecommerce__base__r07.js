function validate(apellido) {
    // Validar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y al final
    const apellidoTrimmed = apellido.trim();
    
    // Validar que no esté vacío después del trim
    if (apellidoTrimmed.length === 0) {
        return false;
    }
    
    // Validar longitud razonable (entre 2 y 50 caracteres)
    if (apellidoTrimmed.length < 2 || apellidoTrimmed.length > 50) {
        return false;
    }
    
    // Validar caracteres permitidos:
    // - Letras (incluyendo acentos y caracteres especiales comunes en apellidos)
    // - Guiones, espacios y apóstrofes (para apellidos compuestos)
    const caracteresPermitidos = /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÂÊÎÔÛâêîôûÑñÇç'\- ]+$/;
    
    if (!caracteresPermitidos.test(apellidoTrimmed)) {
        return false;
    }
    
    // Validar que no empiece ni termine con guión, espacio o apóstrofe
    if (/^[\-\' ]|[\-\' ]$/.test(apellidoTrimmed)) {
        return false;
    }
    
    // Validar que no tenga guiones, espacios o apóstrofes consecutivos
    if (/[\-\' ]{2,}/.test(apellidoTrimmed)) {
        return false;
    }
    
    // Validar que tenga al menos una letra (no solo símbolos)
    if (!/[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÂÊÎÔÛâêîôûÑñÇç]/.test(apellidoTrimmed)) {
        return false;
    }
    
    // Validar que la primera letra de cada palabra sea mayúscula (opcional pero común)
    // Esta regla es más flexible ya que algunos usuarios pueden escribir en minúsculas
    
    return true;
}
