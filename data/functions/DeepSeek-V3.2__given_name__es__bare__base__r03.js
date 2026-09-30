function validate(nombre) {
    // Verificar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const nombreTrim = nombre.trim();
    
    // Verificar que no esté vacío después de trim
    if (nombreTrim.length === 0) {
        return false;
    }
    
    // Validar longitud (nombres típicamente entre 1 y 50 caracteres)
    if (nombreTrim.length > 50) {
        return false;
    }
    
    // Validar que solo contenga letras, espacios, guiones o apóstrofos comunes en nombres
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜüÀÈÌÒÙàèìòùÇçßØøÅåÄäÖöÆæ'\- ]+$/;
    if (!regex.test(nombreTrim)) {
        return false;
    }
    
    // Validar estructura básica
    // No puede empezar o terminar con espacios, guiones o apóstrofos
    if (/^[\-\' ]|[\-\' ]$/.test(nombreTrim)) {
        return false;
    }
    
    // No puede tener guiones o apóstrofos consecutivos
    if (/[\-\']{2,}/.test(nombreTrim)) {
        return false;
    }
    
    // No puede tener espacios múltiples consecutivos
    if (/  +/.test(nombreTrim)) {
        return false;
    }
    
    // Debe tener al menos una letra (no solo símbolos)
    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñÜüÀÈÌÒÙàèìòùÇçßØøÅåÄäÖöÆæ]/.test(nombreTrim)) {
        return false;
    }
    
    // Verificar que tenga al menos una letra mayúscula/minúscula válida
    // (opcional, dependiendo de los requisitos)
    
    return true;
}
