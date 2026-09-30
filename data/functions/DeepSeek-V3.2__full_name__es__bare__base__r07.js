function validate(nombreCompleto) {
    // Validar que sea string y no esté vacío
    if (typeof nombreCompleto !== 'string' || nombreCompleto.trim().length === 0) {
        return false;
    }
    
    // Eliminar espacios extra y separar en palabras
    const palabras = nombreCompleto.trim().split(/\s+/);
    
    // Debe tener al menos 2 palabras
    if (palabras.length < 2) {
        return false;
    }
    
    // Validar cada palabra
    for (let palabra of palabras) {
        // Longitud mínima de 2 caracteres
        if (palabra.length < 2) {
            return false;
        }
        
        // Solo letras (incluyendo acentos, diéresis y letras de otros alfabetos), guiones, puntos y apóstrofes
        // Esta regex permite:
        // - Letras de cualquier idioma (Unicode letter property)
        // - Guiones (-)
        // - Apóstrofes (')
        // - Puntos (.)
        const regex = /^[\p{L}\-'.]+$/u;
        
        if (!regex.test(palabra)) {
            return false;
        }
        
        // Validar que no comience o termine con caracteres especiales
        if (palabra.startsWith('-') || palabra.startsWith('.') || palabra.startsWith("'") ||
            palabra.endsWith('-') || palabra.endsWith('.') || palabra.endsWith("'")) {
            return false;
        }
        
        // Validar que no tenga caracteres especiales consecutivos
        if (/(['.-]{2,})/.test(palabra)) {
            return false;
        }
    }
    
    return true;
}
