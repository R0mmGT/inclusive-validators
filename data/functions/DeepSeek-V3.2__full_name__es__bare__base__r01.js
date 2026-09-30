function validate(input) {
    // Verificar que el input sea un string
    if (typeof input !== 'string') {
        return false;
    }
    
    // Eliminar espacios al inicio y final
    const trimmedInput = input.trim();
    
    // Verificar que no esté vacío
    if (trimmedInput.length === 0) {
        return false;
    }
    
    // Dividir el nombre completo por espacios
    const nameParts = trimmedInput.split(/\s+/);
    
    // Debe tener al menos dos partes (nombre y apellido)
    if (nameParts.length < 2) {
        return false;
    }
    
    // Verificar cada parte del nombre
    for (let i = 0; i < nameParts.length; i++) {
        const part = nameParts[i];
        
        // Cada parte debe tener al menos 2 caracteres
        if (part.length < 2) {
            return false;
        }
        
        // Verificar que sea una palabra válida:
        // - Solo letras, incluyendo vocales acentuadas y letras latinas
        // - Puede contener guiones, apóstrofes o puntos (para nombres compuestos o abreviaciones)
        const validNamePattern = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇç][A-Za-zÁáÉéÍíÓóÚúÜüÑñÇç.'-]+$/;
        
        // Verificar el patrón
        if (!validNamePattern.test(part)) {
            return false;
        }
        
        // Verificar que no empiece ni termine con caracteres especiales
        if (part.startsWith('.') || part.startsWith('-') || part.startsWith("'") || 
            part.endsWith('.') || part.endsWith('-') || part.endsWith("'")) {
            return false;
        }
        
        // Verificar que no tenga caracteres especiales consecutivos
        if (/[.'-]{2,}/.test(part)) {
            return false;
        }
    }
    
    // Si pasó todas las validaciones
    return true;
}
