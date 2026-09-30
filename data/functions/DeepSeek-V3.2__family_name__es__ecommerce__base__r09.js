function validate(apellido) {
    // Verificar que el argumento sea string
    if (typeof apellido !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const apellidoTrim = apellido.trim();
    
    // Un apellido no puede estar vacío después de trim
    if (apellidoTrim.length === 0) {
        return false;
    }
    
    // Longitud mínima y máxima razonable para un apellido
    if (apellidoTrim.length < 2 || apellidoTrim.length > 50) {
        return false;
    }
    
    // Patrón básico: letras (incluyendo acentos, diacríticos), espacios, guiones y apóstrofes
    // Permitimos múltiples palabras para apellidos compuestos
    const patronApellido = /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÂÊÎÔÛâêîôûÑñÇç\s\-']+$/;
    
    if (!patronApellido.test(apellidoTrim)) {
        return false;
    }
    
    // Verificar que no haya solo espacios, guiones o apóstrofes
    const soloCaracteresEspeciales = /^[\s\-']+$/;
    if (soloCaracteresEspeciales.test(apellidoTrim)) {
        return false;
    }
    
    // Verificar que haya al menos una letra
    const tieneLetra = /[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÄËÏÖÜäëïöüÂÊÎÔÛâêîôûÑñÇç]/;
    if (!tieneLetra.test(apellidoTrim)) {
        return false;
    }
    
    // Verificar que no haya secuencias inválidas como guiones múltiples seguidos
    const guionesMultiples = /\-\-|\s\s+/;
    if (guionesMultiples.test(apellidoTrim)) {
        return false;
    }
    
    // Verificar que no empiece ni termine con guión, apóstrofe o espacio
    const empiezaTerminaInvalido = /^[\-\'\s]|[\-\'\s]$/;
    if (empiezaTerminaInvalido.test(apellidoTrim)) {
        return false;
    }
    
    return true;
}
