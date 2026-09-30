function validate(nombreCompleto) {
    // Verificar que el argumento sea string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al inicio y final
    const nombreLimpio = nombreCompleto.trim();
    
    // Verificar longitud mínima y máxima razonable
    if (nombreLimpio.length < 2 || nombreLimpio.length > 100) {
        return false;
    }
    
    // Dividir en partes usando espacios como separadores
    const partes = nombreLimpio.split(/\s+/);
    
    // Debe tener al menos nombre y apellido (2 partes)
    if (partes.length < 2) {
        return false;
    }
    
    // Validar cada parte individualmente
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Cada parte debe tener longitud mínima de 2 caracteres
        if (parte.length < 2) {
            return false;
        }
        
        // No debe contener números
        if (/\d/.test(parte)) {
            return false;
        }
        
        // No debe contener caracteres especiales excepto guiones y apóstrofes permitidos
        if (!/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÜüÇçßØøÅåÆæ\'-]+$/.test(parte)) {
            return false;
        }
        
        // No debe empezar o terminar con guión o apóstrofe
        if (parte.startsWith('-') || parte.endsWith('-') || 
            parte.startsWith("'") || parte.endsWith("'")) {
            return false;
        }
        
        // No debe tener guiones o apóstrofes consecutivos
        if (/-{2,}/.test(parte) || /'{2,}/.test(parte)) {
            return false;
        }
    }
    
    return true;
}
