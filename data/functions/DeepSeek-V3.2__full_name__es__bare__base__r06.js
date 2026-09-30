function validate(nombre) {
    // Verificar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }
    
    // Verificar que no esté vacío o solo contenga espacios
    if (nombre.trim() === '') {
        return false;
    }
    
    // Dividir el nombre en partes usando espacios
    const partes = nombre.trim().split(/\s+/);
    
    // Debe tener al menos dos partes (nombre y apellido)
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
        
        // El resto de caracteres deben ser minúsculas (permite apóstrofes, guiones, etc.)
        for (let j = 1; j < parte.length; j++) {
            const caracter = parte[j];
            // Permitir letras minúsculas, apóstrofes, guiones y puntos
            if (!/^[a-záéíóúüñ'\-.]$/.test(caracter.toLowerCase())) {
                return false;
            }
        }
        
        // No permitir caracteres especiales consecutivos
        if (/['\-.]{2,}/.test(parte)) {
            return false;
        }
        
        // No puede terminar con caracter especial
        if (/['\-.]$/.test(parte)) {
            return false;
        }
    }
    
    return true;
}
