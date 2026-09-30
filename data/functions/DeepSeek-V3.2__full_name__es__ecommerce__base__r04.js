function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }

    // Eliminar espacios en blanco al inicio y final
    const nombreLimpio = nombreCompleto.trim();
    
    // Verificar que no esté vacío después de trim
    if (nombreLimpio.length === 0) {
        return false;
    }

    // Verificar longitud máxima razonable (100 caracteres)
    if (nombreLimpio.length > 100) {
        return false;
    }

    // Verificar que contenga al menos un espacio (nombre y apellido)
    const partes = nombreLimpio.split(/\s+/);
    if (partes.length < 2) {
        return false;
    }

    // Verificar cada parte del nombre
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Cada parte debe tener entre 2 y 50 caracteres
        if (parte.length < 2 || parte.length > 50) {
            return false;
        }

        // Verificar que empiece con mayúscula
        if (!/^[A-ZÁÉÍÓÚÜÑ]/.test(parte)) {
            return false;
        }

        // Verificar que el resto sean letras, espacios internos, guiones o apóstrofes válidos
        if (!/^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ'\-]*$/.test(parte)) {
            return false;
        }

        // Verificar que no termine con guion o apóstrofe
        if (/['\-]$/.test(parte)) {
            return false;
        }

        // Verificar que no tenga guiones o apóstrofes consecutivos
        if (/['\-]{2,}/.test(parte)) {
            return false;
        }
    }

    // Verificar que no haya secuencias sospechosas (más de 3 vocales/consonantes seguidas)
    const soloLetras = nombreLimpio.replace(/[^a-záéíóúüñ]/gi, '');
    if (/([aeiouáéíóúü]{4,}|[bcdfghjklmnñpqrstvwxyz]{5,})/i.test(soloLetras)) {
        return false;
    }

    return true;
}
