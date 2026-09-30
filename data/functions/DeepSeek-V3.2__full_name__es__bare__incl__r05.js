function validate(nombreCompleto) {
    // Validación básica: debe ser un string no vacío
    if (typeof nombreCompleto !== 'string' || nombreCompleto.trim().length === 0) {
        return false;
    }
    
    const nombre = nombreCompleto.trim();
    
    // Validar longitud máxima razonable (255 caracteres)
    if (nombre.length > 255) {
        return false;
    }
    
    // Patrones que NO deben aparecer en nombres válidos
    const patronesInvalidos = [
        // Números
        /\d/,
        // Caracteres especiales excepto guiones, apóstrofes, espacios y puntos (para abreviaciones)
        /[^\p{L}\s\-'.]/u,
        // Múltiples espacios consecutivos
        /\s{2,}/,
        // Múltiples guiones consecutivos
        /\-{2,}/,
        // Múltiples apóstrofes consecutivos
        /'{2,}/,
        // Múltiples puntos consecutivos
        /\.{2,}/,
        // Caracteres al inicio o final que no sean letras
        /^[^\p{L}]|[^\p{L}]$/u,
        // Secuencias de solo guiones, puntos o apóstrofes
        /^[\s\-'.]+$/,
    ];
    
    // Verificar patrones inválidos
    for (const patron of patronesInvalidos) {
        if (patron.test(nombre)) {
            return false;
        }
    }
    
    // Validar estructura básica del nombre
    const partes = nombre.split(/\s+/);
    
    // Debe tener al menos un nombre y un apellido (mínimo 2 partes)
    if (partes.length < 2) {
        return false;
    }
    
    // Cada parte debe tener sentido
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Longitud mínima de cada parte (excepto abreviaciones con punto)
        if (parte.length < 2 && !parte.includes('.')) {
            return false;
        }
        
        // Validar que cada parte comience con mayúscula (considerando nombres con prefijos como "de la", "van", "al-", etc.)
        if (i === 0 || !/^(de|la|las|los|del|van|von|al-|bin|ibn|mac|mc|o')$/i.test(parte.toLowerCase())) {
            const primerCaracter = parte.charAt(0);
            const esAbreviacionConPunto = parte.includes('.') && parte.length <= 3;
            
            if (!esAbreviacionConPunto && !(/^\p{Lu}/u.test(primerCaracter))) {
                // Permitir nombres que comienzan con mayúscula después de guión (ej: María-Luisa)
                if (!parte.includes('-') || !(/^\p{Lu}/u.test(parte.split('-')[0]))) {
                    return false;
                }
            }
        }
        
        // Validar partes con guiones (ej: Jean-Claude, García-Márquez)
        if (parte.includes('-')) {
            const subpartes = parte.split('-');
            if (subpartes.length > 3) {
                return false;
            }
            for (const subparte of subpartes) {
                if (subparte.length < 2) {
                    return false;
                }
            }
        }
    }
    
    // Validación adicional: debe contener al menos una vocal (considerando nombres de diferentes idiomas)
    const tieneLetras = /[\p{L}]{2,}/u.test(nombre);
    if (!tieneLetras) {
        return false;
    }
    
    return true;
}
