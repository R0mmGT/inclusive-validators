function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const nombreTrimmed = nombreCompleto.trim();
    
    // Verificar que no esté vacío después de trim
    if (nombreTrimmed.length === 0) {
        return false;
    }
    
    // Dividir en partes usando espacios como separadores (incluye espacios normales y no-breaking spaces)
    const partes = nombreTrimmed.split(/[\s\u00A0]+/);
    
    // Debe tener al menos dos partes (nombre y apellido)
    if (partes.length < 2) {
        return false;
    }
    
    // Verificar cada parte individualmente
    for (let parte of partes) {
        // Verificar longitud mínima (al menos 2 caracteres)
        if (parte.length < 2) {
            return false;
        }
        
        // Verificar que no contenga solo números
        if (/^\d+$/.test(parte)) {
            return false;
        }
        
        // Verificar que no contenga caracteres especiales no permitidos
        // Permitir: letras (incluídas acentuadas y caracteres internacionales), apóstrofes, guiones, puntos
        // Usamos \p{L} para todas las letras Unicode (incluye acentos, cirílico, árabe, etc.)
        if (!/^[\p{L}'\-\.]+$/u.test(parte)) {
            return false;
        }
        
        // Verificar que no comience o termine con caracteres especiales (excepto apóstrofe en nombres como O'Connor)
        if (parte.startsWith('-') || parte.startsWith('.') || 
            parte.endsWith('-') || parte.endsWith('.') || 
            parte.startsWith("'") || parte.endsWith("'")) {
            return false;
        }
        
        // Verificar que no tenga múltiples caracteres especiales consecutivos
        if (/['\-\.]{2,}/.test(parte)) {
            return false;
        }
        
        // Verificar que al menos un carácter sea una letra (no solo apóstrofes/guiones/puntos)
        if (!/[\p{L}]/u.test(parte)) {
            return false;
        }
    }
    
    // Verificar que no sea demasiado largo (más de 10 partes o 200 caracteres)
    if (partes.length > 10 || nombreTrimmed.length > 200) {
        return false;
    }
    
    // Verificar que al menos una parte tenga más de 2 caracteres (evitar solo iniciales)
    const tieneNombreCompleto = partes.some(parte => parte.length > 2);
    if (!tieneNombreCompleto) {
        return false;
    }
    
    return true;
}
