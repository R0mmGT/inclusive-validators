function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }

    // Eliminar espacios extra al inicio y final
    const nombreLimpio = nombreCompleto.trim();
    
    // Verificar que no esté vacío después de trim
    if (nombreLimpio.length === 0) {
        return false;
    }

    // Verificar longitud total (por ejemplo, entre 2 y 100 caracteres)
    if (nombreLimpio.length < 2 || nombreLimpio.length > 100) {
        return false;
    }

    // Dividir en partes usando espacios como separadores
    const partes = nombreLimpio.split(/\s+/);
    
    // Debe tener al menos nombre y apellido (2 partes)
    if (partes.length < 2) {
        return false;
    }

    // Verificar cada parte
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Cada parte debe tener entre 2 y 50 caracteres
        if (parte.length < 2 || parte.length > 50) {
            return false;
        }
        
        // Debe comenzar con mayúscula
        if (!/^[A-ZÁÉÍÓÚÑÜ]/.test(parte)) {
            return false;
        }
        
        // Solo puede contener letras, apóstrofes, guiones o espacios internos
        // Permitimos caracteres Unicode para nombres internacionales
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\'\-\s]+$/.test(parte)) {
            return false;
        }
        
        // No puede terminar con guión o apóstrofe
        if (/[\-\']$/.test(parte)) {
            return false;
        }
        
        // No puede tener dos guiones o apóstrofes seguidos
        if (/[\-\']{2,}/.test(parte)) {
            return false;
        }
    }

    return true;
}
