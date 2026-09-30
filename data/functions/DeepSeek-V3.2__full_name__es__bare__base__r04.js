function validate(nombreCompleto) {
    // Validar que sea string y no esté vacío
    if (typeof nombreCompleto !== 'string' || nombreCompleto.trim() === '') {
        return false;
    }
    
    // Eliminar espacios extra y dividir en partes
    const partes = nombreCompleto.trim().split(/\s+/);
    
    // Debe tener al menos dos partes (nombre y apellido)
    if (partes.length < 2) {
        return false;
    }
    
    // Cada parte debe cumplir con ciertas reglas
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Longitud mínima y máxima razonable
        if (parte.length < 2 || parte.length > 50) {
            return false;
        }
        
        // Debe empezar con mayúscula
        if (parte[0] !== parte[0].toUpperCase()) {
            return false;
        }
        
        // El resto debe ser minúsculas (permite guiones y apóstrofos)
        const resto = parte.substring(1);
        if (!/^[a-záéíóúüñçàèìòùäëïöüÿß\-']+$/.test(resto)) {
            return false;
        }
        
        // Validaciones adicionales para caracteres especiales
        // No puede empezar o terminar con guion/apóstrofo
        if (parte.startsWith('-') || parte.startsWith("'") || 
            parte.endsWith('-') || parte.endsWith("'")) {
            return false;
        }
        
        // No puede tener dos guiones o apóstrofos seguidos
        if (/(--|''|'-|'-)/.test(parte)) {
            return false;
        }
    }
    
    return true;
}
