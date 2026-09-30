function validate(nombreCompleto) {
    // Validar que el argumento sea un string
    if (typeof nombreCompleto !== 'string') {
        return false;
    }

    // Eliminar espacios al principio y final
    const trimNombre = nombreCompleto.trim();
    
    // Validar que no esté vacío después de trim
    if (trimNombre.length === 0) {
        return false;
    }

    // Separar por espacios y filtrar strings vacíos (caso de múltiples espacios)
    const partes = trimNombre.split(/\s+/);
    
    // Un nombre completo debe tener al menos dos partes (nombre y apellido)
    if (partes.length < 2) {
        return false;
    }

    // Validar cada parte
    for (let i = 0; i < partes.length; i++) {
        const parte = partes[i];
        
        // Cada parte debe tener al menos 2 caracteres
        if (parte.length < 2) {
            return false;
        }
        
        // Cada parte debe empezar con mayúscula
        if (parte[0] !== parte[0].toUpperCase()) {
            return false;
        }
        
        // El resto de caracteres deben ser minúsculas
        for (let j = 1; j < parte.length; j++) {
            if (parte[j] !== parte[j].toLowerCase()) {
                return false;
            }
        }
        
        // Solo se permiten letras (incluyendo ñ y acentos)
        const regexLetras = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/;
        if (!regexLetras.test(parte)) {
            return false;
        }
    }

    return true;
}
