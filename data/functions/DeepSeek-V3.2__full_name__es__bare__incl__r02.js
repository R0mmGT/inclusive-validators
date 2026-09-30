function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const nombreTrimmed = nombreCompleto.trim();
    
    // Un nombre no puede estar vacío después de trim
    if (nombreTrimmed.length === 0) {
        return false;
    }
    
    // Dividir por espacios (incluyendo espacios múltiples y otros separadores comunes)
    // Consideramos que un espacio, guion, apóstrofe o punto pueden ser parte de un nombre
    // pero necesitamos verificar que haya al menos dos componentes significativos
    const partes = nombreTrimmed.split(/[\s\u00A0]+/); // \u00A0 es espacio de no separación
    
    // Debe tener al menos dos partes (nombre y apellido)
    if (partes.length < 2) {
        return false;
    }
    
    // Verificar cada parte
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Cada parte debe tener al menos un carácter (después de limpiar guiones, apóstrofes, etc.)
        // y no debe consistir solo de puntuación
        const parteLimpia = parte.replace(/[-'.]/g, '');
        
        if (parteLimpia.length === 0) {
            return false;
        }
        
        // Debe contener al menos una letra (considerando caracteres Unicode)
        if (!/[^\d\s]/.test(parte)) {
            return false;
        }
        
        // Longitud mínima para cada parte (considerando nombres como "Li" o "Jo")
        if (parteLimpia.length < 1) {
            return false;
        }
        
        // Longitud máxima razonable (por ejemplo, 30 caracteres)
        if (parte.length > 30) {
            return false;
        }
        
        // Validar caracteres permitidos:
        // - Letras de cualquier alfabeto (Unicode)
        // - Guiones, apóstrofes, puntos (solo en medio del nombre, no al inicio/final)
        // - Espacios ya fueron manejados por el split
        
        // No puede empezar o terminar con puntuación (excepto que el apóstrofe sea válido al inicio en algunos casos)
        if (/^[-.]/.test(parte) || /[-.]$/.test(parte)) {
            // Algunas culturas permiten apóstrofe al inicio (ej: O'Connor)
            // pero no permitimos otros signos al inicio
            if (!/^'/.test(parte) && /^[-.]/.test(parte)) {
                return false;
            }
        }
        
        // No puede tener caracteres no permitidos
        // Permitimos: letras, espacios (ya separados), guiones, apóstrofes, puntos
        const caracteresInvalidos = parte.match(/[^\p{L}\p{M}\s'-.]/gu);
        if (caracteresInvalidos) {
            return false;
        }
        
        // No puede tener puntuación múltiple consecutiva
        if (/[-.]{2,}/.test(parte) || /''/.test(parte)) {
            return false;
        }
    }
    
    // Verificar que no sea un patrón obviamente no válido
    // (como solo números o repeticiones del mismo carácter)
    const sinEspacios = nombreTrimmed.replace(/\s/g, '');
    if (/^(\d+)$/.test(sinEspacios)) {
        return false;
    }
    
    // Verificar que al menos una parte tenga más de 1 carácter (para evitar "A B")
    // pero permitiendo nombres de una letra si hay suficientes partes
    let partesLargas = 0;
    for (const parte of partes) {
        const parteLimpia = parte.replace(/[-'.]/g, '');
        if (parteLimpia.length > 1) {
            partesLargas++;
        }
    }
    
    // Si solo tenemos una parte larga y muchas cortas, podría ser válido
    // Pero si todas son de una letra, es sospechoso (a menos que haya muchas partes)
    if (partesLargas === 0 && partes.length < 3) {
        return false;
    }
    
    return true;
}
