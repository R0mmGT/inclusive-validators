function validate(nombreCompleto) {
    // Verificar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }

    // Eliminar espacios en blanco al inicio y al final
    const nombreTrim = nombreCompleto.trim();
    
    // Verificar que la cadena no esté vacía después del trim
    if (nombreTrim.length === 0) {
        return false;
    }

    // Dividir el nombre completo por espacios
    const partes = nombreTrim.split(/\s+/);
    
    // Un nombre completo válido debe tener al menos dos partes (nombre y apellido)
    if (partes.length < 2) {
        return false;
    }

    // Verificar cada parte del nombre
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Cada parte debe tener al menos un carácter
        if (parte.length === 0) {
            return false;
        }

        // Cada parte debe comenzar con una letra mayúscula
        if (!/^[A-ZÁÉÍÓÚÑ]/.test(parte)) {
            return false;
        }

        // Después de la primera letra, solo pueden haber letras (minúsculas o mayúsculas), 
        // guiones o apóstrofes (para nombres como O'Connor, D'Angelo, etc.)
        if (!/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ'-]+$/.test(parte)) {
            // Verificar casos especiales donde la segunda letra también puede ser mayúscula
            // (para nombres como McDonald, McGregor, etc.)
            if (!/^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ]?[a-záéíóúñ'-]+$/.test(parte)) {
                return false;
            }
        }

        // Verificar que no haya guiones o apóstrofes consecutivos o al final
        if (/['-]$/.test(parte) || /['-]{2,}/.test(parte)) {
            return false;
        }
    }

    // Si pasa todas las validaciones, es un nombre válido
    return true;
}
