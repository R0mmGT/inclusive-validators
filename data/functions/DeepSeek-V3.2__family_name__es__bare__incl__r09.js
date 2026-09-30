function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y al final
    const apellidoTrimmed = apellido.trim();
    
    // Un apellido no puede estar vacío después de quitar espacios
    if (apellidoTrimmed.length === 0) {
        return false;
    }
    
    // Longitud mínima y máxima razonable para un apellido
    if (apellidoTrimmed.length < 1 || apellidoTrimmed.length > 100) {
        return false;
    }
    
    // Validación general de caracteres
    // Permite: letras (incluyendo acentuadas y diacríticos), guiones, apóstrofes, espacios, puntos
    // y caracteres específicos de diferentes culturas
    const caracteresValidos = /^[\p{L}\p{M}'´`\-\s.]+$/u;
    
    // Verificar que todos los caracteres sean válidos
    if (!caracteresValidos.test(apellidoTrimmed)) {
        return false;
    }
    
    // Verificar que no empiece o termine con caracteres no alfabéticos (excepto apóstrofes/acentos en algunos casos)
    // Permite apóstrofes al inicio (ej: O'Connor) pero no solo apóstrofes
    const primerCaracterValido = /^[\p{L}\p{M}']/u.test(apellidoTrimmed);
    const ultimoCaracterValido = /[\p{L}\p{M}]$/u.test(apellidoTrimmed);
    
    if (!primerCaracterValido || !ultimoCaracterValido) {
        return false;
    }
    
    // Verificar que no haya secuencias inválidas de caracteres
    // No más de un guion/apóstrofo/punto seguidos y no combinaciones como ".-" o "-."
    const secuenciasInvalidas = /['´`\-\s.]{2,}|['´`\-\s.][\s.]+['´`\-\s.]|\.\-|\-\./;
    if (secuenciasInvalidas.test(apellidoTrimmed)) {
        return false;
    }
    
    // Verificar que haya al menos una letra
    const tieneLetras = /\p{L}/u.test(apellidoTrimmed);
    if (!tieneLetras) {
        return false;
    }
    
    // Casos especiales para culturas específicas
    // Permite apellidos con prefijos como "van", "de", "di", etc.
    // Estos son válidos incluso si contienen espacios
    
    return true;
}
